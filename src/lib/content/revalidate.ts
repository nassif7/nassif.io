import { revalidateTag } from 'next/cache'

export const CONTENT_TAG = 'content'

/** Payload afterChange/afterDelete hook: drops the cached site content so admin edits show up at once. */
export const revalidateContent = () => {
  try {
    revalidateTag(CONTENT_TAG)
  } catch {
    // running outside Next (e.g. a migration script): nothing cached to refresh
  }
}
