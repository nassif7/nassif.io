import { groq } from 'next-sanity'

export const allCollectionsQuery = groq`
  *[_type == "collection"] | order(title asc) {
    "slug": slug.current,
    title,
  }
`

export const allPostsQuery = groq`
  *[_type == "post" && !hidden] | order(date desc) {
    "slug": slug.current,
    title,
    date,
    tags,
    excerpt,
    "collections": collections[]->{ "slug": slug.current, title },
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    date,
    tags,
    excerpt,
    hidden,
    body,
    "collections": collections[]->{ "slug": slug.current, title },
  }
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(_createdAt asc) {
    "slug": slug.current,
    name,
    type,
    desc,
    categories,
    stack,
    images,
    links,
    privacyPolicy,
    wip,
    brainstorm,
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    "slug": slug.current,
    name,
    type,
    desc,
    categories,
    stack,
    images,
    links,
    privacyPolicy,
    wip,
    brainstorm,
    body,
  }
`
