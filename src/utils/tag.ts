export const tagToSlug = (tag: string) => {
  return tag.toLowerCase().replaceAll(/\s/g, "-")
}

export const collectTags = (collection: { data: { tags: string[] } }[]) => {
  return [...new Set(collection.flatMap((item) => item.data.tags))]
}

const isMatchTagOf = (tags: string[]) => {
  return (tag: string) => tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase())
}

export const includeTag = (tag: string) => {
  return (entry: { data: { tags: string[] } }) => isMatchTagOf(entry.data.tags)(tag)
}
