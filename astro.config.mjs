import path, { dirname } from "path"
import { fileURLToPath } from "url"
import svelte from "@astrojs/svelte"
import tailwind from "@astrojs/tailwind"
import sitemap from "@astrojs/sitemap"
import mdx from "@astrojs/mdx"
import { defineConfig } from "astro/config"
import { i18n, filterSitemapByDefaultLocale } from "astro-i18n-aut/integration"
import markdoc from "@astrojs/markdoc"
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

const defaultLocale = "ja"
const locales = {
  en: "en-US", // the `defaultLocale` value must present in `locales` keys
  ja: "ja-JP"
}

// https://astro.build/config
export default defineConfig(
  /** @type {import('astro').AstroUserConfig} */ {
    // root: '.',     // Where to resolve all URLs relative to. Useful if you have a monorepo project.
    // outDir: './dist',       // When running `astro build`, path to final static output
    // publicDir: './public',   // A folder of static files Astro will copy to the root. Useful for favicons, images, and other files that don’t need processing.
    site: "https://tetracalibers.github.io/",
    base: "/tomixyz-biography/",
    trailingSlash: "always",
    scopedStyleStrategy: "where",
    server: {
      port: 3000
    },
    integrations: [
      mdx(),
      // markdoc(), // disabled now due to an issue with Vercel builds
      svelte(),
      tailwind({
        config: {
          applyBaseStyles: false
        }
      }),
      i18n({
        locales,
        defaultLocale
      }),
      sitemap({
        i18n: {
          locales,
          defaultLocale
        },
        filter: filterSitemapByDefaultLocale({ defaultLocale })
      })
    ],
    vite: {
      plugins: [],
      resolve: {
        alias: {
          $: path.resolve(__dirname, "./src")
        }
      },
      optimizeDeps: {
        allowNodeBuiltins: true,
        exclude: ["@resvg/resvg-js-darwin-x64"]
      }
    }
  }
)
