import type { Element, ElementContent } from "hast"
import type { LineElement } from "rehype-pretty-code"
import { validateHTMLColorHex, validateHTMLColorName, validateHTMLColorRgb } from "validate-color"

const tokenValueWithRaw = (node: ElementContent) => {
  if (node.type !== "element") return null
  if (node.tagName !== "span") return null
  const [text] = node.children
  if (text.type !== "text") return null
  const raw = text.value
  return { value: raw.trim(), raw }
}

const tokenValue = (node: ElementContent) => {
  return tokenValueWithRaw(node)?.value ?? null
}

const walkValidateHTMLColorHex = (tokens: ElementContent[], i: number) => {
  const next = tokenValue(tokens[i + 1])
  if (next === null) return null
  if (![3, 6, 8].includes(next.length)) return null
  const color = "#" + next
  if (!validateHTMLColorHex(color)) return null
  return color
}

const walkValidateHTMLColorRgb = (tokens: ElementContent[], rgbOrRgba: string, i: number) => {
  let rgbTokens = [rgbOrRgba]

  const maybeStartBrace = tokenValue(tokens[i + 1])
  if (maybeStartBrace !== "(") return null

  rgbTokens.push("(")

  // ) に到達するまで読み進める
  let j = i + 2
  let isMatch = false

  while (j < tokens.length) {
    const token = tokenValue(tokens[j])

    if (token === null) return null

    if (token === ")" || token === ");") {
      isMatch = true
      rgbTokens.push(")")
      break
    }

    const isEmpty = token === ""
    const isNumber = !isNaN(Number(token))
    const isComma = token === ","

    if (!isEmpty && !isNumber && !isComma) return null

    rgbTokens.push(token)

    j++
  }

  if (!isMatch) return null

  const color = rgbTokens.join("")

  if (!validateHTMLColorRgb(color)) return null

  return color
}

// テキストノード中の先頭のスペースを、span要素に変換する
const convertSpaceToElement = (token: string, $token: Element, index: number, $parent: ElementContent[]) => {
  if (!token.startsWith(" ")) return

  if ($token.children[0].type !== "text") return

  // 先頭がスペースの場合は、テキストノードからスペースを削除しておく
  $token.children[0].value = token.trim()

  // トークン要素の前にスペース用の要素を追加
  const $space: Element = {
    type: "element",
    tagName: "span",
    properties: {},
    children: [{ type: "text", value: " " }]
  }
  $parent.splice(index, 0, $space)
}

// color preview用のspanを追加
const addColorPreviewElement = (color: string, $token: Element) => {
  const colorPreview: Element = {
    type: "element",
    tagName: "span",
    properties: {
      "data-color-preview": color,
      style: `background-color: ${color};`
    },
    children: []
  }
  $token.children.unshift(colorPreview)
}

export const addColorPreview = (element: LineElement) => {
  const tokens = element.children

  tokens.forEach((token, i) => {
    if (token.type !== "element") return

    const values = tokenValueWithRaw(token)
    if (values === null) return

    const { value, raw } = values

    let color = value

    if (value.startsWith("#")) {
      const isHexString = validateHTMLColorHex(value)
      // トークンを読み進めて、連結したらhexの文字列になるかどうかを判定する
      if (!isHexString) {
        const maybeHex = walkValidateHTMLColorHex(tokens, i)
        if (maybeHex === null) return
        color = maybeHex
      }
    } else if (value.startsWith("rgb")) {
      const isRgbString = validateHTMLColorRgb(value)
      // トークンを読み進めて、連結したらrgb()の文字列になるかどうかを判定する
      if (!isRgbString) {
        const maybeRgb = walkValidateHTMLColorRgb(tokens, value, i)
        if (maybeRgb === null) return
        color = maybeRgb
      }
    } else {
      if (!validateHTMLColorName(value)) return
    }

    convertSpaceToElement(raw, token, i, tokens)
    addColorPreviewElement(color, token)
  })
}
