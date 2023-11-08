import { SITE } from "$/config"
import { loadEmbedAssets } from "./assets"
import { useOgSvgTemplate } from "./template"
import sharp from "sharp"

const initEmbeddedTemplates = async () => {
  const assets = await loadEmbedAssets({
    font: {
      en: "public/fonts/YsabeauOffice-Light.otf",
      ja: "public/fonts/AppleTsukuARdGothic-Regular-AlphaNum-01.otf"
    },
    image: {
      logo: "public/images/for-og/pastel-tomixy_op.png"
    }
  })

  return useOgSvgTemplate(assets)
}

const ogSVG = await initEmbeddedTemplates()

const toPNGBuffer = (svgString: string) => {
  return sharp(Buffer.from(svgString)).png().toBuffer()
}

const makeCustomOGP = (lang: "en" | "ja", title: string, subtitle?: string) => {
  return toPNGBuffer(ogSVG({ lang, title, subtitle }))
}

export const defaultOGP = await makeCustomOGP("en", SITE.name)

export const makeCategoryIndexPageOGP = (lang: "en" | "ja", category: string) => {
  return makeCustomOGP(lang, category, SITE.name)
}
export const makeCategoryLowerPageOGP = (lang: "en" | "ja", category: string, title: string) => {
  return makeCustomOGP(lang, title, `${SITE.name} - ${category}`)
}
