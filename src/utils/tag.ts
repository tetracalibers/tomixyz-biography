export const tagToSlug = (tag: string) => {
  return tag.toLowerCase().replaceAll(/\s/g, "-")
}
