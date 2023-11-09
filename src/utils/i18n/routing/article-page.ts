import type { CollectionEntry, ContentCollectionKey } from "astro:content"

type PathsOptions = {
  props?: Record<string, unknown>
  params?: Record<string, string>
}

// [...lang]/**/[...slug].astro用
export const i18nPaths = <C extends ContentCollectionKey>(
  collection: CollectionEntry<C>[],
  { props = {}, params = {} }: PathsOptions = {}
) => {
  return collection.flatMap((page) => {
    const { slug } = page
    const [lang, defaultSlug] = slug.split("/")
    const paths = { props: { page, lang, ...props }, params: { slug: defaultSlug, lang, ...params } }
    return slug.startsWith("ja") ? [paths, { ...paths, params: { ...paths.params, lang: undefined } }] : paths
  })
}
