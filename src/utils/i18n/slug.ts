import { SITE } from "$/config"

export const buildPageUrlFor = (directory: string) => {
  return (slug: string, lang: string | undefined) => {
    const defaultSlug = slug.replace(`${lang ?? "ja"}/`, "")
    const pathname = lang ? `/${lang}/${directory}/${defaultSlug}` : `/${directory}/${defaultSlug}`
    return SITE.base + pathname
  }
}

export const splitPath = (path: string) => {
  return path.replace(SITE.base, "").split("/").filter(Boolean)
}

export const getLangSlug = (slugs: string[]) => {
  const [maybeLang] = slugs
  return SITE.langs.includes(maybeLang) ? maybeLang : undefined
}

export const root = (slugs: string[]) => {
  const [maybeLang] = slugs
  return SITE.langs.includes(maybeLang) ? slugs[1] : slugs[0]
}
