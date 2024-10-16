import { defineEcConfig } from "astro-expressive-code"
import { pluginCollapsibleSections } from "@expressive-code/plugin-collapsible-sections"

export default defineEcConfig({
  // src/config.tsのEXP_CODE_THEMEも合わせて変更する
  themes: ["monokai", "github-light"],
  plugins: [pluginCollapsibleSections()]
})
