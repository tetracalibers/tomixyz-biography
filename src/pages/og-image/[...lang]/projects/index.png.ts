import { indexOgTemplate } from "$/og-image/template"
import { genarateOgImage } from "$/og-image/generate"

const title = "Projects: つくったもの"

export async function GET() {
  const png = await genarateOgImage(indexOgTemplate(title))

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}
