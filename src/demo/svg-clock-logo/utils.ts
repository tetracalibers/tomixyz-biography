export const svg2dataUri = (svg: string) => {
  const base64 = btoa(svg)
  return `data:image/svg+xml;base64,${base64}`
}

export const calcArcLength = (r: number, angle: number) => {
  const rad = (angle * Math.PI) / 180
  return r * rad
}

export const calcPathCircle = (cx: number, r: number) => {
  const start = `${cx},${cx + r}`
  const arc1 = `${r},${r} 0 0,1 0,${-2 * r}`
  const arc2 = `${r},${r} 0 0,1 0,${2 * r}`
  return `M${start}a${arc1}a${arc2}Z`
}

export const calcCircularTextLength = (r: number) => {
  return Math.round(r * Math.PI * 2)
}

export const calcClockHourHandAngle = (hour: number, minute: number) => {
  // 短針は1時間で30度進む + さらに1分で0.5度進む
  const hourAngle = (hour % 12) * 30 + minute * 0.5
  return hourAngle
}

export const calcClockMinuteHandAngle = (minute: number) => {
  // 長針は1分で6度進む
  const minuteAngle = minute * 6
  return minuteAngle
}

export const fitViewbox = (svg: SVGSVGElement, { padding = 10 }) => {
  const bB = svg.getBBox()
  const width = bB.width + padding * 2
  const height = bB.height + padding * 2
  const viewBox = `${bB.x - padding} ${bB.y - padding} ${width} ${height}`
  svg.setAttribute("viewBox", viewBox)
}
