import type { APIContext } from "astro"
import { getCollection } from "astro:content"
import { genarateOgImage } from "$/og-image/generate"
import { nestedOgTemplate } from "$/og-image/template"

const category = "Events"

export async function getStaticPaths() {
  const events = await getCollection("event", ({ slug }) => {
    return slug.startsWith("ja/")
  })

  return events.map((event) => ({
    params: { slug: event.slug.replace("ja/", "") },
    props: { title: event.data.title }
  }))
}

export async function GET({ props }: APIContext) {
  const { title } = props

  const png = await genarateOgImage(nestedOgTemplate(title, category))

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}
