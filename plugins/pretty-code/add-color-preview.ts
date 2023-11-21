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

const isHexLength = (str: string) => {
  return [3, 4, 6, 8].includes(str.length)
}

const walkValidateHTMLColorHex = (tokens: ElementContent[], i: number) => {
  const next = tokenValue(tokens[i + 1])
  if (next === null) return null
  if (!isHexLength(next)) return null
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

// color preview用のspanを作成
const createColorPreviewElement = (color: string) => {
  const $colorPreview: Element = {
    type: "element",
    tagName: "span",
    properties: {
      "data-color-preview": color,
      style: `background-color: ${color};`
    },
    children: [{ type: "text", value: "" }]
  }
  return $colorPreview
}

// color preview用のspanを追加
const prependColorPreviewElement = (color: string, $token: Element) => {
  const $color = createColorPreviewElement(color)
  $token.children.unshift($color)
}

// 色コードとそうでない部分を分割し、間に色プレビュー用のspanを追加する
const insertColorPreviewElementWithSplit = (
  color: string,
  colorStart: number,
  token: string,
  $token: Element,
  index: number,
  $parent: ElementContent[]
) => {
  const colorEnd = colorStart + color.length

  const beforeColor = token.slice(0, colorStart)
  const afterColor = token.slice(colorEnd)

  const newElements: Element[] = []

  if (beforeColor.length > 0) {
    newElements.push({
      type: "element",
      tagName: "span",
      properties: $token.properties,
      children: [{ type: "text", value: beforeColor }]
    })
  }

  newElements.push({
    type: "element",
    tagName: "span",
    properties: $token.properties,
    children: [createColorPreviewElement(color), { type: "text", value: token.slice(colorStart) }]
  })

  if (afterColor.length > 0) {
    newElements.push({
      type: "element",
      tagName: "span",
      properties: $token.properties,
      children: [{ type: "text", value: afterColor }]
    })
  }

  $parent.splice(index, 1, ...newElements)
}

type MatchResult =
  | { type: "INVALID"; color: null }
  | {
      type: "TOKEN_IS_COLOR" | "MERGED_TOKEN_IS_COLOR"
      color: string
    }
  | {
      type: "TOKEN_HAS_COLOR"
      color: string
      start: number
    }

const matchMaybeHexToken = (token: string, index: number, $parent: ElementContent[]): MatchResult => {
  if (validateHTMLColorHex(token)) {
    return { type: "TOKEN_IS_COLOR", color: token }
  }

  // トークンを読み進めて、連結したらhexの文字列になるかどうかを判定する
  const maybeHex = walkValidateHTMLColorHex($parent, index)

  if (maybeHex) {
    return { type: "MERGED_TOKEN_IS_COLOR", color: maybeHex }
  }

  return { type: "INVALID", color: null }
}

const matchMaybeRgbToken = (token: string, index: number, $parent: ElementContent[]): MatchResult => {
  if (validateHTMLColorRgb(token)) {
    return { type: "TOKEN_IS_COLOR", color: token }
  }

  // トークンを読み進めて、連結したらrgb()の文字列になるかどうかを判定する
  const maybeRgb = walkValidateHTMLColorRgb($parent, token, index)

  if (maybeRgb) {
    return { type: "MERGED_TOKEN_IS_COLOR", color: maybeRgb }
  }

  return { type: "INVALID", color: null }
}

const matchMaybeColorNameToken = (token: string): MatchResult => {
  if (validateHTMLColorName(token)) {
    return { type: "TOKEN_IS_COLOR", color: token }
  }

  return { type: "INVALID", color: null }
}

// hexを含んでいるかもしれないトークンを判定する
const matchMaybeTokenHasHex = (token: string): MatchResult => {
  const foundMaybeHex = token.match(/#[a-fA-F0-9]{3,8}/)

  if (!foundMaybeHex) {
    return { type: "INVALID", color: null }
  }

  const [maybeHex] = foundMaybeHex
  const maybeHexIdx = foundMaybeHex.index

  if (maybeHexIdx === undefined) {
    return { type: "INVALID", color: null }
  }

  if (validateHTMLColorHex(maybeHex)) {
    return { type: "TOKEN_HAS_COLOR", color: maybeHex, start: maybeHexIdx }
  }

  return { type: "INVALID", color: null }
}

// rgbかrgbaを含んでいるかもしれないトークンを判定する
const matchMaybeTokenHasRgb = (token: string): MatchResult => {
  const foundMaybeRgb = token.match(/rgba?\([0-9, ?]+\)/)

  if (!foundMaybeRgb) {
    return { type: "INVALID", color: null }
  }

  const [maybeRgb] = foundMaybeRgb
  const maybeRgbIdx = foundMaybeRgb.index

  if (maybeRgbIdx === undefined) {
    return { type: "INVALID", color: null }
  }

  if (validateHTMLColorRgb(maybeRgb)) {
    return { type: "TOKEN_HAS_COLOR", color: maybeRgb, start: maybeRgbIdx }
  }

  return { type: "INVALID", color: null }
}

export const addColorPreview = (element: LineElement) => {
  const tokens = element.children

  tokens.forEach((token, i) => {
    if (token.type !== "element") return

    const values = tokenValueWithRaw(token)
    if (values === null) return

    const { value, raw } = values

    // トークン全体が色コードの場合に実行する関数
    const onTokenIsColorCode = (color: string) => {
      convertSpaceToElement(raw, token, i, tokens)
      prependColorPreviewElement(color, token)
    }

    // 複数先まで先読みしてトークンを連結すると色コードになる場合に実行する関数
    const onMergedTokenIsColorCode = (color: string) => {
      convertSpaceToElement(raw, token, i, tokens)
      prependColorPreviewElement(color, token)
    }

    // トークン中に色コードが含まれる場合に実行する関数
    const onTokenHasColorCode = (color: string, start: number) => {
      if (start === 0) {
        convertSpaceToElement(raw, token, i, tokens)
        prependColorPreviewElement(color, token)
        return
      }
      insertColorPreviewElementWithSplit(color, start, raw, token, i, tokens)
    }

    let result: MatchResult = { type: "INVALID", color: null }

    if (value.startsWith("#")) {
      result = matchMaybeHexToken(value, i, tokens)
    } else if (value.startsWith("rgb")) {
      result = matchMaybeRgbToken(value, i, tokens)
    } else if (value.includes("#")) {
      result = matchMaybeTokenHasHex(value)
    } else if (value.includes("rgb")) {
      result = matchMaybeTokenHasRgb(value)
    } else {
      result = matchMaybeColorNameToken(value)
    }

    switch (result.type) {
      case "TOKEN_IS_COLOR":
        onTokenIsColorCode(result.color)
        break
      case "TOKEN_HAS_COLOR":
        onTokenHasColorCode(result.color, result.start)
        break
      case "MERGED_TOKEN_IS_COLOR":
        onMergedTokenIsColorCode(result.color)
        break
      case "INVALID":
        break
    }
  })
}
