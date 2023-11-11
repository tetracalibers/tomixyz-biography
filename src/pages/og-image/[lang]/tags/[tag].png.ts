import type { APIContext } from "astro"
import { getCollection } from "astro:content"
import { tagToSlug } from "$/utils/tag"
import { SITE } from "$/config"
import { makeCategoryLowerPageOGP } from "$/lib/og-image"

const category = "Skill Tags"

export async function getStaticPaths() {
  const projects = await getCollection("project")
  const tutorials = await getCollection("tutorial")
  const targets = [...projects, ...tutorials]

  const tags = new Set<string>()
  targets.forEach((post) => {
    if (!post.data.tags) return
    post.data.tags.forEach((tag) => tags.add(tag))
  })

  return SITE.langs.flatMap((lang) => {
    return [...tags].map((tag) => ({
      params: { tag: tagToSlug(tag), lang },
      props: { tag, lang }
    }))
  })
}

export async function GET({ props }: APIContext) {
  const { tag, lang } = props

  const title = {
    ja: `${tag}を扱った作品`,
    en: `Works using ${tag}`
  }

  const png = await makeCategoryLowerPageOGP(lang, category, title[lang])

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}
