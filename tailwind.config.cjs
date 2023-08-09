const config = require("./tailwind.theme.config.cjs")
/**
 * Find the applicable theme color palette, or use the default one
 */
const themeConfig =
  process.env.THEME_KEY && config[process.env.THEME_KEY] ? config[process.env.THEME_KEY] : config.default
const { colors } = themeConfig
module.exports = {
  darkMode: "class",
  content: ["./public/**/*.html", "./src/**/*.{astro,js,ts,mdx}"],
  safelist: ["dark"],
  theme: {
    extend: {
      colors: {
        theme: {
          ...colors
        }
      },
      typography: (theme) => ({
        dark: {
          css: {
            color: theme("colors.gray.200"),
            a: {
              color: colors.dark.primary,
              "&:hover": {
                color: colors.dark.secondary
              }
            },
            blockquote: {
              color: colors.dark.primary,
              borderColor: colors.primary
            },
            "blockquote > p::before, p::after": {
              color: colors.primary
            },
            strong: {
              color: colors.dark.primary
            },
            h1: {
              color: colors.dark.secondary
            },
            h2: {
              color: colors.dark.secondary
            },
            h3: {
              color: colors.dark.secondary
            },
            h4: {
              color: colors.dark.secondary
            }
          }
        },
        DEFAULT: {
          css: {
            a: {
              color: colors.secondary,
              "&:hover": {
                color: colors.primary
              }
            },
            blockquote: {
              color: colors.secondary,
              borderColor: colors.dark.primary
            },
            "blockquote > p::before, p::after": {
              color: colors.dark.primary
            },
            strong: {
              color: colors.primary
            },
            h1: {
              color: colors.primary
            },
            h2: {
              color: colors.primary
            },
            h3: {
              color: colors.primary
            },
            h4: {
              color: colors.primary
            }
          }
        }
      })
    }
  },
  variants: {
    extend: { typography: ["dark"] }
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwindcss-hyphens")
  ]
}
