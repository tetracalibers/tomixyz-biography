import type { LineElement } from "rehype-pretty-code"
import type { Element } from "hast"
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

export const addColorPreview = (lineSpan: LineElement) => {
  const tokenSpans = lineSpan.children

  const tokensMap = tokenSpans.reduce<{ text: string; start: number; end: number }[]>((acc, tokenSpan) => {
    const text = toString(tokenSpan)
    // prevEnd は 0 始まりにしたいので、初期値は -1 にしておく
    const prevEnd = acc[acc.length - 1]?.end ?? -1
    return [
      ...acc,
      {
        text,
        start: prevEnd + 1,
        end: prevEnd + text.length
      }
    ]
  }, [])

  const tokens = tokensMap.map(({ text }) => text)

  const matchedList = parseHtmlColor(tokens.join(""))
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
          children: [{ type: "text", value: beforeText }]
        },
        {
          ...tokenSpans[matchedIndex],
          children: [colorPreviewElement, { type: "text", value: matched.color }]
        },
        {
          ...tokenSpans[matchedIndex],
          children: [{ type: "text", value: afterText }]
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
          children: [{ type: "text", value: token.text.startsWith(" ") ? " " : "" }]
        },
        {
          ...tokenSpans[matchedIndex],
          children: [colorPreviewElement]
        },
        {
          ...tokenSpans[matchedIndex],
          children: [{ type: "text", value: token.text.trim() }]
        }
      ]
      lineSpan.children.splice(matchedIndex, 1, ...elements)
    }
  }
}
