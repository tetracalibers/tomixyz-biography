import { SITE } from "./../config"
import fs from "node:fs/promises"

const logoSrc = new URL("../../images/for-og/pastel-tomixy_op.png", import.meta.url)
const logoBuffer = await fs.readFile(logoSrc)

const template = (title: string, subtitle?: string) => /* html */ `
  <div style="display: flex; width: 1200px; height: 630px;" tw="bg-white py-6">
    <div style="display: flex" tw="m-auto h-11/12 w-11/12 bg-slate-100 shadow-inner rounded-bl-[10rem] rounded-tr-[10rem]">
      <div style="display: flex" tw="m-auto flex-col items-center justify-center">
        <div style="display: flex" tw="overflow-hidden">
          <img width="200" src=${"data:image/png;base64," + logoBuffer.toString("base64")} />
        </div>
        <div style="display: flex" tw="flex-col justify-center items-center text-slate-500">
          <h1 style="${
            subtitle ? "font-family: 'AppleTsukuBRdGothic'" : ""
          }" tw="text-5xl text-center mb-2">${title}</h1>
          ${subtitle ? `<p tw="text-3xl mb-4">${subtitle}</p>` : ""}
        </div>
      </div>
    </div>
  </div>
`

export const defaultOgTemplate = () => template(SITE.name)
export const indexOgTemplate = (title: string) => template(title, SITE.name)
export const nestedOgTemplate = (title: string, category: string) => template(title, SITE.name + " - " + category)
