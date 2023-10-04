export const tagToSlug = (tag: string) => {
  return tag.toLowerCase().replaceAll(/\s/g, "-")
}

export const collectTags = (collection: { data: { tags: string[] } }[]) => {
  return [...new Set(collection.flatMap((item) => item.data.tags))]
}
