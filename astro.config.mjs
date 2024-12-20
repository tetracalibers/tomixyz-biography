import path, { dirname } from "path"
import { fileURLToPath } from "url"
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import icon from "astro-icon"
import { defineConfig } from "astro/config"
import remarkBreaks from "remark-breaks"
import rehypePrettyCode from "rehype-pretty-code"
import { addColorPreview } from "./plugins/pretty-code/add-color-preview"
import { transformerNotationErrorLevel } from "@shikijs/transformers"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Full Astro Configuration API Documentation:
// https://docs.astro.build/reference/configuration-reference

// @type-check enabled!
// VSCode and other TypeScript-enabled text editors will provide auto-completion,
// helpful tooltips, and warnings if your exported object is invalid.
// You can disable this by removing "@ts-check" and `@type` comments below.

// @ts-check

// https://astro.build/config

/** @type {import("rehype-pretty-code").Options} */
const prettyCodeOptions = {
  theme: {
    dark: "synthwave-84",
    light: "snazzy-light"
  },
  defaultLang: "plaintext",
  transformers: [transformerNotationErrorLevel()],
  onVisitLine(element) {
    addColorPreview(element)
  }
}

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */ {
    // root: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
    // outDir: './dist',       // When running `astro build`, path to final static output
    // publicDir: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
    site: "https://tetracalibers.github.io",
    base: process.env.CF_PAGES == 1 ? "" : "/tomixyz-biography",
    trailingSlash: "ignore",
    scopedStyleStrategy: "where",
    devToolbar: {
      enabled: false
    },
    server: {
      port: 3000
    },
    markdown: {
      syntaxHighlight: false, // Disable syntax built-in syntax hightlighting from astro
      rehypePlugins: [
        [rehypeKatex, {}],
        [rehypePrettyCode, prettyCodeOptions]
      ],
      remarkPlugins: [remarkMath, remarkBreaks]
    },
    integrations: [
      icon(),
      mdx(),
      svelte(),
      tailwind({
        config: {
          applyBaseStyles: false
        }
      }),
      sitemap()
    ],
    vite: {
      plugins: [],
      resolve: {
        alias: {
          $: path.resolve(__dirname, "./src")
        }
      }
    }
  }
)
