import fs from "node:fs/promises"

import path from "node:path"
import { packageDirectory } from "pkg-dir"

import TextToSVG from "text-to-svg"

const strictObjectKeys = <T extends { [key: string]: unknown }>(obj: T): (keyof T)[] => {
  return Object.keys(obj)
}

type FromEntries<T extends [PropertyKey, unknown][]> = {
  [K in T[number][0]]: Extract<T[number], [K, unknown]>[1]
}

const strictObjectFromEntries = <T extends [string, unknown][]>(entries: T) => {
  return Object.fromEntries(entries) as FromEntries<T>
}

interface EmbedAssetsPaths<IMAGE_NAME extends string> {
  font: {
    en: string
    ja: string
  }
  image?: Record<IMAGE_NAME, string>
}

const initEmbedFont = (absFontFilePath: string) => {
  return TextToSVG.loadSync(absFontFilePath)
}

const initEmbedImage = async (absImageFilePath: string) => {
  const buffer = await fs.readFile(absImageFilePath)
  return "data:image/png;base64," + buffer.toString("base64")
}

export const loadEmbedAssets = async <IMAGE_NAME extends string>(assets: EmbedAssetsPaths<IMAGE_NAME>) => {
  const root = await packageDirectory()
  if (!root) {
    throw new Error("package directory not found")
  }

  const { image = {}, font } = assets

  const toAbsPath = (fromRootPath: string) => path.resolve(root, fromRootPath)

  const allEmbedImageLoaders = () => {
    return strictObjectKeys(image).map((key) => {
      const absPath = toAbsPath(image[key])
      return [key, () => initEmbedImage(absPath)] as const
    })
  }

  const loadAllEmbedImages = async () => {
    return Promise.all(
      allEmbedImageLoaders().map(async ([name, loader]): Promise<[IMAGE_NAME, string]> => {
        return [name, await loader()]
      })
    )
  }

  return {
    font: {
      en: initEmbedFont(toAbsPath(font.en)),
      ja: initEmbedFont(toAbsPath(font.ja))
    },
    image: strictObjectFromEntries(await loadAllEmbedImages())
  }
}
