import { defaultOgTemplate } from "$/og-image/template"
import { genarateOgImage } from "$/og-image/generate"

export async function GET() {
  const png = await genarateOgImage(defaultOgTemplate())

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}
