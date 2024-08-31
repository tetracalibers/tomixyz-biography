<script lang="ts">
  import { onMount } from "svelte"
  import { theme } from "../store/theme"
  import { EXP_CODE_THEME } from "$/config"

  type ThemeType = "dark" | "light"

  const THEME_DARK: ThemeType = "dark"
  const THEME_LIGHT: ThemeType = "light"
  let currTheme: ThemeType = THEME_DARK

  function toggleTheme() {
    window.document.documentElement.classList.toggle(THEME_DARK)
    document.documentElement.setAttribute(
      "data-theme",
      currTheme === THEME_DARK ? EXP_CODE_THEME.light : EXP_CODE_THEME.dark
    )
    currTheme = localStorage.getItem("theme") === THEME_DARK ? THEME_LIGHT : THEME_DARK
    // Update Storage
    localStorage.setItem("theme", currTheme)
    // Update Store
    theme.set(currTheme)
  }

  onMount(() => {
    if (
      localStorage.getItem("theme") === THEME_DARK ||
      (!("theme" in localStorage) && window.matchMedia(`(prefers-color-scheme: ${THEME_DARK})`).matches)
    ) {
      window.document.documentElement.classList.add(THEME_DARK)
      document.documentElement.setAttribute("data-theme", EXP_CODE_THEME.dark)
      currTheme = THEME_DARK
    } else {
      window.document.documentElement.classList.remove(THEME_DARK)
      document.documentElement.setAttribute("data-theme", EXP_CODE_THEME.light)
      currTheme = THEME_LIGHT
    }
    // Update Store
    theme.set(currTheme)
  })
</script>

<button on:click={toggleTheme}>
  <slot theme={currTheme} />
</button>
