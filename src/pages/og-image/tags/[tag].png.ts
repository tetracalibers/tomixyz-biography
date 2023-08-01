import { APIContext } from "astro"
import { getCollection } from "astro:content"
import { genarateOgImage } from "$/og-image/generate"
import { nestedOgTemplate } from "$/og-image/template"
import { tagToSlug } from "$/utils/tag"

const category = "Skill Tags"

export async function getStaticPaths() {
  const projects = await getCollection("project")
  const targets = [...projects]

  const tags = new Set<string>()
  targets.forEach((post) => {
    if (!post.data.tags) return
    post.data.tags.forEach((tag) => tags.add(tag))
  })

  return [...tags].map((tag) => ({
    params: { tag: tagToSlug(tag) },
    props: { tag }
  }))
}

export async function get({ props }: APIContext) {
  const { tag } = props
  const title = `${tag}を扱った作品`

  const png = await genarateOgImage(nestedOgTemplate(title, category))

  return {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    },

    body: png
  }
}
