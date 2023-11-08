import { defaultOGP } from "$/lib/og-image"

export async function GET() {
  return new Response(defaultOGP, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable"
    }
  })
}
