import { z, defineCollection, reference } from "astro:content"

const pageCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string()
  })
})

const blogCollection = defineCollection({
  schema: () =>
    z.object({
      title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
      description: z.string(),
      date: z.string(),
      category: z.enum(["essay", "tech"])
    })
})

const tutorialCollection = defineCollection({
  schema: () =>
    z.object({
      title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      date: z.string(),
      series: reference("series").optional(),
      draft: z.boolean().default(false),
      private: z.boolean().default(false)
    })
})

const projectCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
      description: z.string(),
      tags: z.array(z.string()).default([]),
      date: z.string(),
      image: image(),
      url: z.string().url().optional(),
      github: z.string().url().optional()
    })
})

const eventCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
      description: z.string(),
      date: z.string(),
      image: image(),
      url: z.string().url().optional(),
      slide: z.string().url().optional(),
      archive: z.string().url().optional(),
      github: z.string().url().optional()
    })
})

const seriesCollection = defineCollection({
  schema: () =>
    z.object({
      articles: z.array(reference("tutorial"))
    })
})

const dailyCollection = defineCollection({
  schema: z.object({
    tldr: z.string()
  })
})

const wordCollection = defineCollection({
  type: "data",
  schema: z.object({
    word: z.string(),
    meaning: z.string(),
    example_sentences: z.array(
      z.object({
        en: z.string(),
        ja: z.string()
      })
    )
  })
})

export const collections = {
  page: pageCollection,
  blog: blogCollection,
  tutorial: tutorialCollection,
  project: projectCollection,
  event: eventCollection,
  series: seriesCollection,
  daily: dailyCollection,
  word: wordCollection
}
