import type { CollectionEntry, ContentCollectionKey } from "astro:content"

type I18nPathsArgs<C extends ContentCollectionKey> = {
  collection: CollectionEntry<C>[]
}

// [...page].astro用
export const i18nPaths = <C extends ContentCollectionKey>({ collection }: I18nPathsArgs<C>) => {
  return collection.flatMap((page) => {
    const { slug } = page
    const [lang, defaultSlug] = slug.split("/")
    const paths = { props: { page, lang }, params: { page: slug } }
    return slug.startsWith("ja") ? [paths, { ...paths, params: { ...paths.params, page: defaultSlug } }] : paths
  })
}
