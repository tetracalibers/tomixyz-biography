import { PAGE_SIZE } from "$/config"
import type { PaginateFunction } from "astro"
import type { CollectionEntry, ContentCollectionKey } from "astro:content"
import { groupByLang } from "../collection"

type PaginateOptions = {
  paginate: PaginateFunction
  props?: Record<string, unknown>
  params?: Record<string, string>
}

export const i18nPaginatePerLang = <C extends ContentCollectionKey>(
  lang: string,
  collection: CollectionEntry<C>[],
  { paginate, params, props }: PaginateOptions
) => {
  const i18nPaths = paginate(collection, { pageSize: PAGE_SIZE, params: { lang, ...params }, props })

  if (lang === "ja") {
    const defaultPaths = paginate(collection, { pageSize: PAGE_SIZE, params: { lang: undefined, ...params }, props })
    return [...i18nPaths, ...defaultPaths]
  }

  return i18nPaths
}

type I18nPaginateArgs = {
  paginate: PaginateFunction
  props?: Record<string, unknown>
  params?: Record<string, string>
}

// [...lang]/**/[...page].astro用
export const i18nPaginate = <C extends ContentCollectionKey>(
  collection: CollectionEntry<C>[],
  { paginate, props = {}, params = {} }: I18nPaginateArgs
) => {
  const byLang = groupByLang(collection)

  return [...byLang].flatMap(([lang, langPages]) => {
    return i18nPaginatePerLang(lang, langPages, { paginate, params, props })
  })
}
