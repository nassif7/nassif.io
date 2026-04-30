import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROJECTS_DIR = path.join(process.cwd(), 'content/projects')

export type ProjectMeta = {
  slug: string
  name: string
  type: string
  num: string
  desc: string
  stack: string[]
  images: string[]
  link: string | null
  linkLabel: string | null
  privacyPolicy: string | null
  wip: boolean
  brainstorm: boolean
}

export type Project = ProjectMeta & {
  content: string
}

export function getAllProjects(): ProjectMeta[] {
  const files = fs.readdirSync(PROJECTS_DIR)
  return files
    .filter(f => f.endsWith('.md'))
    .map(f => {
      const slug = f.replace(/\.md$/, '')
      const raw = fs.readFileSync(path.join(PROJECTS_DIR, f), 'utf8')
      const { data } = matter(raw)
      return {
        slug,
        name: data.name,
        type: data.type,
        num: data.num,
        desc: data.desc,
        stack: data.stack ?? [],
        images: data.images ?? [],
        link: data.link ?? null,
        linkLabel: data.linkLabel ?? null,
        privacyPolicy: data.privacyPolicy ?? null,
        wip: data.wip ?? false,
        brainstorm: data.brainstorm ?? false,
      } as ProjectMeta
    })
    .sort((a, b) => a.num.localeCompare(b.num))
}

export function getProject(slug: string): Project {
  const raw = fs.readFileSync(path.join(PROJECTS_DIR, `${slug}.md`), 'utf8')
  const { data, content } = matter(raw)
  return {
    slug,
    name: data.name,
    type: data.type,
    num: data.num,
    desc: data.desc,
    stack: data.stack ?? [],
    images: data.images ?? [],
    link: data.link ?? null,
    linkLabel: data.linkLabel ?? null,
    privacyPolicy: data.privacyPolicy ?? null,
    wip: data.wip ?? false,
    brainstorm: data.brainstorm ?? false,
    content: content.trim(),
  }
}
