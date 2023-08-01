import { defaultOgTemplate } from "$/og-image/template"
import { genarateOgImage } from "$/og-image/generate"

export async function get() {
  const png = await genarateOgImage(defaultOgTemplate())

  return {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    },

    body: png
  }
}
