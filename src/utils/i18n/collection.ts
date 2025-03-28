import type { ContentCollectionKey, CollectionEntry } from "astro:content"

export const groupByLang = <C extends ContentCollectionKey>(collection: CollectionEntry<C>[]) => {
  const initial = new Map<string, CollectionEntry<C>[]>()
  return collection.reduce((acc, page) => {
    const [lang] = page.slug.split("/")
    const sameLang = acc.get(lang) ?? []
    sameLang.push(page)
    acc.set(lang, sameLang)
    return acc
  }, initial)
}

export const splitLangSlug = (entrySlug: string): { lang: string; slug: string } => {
  const [lang, slug] = entrySlug.split("/")
  return { lang, slug }
}
