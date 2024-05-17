import { getEntry, type CollectionEntry } from "astro:content"

export type SeriesArticleSlug = CollectionEntry<"tutorial">["slug"]

export interface SeriesArticles {
  slugs: SeriesArticleSlug[]
  SummaryContent: any
  articles: CollectionEntry<"tutorial">[]
  isFirstArticle: (slug: SeriesArticleSlug) => boolean
  getNextArticles: (slug: SeriesArticleSlug) => CollectionEntry<"tutorial">[]
}

export const collectSeriesArticles = async (id: string): Promise<SeriesArticles> => {
  const series = await getEntry("series", id)

  if (!series) {
    throw new Error(`series ${id} not found`)
  }

  const slugs = series.data.articles.map((article) => article.slug)
  const articles = await Promise.all(slugs.map((slug) => getEntry("tutorial", slug)))

  const { Content: SummaryContent } = await series.render()

  const findIndex = (slug: SeriesArticleSlug) => slugs.indexOf(slug)
  const isFirstArticle = (slug: SeriesArticleSlug) => findIndex(slug) === 0
  const getNextArticles = (slug: SeriesArticleSlug) => articles.slice(findIndex(slug) + 1)

  return {
    slugs,
    SummaryContent,
    articles,
    isFirstArticle,
    getNextArticles
  }
}
