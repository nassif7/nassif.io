import { createImageUrlBuilder } from '@sanity/image-url'
import { client } from './client'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const builder = createImageUrlBuilder(client as any)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function urlForImage(source: any): string {
  return builder.image(source).auto('format').url()
}
