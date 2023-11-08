import { makeCategoryLowerPageOGP } from "$/lib/og-image"
import type { APIContext } from "astro"
import { getCollection } from "astro:content"

const category = "Projects"

export async function getStaticPaths() {
  const projects = await getCollection("project")

  return projects.map((project) => {
    const [lang, slug] = project.slug.split("/")
    return {
      params: { slug, lang },
      props: { title: project.data.title, lang }
    }
  })
}

export async function GET({ props }: APIContext) {
  const { title, lang } = props

  const png = await makeCategoryLowerPageOGP(lang, category, title)

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}
