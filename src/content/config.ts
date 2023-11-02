import { z, defineCollection } from "astro:content"

const pageCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    ogimage: z.string().optional()
  })
})

const blogCollection = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
      description: z.string(),
      date: z.string(),
      image: image().optional(),
      category: z.enum(["essay", "tech"])
    })
})

const projectCollection = defineCollection({
  schema: z.object({
    title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    date: z.string(),
    image: z.string().optional(),
    url: z.string().url().optional(),
    github: z.string().url().optional()
  })
})

const eventCollection = defineCollection({
  schema: z.object({
    title: z.string().max(100, "The title length must be less than or equal to 100 chars"),
    description: z.string(),
    date: z.string(),
    image: z.string().optional(),
    url: z.string().url().optional(),
    slide: z.string().url().optional(),
    archive: z.string().url().optional(),
    github: z.string().url().optional()
  })
})

export const collections = {
  page: pageCollection,
  blog: blogCollection,
  project: projectCollection,
  event: eventCollection
}
