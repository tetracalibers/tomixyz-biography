import type TextToSVG from "text-to-svg"
import { defInsetShadowFilter, defRoundCornerMask } from "./defs"
import type { GenerationOptions } from "text-to-svg"

const floor2 = (n: number) => Math.floor(n * 100) / 100
const rem2px = (n: number) => n * 16

const OG_WIDTH = 1200
const OG_HEIGHT = 630

const BG_COLOR = "#f1f5f9"
const TXT_COLOR = "#64748b"

const padding = floor2(OG_WIDTH * (1 - 0.916) * 0.5)
const innerWidth = OG_WIDTH - padding * 2
const innerHeight = OG_HEIGHT - padding * 2

const fixOverflowScale = (textWidth: number) => {
  const maxWidth = innerWidth * 0.9
  return textWidth > maxWidth ? maxWidth / textWidth : 1
}

const layouBase = (slot: string) => {
  const p = padding
  const w = innerWidth
  const h = innerHeight
  // borderRadius
  const r = rem2px(10)

  const filterId = "inset-shadow"
  const maskId = "round-corner"

  return /* html */ `
    <svg width="${OG_WIDTH}" height="${OG_HEIGHT}" viewBox="0 0 ${OG_WIDTH} ${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        ${defInsetShadowFilter(filterId)}
        ${defRoundCornerMask(maskId, { x: p, y: p, width: w, height: h, radius: r })}
      </defs>
      
      <!-- background -->
      <rect fill="white" width="${OG_WIDTH}" height="${OG_HEIGHT}" />
      
      <!-- inner container -->
      <g filter="url(#${filterId})">
        <rect fill="${BG_COLOR}" width="${w}" height="${h}" x="${p}" y="${p}" mask="url(#${maskId})" />
      </g>
      
      ${slot}
    </svg>
  `
}

interface LayoutParams {
  title: {
    text: string
    font: TextToSVG
  }
  subtitle: {
    text: string
    font: TextToSVG
  }
  logo: string
}

export const layoutForRootPage = ({ title, logo }: Omit<LayoutParams, "subtitle">) => {
  const titleRenderOption: GenerationOptions = {
    fontSize: rem2px(3),
    anchor: "center top"
  }
  // `d` attribute of `<path>` element for title
  const d = title.font.getD(title.text, titleRenderOption)
  // rendered width of title
  const tw = title.font.getWidth(title.text, titleRenderOption)
  // scale to fix overflow
  const ts = fixOverflowScale(tw)

  // logoSize
  const s = 200

  // gap between title and logo
  const gap = rem2px(1)

  const slot = /* html */ `
    <g transform="translate(${OG_WIDTH * 0.5} ${OG_HEIGHT * 0.4})">
      <g transform="translate(${-s * 0.5} ${-s * 0.5})">
        <image width="${s}" height="${s}" href="${logo}" />
      </g>
      <g fill="${TXT_COLOR}" transform="translate(0 ${s * 0.5 + gap})">
        <g transformOrigin="center" transform="scale(${ts})">
          <path d="${d}" />
        </g>
      </g>
    </g>
  `

  return layouBase(slot)
}

export const layoutForLowerPage = ({ title, subtitle, logo }: LayoutParams) => {
  const titleRenderOption: GenerationOptions = {
    fontSize: rem2px(3),
    anchor: "center top"
  }
  const subtitleRenderOption: GenerationOptions = {
    fontSize: rem2px(1.875),
    anchor: "center top"
  }

  // `d` attribute of `<path>` element for title
  const d1 = title.font.getD(title.text, titleRenderOption)
  // `d` attribute of `<path>` element for subtitle
  const d2 = subtitle.font.getD(subtitle.text, subtitleRenderOption)

  // bounding box of title
  const { height: th, width: tw } = title.font.getMetrics(title.text, titleRenderOption)
  // scale to fix overflow
  const ts = fixOverflowScale(tw)

  // logoSize
  const s = 200

  // gap between logo, title and subtitle
  const gap = rem2px(1)

  const slot = /* html */ `
    <g transform="translate(${OG_WIDTH * 0.5} ${OG_HEIGHT * 0.4})">
      <g transform="translate(${-s * 0.5} ${-s * 0.5})">
        <image width="${s}" height="${s}" href="${logo}" />
      </g>
      <g fill="${TXT_COLOR}" transform="translate(0 ${s * 0.5 + gap})">
        <g transformOrigin="center" transform="scale(${ts})">
          <path d="${d1}" />
        </g>
        <g transform="translate(0 ${th + gap})">
          <path d="${d2}" />
        </g>
      </g>
    </g>
  `

  return layouBase(slot)
}
