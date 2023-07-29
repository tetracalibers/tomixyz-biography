import type { NavItems } from "./types"

export const NAV_ITEMS: NavItems = {
  about: {
    path: "/",
    title: "about"
  },
  projects: {
    path: "/projects",
    title: "projects"
  },
  blog: {
    path: "/blog",
    title: "blog"
  },
  tags: {
    path: "/tags",
    title: "tags"
  },
  media: {
    path: "/media",
    title: "media"
  }
}

export const SITE = {
  // Your site's detail?
  name: "tomixy's biography",
  title: "tomixy's biography",
  description: "",
  url: "",
  githubUrl: "https://github.com/tetracalibers",
  listDrafts: true,
  image: "/images/profiles/pastel-tomixy_op.png",
  // YT video channel Id (used in media.astro)
  ytChannelId: "",
  // Optional, user/author settings (example)
  // Author: name
  author: "tomixy", // Example: Fred K. Schott
  // Author: Twitter handler
  authorTwitter: "tetracalibers", // Example: FredKSchott
  // Author: Image external source
  authorImage: "/images/profiles/pastel-tomixy_op.png", // Example: https://pbs.twimg.com/profile_images/1272979356529221632/sxvncugt_400x400.jpg, https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png
  // Author: Bio
  authorBio: ""
}

// Ink - Theme configuration
export const PAGE_SIZE = 8
export const USE_POST_IMG_OVERLAY = false
export const USE_MEDIA_THUMBNAIL = true

export const USE_AUTHOR_CARD = true
export const USE_SUBSCRIPTION = false /* works only when USE_AUTHOR_CARD is true */
