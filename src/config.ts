import type { NavItems } from "./types"

export const NAV_ITEMS: NavItems = {
  about: {
    path: "/",
    title: "about"
  },
  projects: {
    path: "/projects/",
    title: "projects"
  },
  events: {
    path: "/events/",
    title: "events"
  },
  writing: {
    path: "/writing/",
    title: "writing"
  },
  blog: {
    path: "/blog/",
    title: "blog"
  },
  tags: {
    path: "/tags/",
    title: "tags"
  }
}

export const SITE = {
  // Your site's detail?
  name: "tomixy's biography",
  title: "tomixy's biography",
  description: "",
  url: "https://tetracalibers.github.io/tomixyz-biography",
  base: "/tomixyz-biography",
  githubUrl: "https://github.com/tetracalibers",
  listDrafts: true,
  // YT video channel Id (used in media.astro)
  ytChannelId: "",
  // Optional, user/author settings (example)
  // Author: name
  author: "tomixy", // Example: Fred K. Schott
  // Author: Twitter handler
  authorTwitter: "tetracalibers", // Example: FredKSchott
  // Author: Bio
  authorBio: "",
  langs: ["en", "ja"],
  defaultLang: "ja"
}

// Ink - Theme configuration
export const PAGE_SIZE = 8
export const USE_POST_IMG_OVERLAY = false
export const USE_MEDIA_THUMBNAIL = true

export const USE_AUTHOR_CARD = true
export const USE_SUBSCRIPTION = false /* works only when USE_AUTHOR_CARD is true */
