import type { NavItems } from "./types"

export const NAV_ITEMS: NavItems = {
  about: {
    path: "/tomixyz-biography/",
    title: "about"
  },
  projects: {
    path: "/tomixyz-biography/projects",
    title: "projects"
  },
  blog: {
    path: "/tomixyz-biography/blog",
    title: "blog"
  },
  tags: {
    path: "/tomixyz-biography/tags",
    title: "tags"
  }
  // media: {
  //   path: "/tomixyz-biography/media",
  //   title: "media"
  // }
}

export const SITE = {
  // Your site's detail?
  name: "tomixy's biography",
  title: "tomixy's biography",
  description: "",
  url: "",
  githubUrl: "https://github.com/tetracalibers",
  listDrafts: true,
  image: "/tomixyz-biography/images/profiles/pastel-tomixy_op.png",
  // YT video channel Id (used in media.astro)
  ytChannelId: "",
  // Optional, user/author settings (example)
  // Author: name
  author: "tomixy", // Example: Fred K. Schott
  // Author: Twitter handler
  authorTwitter: "tetracalibers", // Example: FredKSchott
  // Author: Image external source
  authorImage: "/tomixyz-biography/images/profiles/pastel-tomixy_op.png", // Example: https://pbs.twimg.com/profile_images/1272979356529221632/sxvncugt_400x400.jpg, https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png
  // Author: Bio
  authorBio: ""
}

// Ink - Theme configuration
export const PAGE_SIZE = 8
export const USE_POST_IMG_OVERLAY = false
export const USE_MEDIA_THUMBNAIL = true

export const USE_AUTHOR_CARD = true
export const USE_SUBSCRIPTION = false /* works only when USE_AUTHOR_CARD is true */
