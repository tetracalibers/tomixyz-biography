import type { CollectionEntry, ContentCollectionKey } from "astro:content"

type I18nPathsArgs<C extends ContentCollectionKey> = {
  collection: CollectionEntry<C>[]
}

// [...lang]/**/[...slug].astro用
export const i18nPaths = <C extends ContentCollectionKey>({ collection }: I18nPathsArgs<C>) => {
  return collection.flatMap((page) => {
    const { slug } = page
    const [lang, defaultSlug] = slug.split("/")
    const paths = { props: { page }, params: { slug: defaultSlug, lang } }
    return slug.startsWith("ja") ? [paths, { ...paths, params: { ...paths.params, lang: undefined } }] : paths
  })
}
