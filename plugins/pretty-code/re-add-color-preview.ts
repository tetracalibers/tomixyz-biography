import type { LineElement } from "rehype-pretty-code"
import type { Element, ElementContent } from "hast"
import { toString } from "hast-util-to-string" // need install
import { parseHtmlColor } from "./colors-regex"

const createColorPreviewElement = (color: string): Element => ({
  type: "element",
  tagName: "span",
  properties: {
    "data-color-preview": color,
    style: `background-color: ${color};`
  },
  children: [{ type: "text", value: "" }]
})

const createText = (text: string): ElementContent => ({ type: "text", value: text })

export const addColorPreview = (lineSpan: LineElement) => {
  const tokenSpans = lineSpan.children

  const tokensMap = tokenSpans.reduce<{ text: string; start: number; end: number }[]>((acc, tokenSpan) => {
    const text = toString(tokenSpan)
    const prev = acc[acc.length - 1]
    const start = prev ? prev.end + 1 : 0
    return [...acc, { text, start, end: start + text.length - 1 }]
  }, [])

  const lineText = tokensMap.map(({ text }) => text).join("")

  const matchedList = parseHtmlColor(lineText)
  if (matchedList.length === 0) return

  for (const matched of matchedList) {
    // matched.indexがtokensMapのどの[start, end]範囲に入るかを探す
    const matchedIndex = tokensMap.findIndex(({ start, end }) => matched.start >= start && matched.start <= end)
    if (matchedIndex === -1) continue

    const token = tokensMap[matchedIndex]

    const isContained = matched.start >= token.start && matched.end <= token.end
    const isSeparated = matched.start >= token.start && matched.end > token.end

    if (isContained) {
      // 色コードとそうでない部分を分割し、間に色プレビュー用のspanを追加する
      const colorPreviewElement = createColorPreviewElement(matched.color)

      // matched.startもmatched.endも、行全体の中でのindexなので、
      // token内のindexに変換するために、token.startを引いている
      const beforeText = token.text.slice(0, matched.start - token.start)
      const afterText = token.text.slice(matched.end - token.start + 1)

      const elements = [
        {
          ...tokenSpans[matchedIndex],
          children: [createText(beforeText)]
        },
        {
          ...tokenSpans[matchedIndex],
          children: [colorPreviewElement, createText(matched.color)]
        },
        {
          ...tokenSpans[matchedIndex],
          children: [createText(afterText)]
        }
      ]

      lineSpan.children.splice(matchedIndex, 1, ...elements)

      return
    }

    if (isSeparated) {
      // 色コードが始まる要素の前に色プレビュー用のspanを追加する
      const colorPreviewElement = createColorPreviewElement(matched.color)
      const elements = [
        {
          ...tokenSpans[matchedIndex],
          children: [createText(token.text.startsWith(" ") ? " " : "")]
        },
        {
          ...tokenSpans[matchedIndex],
          children: [colorPreviewElement]
        },
        {
          ...tokenSpans[matchedIndex],
          children: [createText(token.text.trim())]
        }
      ]
      lineSpan.children.splice(matchedIndex, 1, ...elements)
    }
  }
}
