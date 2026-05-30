import { groq } from 'next-sanity'

export const allPostsQuery = groq`
  *[_type == "post" && !hidden] | order(date desc) {
    "slug": slug.current,
    title,
    date,
    tag,
    excerpt,
  }
`

export const postBySlugQuery = groq`
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    title,
    date,
    tag,
    excerpt,
    hidden,
    body,
  }
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(num asc) {
    "slug": slug.current,
    name,
    type,
    num,
    desc,
    stack,
    images,
    link,
    linkLabel,
    appStoreLink,
    androidComingSoon,
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
    num,
    desc,
    stack,
    images,
    link,
    linkLabel,
    appStoreLink,
    androidComingSoon,
    privacyPolicy,
    wip,
    brainstorm,
    body,
  }
`
