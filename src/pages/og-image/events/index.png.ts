import { indexOgTemplate } from "$/og-image/template"
import { genarateOgImage } from "$/og-image/generate"

const title = "Events: 登壇したイベント"

export async function get() {
  const png = await genarateOgImage(indexOgTemplate(title))

  return {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    },

    body: png
  }
}
