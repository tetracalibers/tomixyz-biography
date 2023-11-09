import { SITE } from "$/config"
import { makeCategoryIndexPageOGP } from "$/lib/og-image"
import type { APIContext } from "astro"

const title = "Writing"

export async function getStaticPaths() {
  return SITE.langs.map((lang) => ({ params: { lang }, props: { lang } }))
}

export async function GET({ props }: APIContext) {
  const png = await makeCategoryIndexPageOGP(props.lang, title)

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}
