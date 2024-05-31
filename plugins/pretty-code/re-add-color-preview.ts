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

  const tokens = tokenSpans.reduce<{ text: string; start: number; end: number }[]>((acc, tokenSpan) => {
    const text = toString(tokenSpan)
    const prev = acc[acc.length - 1]
    const start = prev ? prev.end + 1 : 0
    return [...acc, { text, start, end: start + text.length - 1 }]
  }, [])

  const lineText = tokens.map(({ text }) => text).join("")

  const colorList = parseHtmlColor(lineText)
  if (colorList.length === 0) return

  for (const color of colorList) {
    // color.startがtokensMapのどの[start, end]範囲に入るかを探す
    const tokenIndex = tokens.findIndex(({ start, end }) => color.start >= start && color.start <= end)
    if (tokenIndex === -1) continue

    const token = tokens[tokenIndex]
    const tokenSpan = tokenSpans[tokenIndex]

    const isContained = color.end <= token.end

    if (isContained) {
      // --- 色コードの全体が1つのトークン内にある場合
      // --- 色コードとそうでない部分を分割し、間に色プレビュー用のspanを追加する

      // color.startもcolor.endも、lineText全体の中でのindexなので、
      // token.text内のindexに変換するために、token.startを引いている
      const beforeText = token.text.slice(0, color.start - token.start)
      const afterText = token.text.slice(color.end - token.start + 1)

      const elements = [
        {
          ...tokenSpan,
          children: [createText(beforeText)]
        },
        {
          ...tokenSpan,
          children: [createColorPreviewElement(color.code), createText(color.code)]
        },
        {
          ...tokenSpan,
          children: [createText(afterText)]
        }
      ]

      tokenSpans.splice(tokenIndex, 1, ...elements)
    } else {
      // --- 色コードが複数トークンにまたがっている場合
      // --- 色コードが始まる要素の前に色プレビュー用のspanを追加する

      const elements = [
        {
          ...tokenSpan,
          children: [createText(token.text.startsWith(" ") ? " " : "")]
        },
        {
          ...tokenSpan,
          children: [createColorPreviewElement(color.code)]
        },
        {
          ...tokenSpan,
          children: [createText(token.text.trim())]
        }
      ]

      tokenSpans.splice(tokenIndex, 1, ...elements)
    }
  }
}
