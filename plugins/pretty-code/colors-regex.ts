const REGEX_HEX = /#([a-f0-9]{6}|[a-f0-9]{3})\b/gi
const REGEX_HEXA = /#([a-f0-9]{8}|[a-f0-9]{4})\b/gi
const REGEX_RGB = /rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)/gi
const REGEX_RGBA = /rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*(?:\.\d+)?)\)/gi
const REGEX_HSL = /hsl\(\s*(\d+)\s*,\s*(\d*(?:\.\d+)?%)\s*,\s*(\d*(?:\.\d+)?%)\)/gi
const REGEX_HSLA = /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*(\d*(?:\.\d+)?)\)/gi
const REGEX_COLOR_NAME =
  /(black|silver|gray|whitesmoke|maroon|red|purple|fuchsia|green|lime|olivedrab|yellow|navy|blue|teal|aquamarine|orange|aliceblue|antiquewhite|aqua|azure|beige|bisque|blanchedalmond|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|gainsboro|ghostwhite|goldenrod|gold|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavenderblush|lavender|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|limegreen|linen|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|oldlace|olive|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|thistle|tomato|turquoise|violet|wheat|white|yellowgreen|rebeccapurple)/gi

const regex2str = (regex: RegExp) => {
  return String(regex).slice(1, -1).slice(0, -regex.flags.length)
}

const REGEX_COLOR = new RegExp(
  `(${[REGEX_HEX, REGEX_HEXA, REGEX_RGB, REGEX_RGBA, REGEX_HSL, REGEX_HSLA, REGEX_COLOR_NAME].map(regex2str).join("|")})`,
  "gi"
)

interface ParseResult {
  color: string
  start: number
  end: number
}
export const parseHtmlColor = (str: string): ParseResult[] => {
  return [...str.matchAll(REGEX_COLOR)].map((result) => ({
    color: result[0],
    start: result.index,
    end: result.index + result[0].length
  }))
}
