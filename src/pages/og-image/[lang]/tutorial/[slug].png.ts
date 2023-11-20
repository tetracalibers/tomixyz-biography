import { makeCategoryLowerPageOGP } from "$/lib/og-image"
import type { APIContext } from "astro"
import { getCollection } from "astro:content"

const category = "Tutorial"

export async function getStaticPaths() {
  const blogs = await getCollection("tutorial", (entry) => !entry.data.draft)

  return blogs.map((blog) => {
    const [lang, slug] = blog.slug.split("/")
    return {
      params: { slug, lang },
      props: { title: blog.data.title, lang }
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
