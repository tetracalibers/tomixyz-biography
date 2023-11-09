import type TextToSVG from "text-to-svg"
import { layoutForLowerPage, layoutForRootPage } from "./template/layout"

interface TemplateNeedAssets {
  font: {
    en: TextToSVG
    ja: TextToSVG
  }
  image: {
    logo: string
  }
}

interface TemplateContent {
  lang: "ja" | "en"
  title: string
  subtitle?: string
}

const escapeForJaFont = (str: string) => str.replaceAll(" ", "\u00A0")

export const useOgSvgTemplate = ({ font, image }: TemplateNeedAssets) => {
  const { logo } = image

  return ({ lang, title, subtitle }: TemplateContent) => {
    return subtitle
      ? layoutForLowerPage({
          title: {
            text: escapeForJaFont(title),
            font: font.ja
          },
          subtitle: {
            text: subtitle,
            font: font.en
          },
          logo
        })
      : layoutForRootPage({
          title: {
            text: title,
            font: font.en
          },
          logo
        })
  }
}
