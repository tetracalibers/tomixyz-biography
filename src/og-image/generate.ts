import satori from "satori"
import { html } from "satori-html"
import { Resvg } from "@resvg/resvg-js"
import fs from "node:fs/promises"

const jaFontSrc = new URL("../../fonts/AppleTsukuARdGothic-Regular-AlphaNum-01.otf", import.meta.url)
const enFontSrc = new URL("../../fonts/YsabeauOffice-Light.otf", import.meta.url)

const jaFontBuffer = await fs.readFile(jaFontSrc)
const enFontBuffer = await fs.readFile(enFontSrc)

const height = 630
const width = 1200

export const genarateOgImage = async (htmlString: string) => {
  const node = html(htmlString)

  const svg = await satori(node, {
    fonts: [
      {
        name: "YsabeauOffice",
        data: enFontBuffer,
        style: "normal"
      },
      {
        name: "AppleTsukuBRdGothic",
        data: jaFontBuffer,
        style: "normal"
      }
    ],
    height,
    width
  })

  const resvg = new Resvg(svg, {
    font: {
      loadSystemFonts: false
    },
    fitTo: {
      mode: "width",
      value: width
    }
  })

  const image = resvg.render()

  return image.asPng()
}
