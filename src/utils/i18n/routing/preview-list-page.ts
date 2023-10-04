import { PAGE_SIZE } from "$/config"
import type { PaginateFunction } from "astro"
import type { CollectionEntry, ContentCollectionKey } from "astro:content"
import { groupByLang } from "../collection"

type I18nPaginateArgs<C extends ContentCollectionKey> = {
  paginate: PaginateFunction
  collection: CollectionEntry<C>[]
}

// [...lang]/**/[...page].astro用
export const i18nPaginate = <C extends ContentCollectionKey>({ paginate, collection }: I18nPaginateArgs<C>) => {
  const byLang = groupByLang(collection)

  const jaCollection = collection.filter((page) => page.slug.startsWith("ja"))
  const defaultPages = paginate(jaCollection, { pageSize: PAGE_SIZE, params: { lang: undefined } })

  const byLangPages = [...byLang].flatMap(([lang, langPages]) => {
    return paginate(langPages, { pageSize: PAGE_SIZE, params: { lang } })
  })

  return [...defaultPages, ...byLangPages]
}
