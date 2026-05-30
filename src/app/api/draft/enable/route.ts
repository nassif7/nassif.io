import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  if (searchParams.get('secret') !== process.env.SANITY_PREVIEW_SECRET) {
    return new Response('Invalid secret', { status: 401 })
  }

  ;(await draftMode()).enable()

  const slug = searchParams.get('slug')
  const type = searchParams.get('type') ?? 'post'
  redirect(type === 'project' ? `/projects/${slug ?? ''}` : `/blog/${slug ?? ''}`)
}
