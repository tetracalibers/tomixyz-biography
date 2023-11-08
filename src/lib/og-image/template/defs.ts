export const defInsetShadowFilter = (id: string) => {
  return /* html */ `
    <filter id="${id}" x="-50%" y="-50%" width="200%" height="200%">
      <feComponentTransfer in="SourceAlpha">
        <feFuncA type="table" tableValues="1 0" />
      </feComponentTransfer>
      <feGaussianBlur stdDeviation="4" />
      <feOffset dx="0" dy="2" result="offsetblur" />
      <feFlood flood-color="black" flood-opacity="0.1" result="color" />
      <feComposite in2="offsetblur" operator="in" />
      <feComposite in2="SourceAlpha" operator="in" />
      <feMerge>
        <feMergeNode in="SourceGraphic" />
        <feMergeNode />
      </feMerge>
    </filter>
  `
}

interface RoundCornerMaskParams {
  x: number
  y: number
  width: number
  height: number
  radius: number
}

export const defRoundCornerMask = (id: string, params: RoundCornerMaskParams) => {
  const { x, y, width: w, height: h, radius: r } = params

  // 角の欠けたPolygonを作る
  const polygonPoints = () => {
    const lt = `${x},${y}`
    const rt = `${x + w - r},${y} ${x + w - r},${y + r} ${x + w},${y + r}`
    const rb = `${x + w},${y + h}`
    const lb = `${x + r},${y + h} ${x + r},${y + h - r} ${x},${y + h - r}`

    // 左上から時計回りに
    return `${lt} ${rt} ${rb} ${lb}`
  }

  return /* html */ `
    <mask id="${id}">
      <polygon points="${polygonPoints()}" fill="white" />
      <circle cx="${x + r}" cy="${y + h - r}" r="${r}" fill="white" />
      <circle cx="${x + w - r}" cy="${y + r}" r="${r}" fill="white" />
    </mask>
  `
}
