import type { APIContext } from "astro"
import { getCollection } from "astro:content"
import { genarateOgImage } from "$/og-image/generate"
import { nestedOgTemplate } from "$/og-image/template"

const category = "Blog"

export async function getStaticPaths() {
  const blogs = await getCollection("blog")

  return blogs.map((blog) => ({
    params: { slug: blog.slug },
    props: { title: blog.data.title }
  }))
}

export async function get({ props }: APIContext) {
  const { title } = props

  const png = await genarateOgImage(nestedOgTemplate(title, category))

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}
