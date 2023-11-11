export const tagToSlug = (tag: string) => {
  return tag.toLowerCase().replaceAll(/\s/g, "-")
}

export const collectTags = (...collections: { data: { tags: string[] } }[][]) => {
  const tags = collections
    .flat()
    .map((entry) => entry.data.tags)
    .flat()
  return [...new Set(tags)]
}

const isMatchTagOf = (tags: string[]) => {
  return (tag: string) => tags.map((tag) => tag.toLowerCase()).includes(tag.toLowerCase())
}

export const includeTag = (tag: string) => {
  return (entry: { data: { tags: string[] } }) => isMatchTagOf(entry.data.tags)(tag)
}
