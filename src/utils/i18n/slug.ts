import { SITE } from "$/config"

export const buildPageUrlFor = (directory: string) => {
  return (slug: string, lang: string | undefined) => {
    const defaultSlug = slug.replace(`${lang ?? "ja"}/`, "")
    const pathname = lang ? `/${lang}/${directory}/${defaultSlug}` : `/${directory}/${defaultSlug}`
    return SITE.base + pathname
  }
}
