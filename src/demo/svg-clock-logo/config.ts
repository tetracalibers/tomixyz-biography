import { calcCircularTextLength } from "./utils"

// 時計の中心座標
export const cx = 300
export const cy = 300

// 時計の目盛りを並べる円の半径
export const r = 170

// 時計の数字を並べる円の半径
export const nr = r + 30

// テキストを並べる円の半径
export const tr = nr + 30
export const textLength = calcCircularTextLength(tr)
