// Minimal Lexical → HTML for the inline-only content the redesign renders:
// each top-level block becomes one HTML paragraph string (bold, italic, code, links, line breaks).
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function inline(node: any): string {
  if (node.type === 'linebreak') return '<br>'
  if (node.type === 'link' || node.type === 'autolink') {
    const href = node.fields?.url ?? node.url ?? '#'
    return `<a href="${esc(href)}">${(node.children ?? []).map(inline).join('')}</a>`
  }
  if (node.type !== 'text') return (node.children ?? []).map(inline).join('')
  let out = esc(node.text ?? '').replace(/ /g, ' ')
  const f = node.format ?? 0
  if (f & 16) out = `<code>${out}</code>`
  if (f & 1) out = `<strong>${out}</strong>`
  if (f & 2) out = `<em>${out}</em>`
  return out
}

/** Lexical editor state → array of paragraph HTML strings. Empty paragraphs are dropped. */
export function lexicalToParagraphs(state: any): string[] {
  const blocks: any[] = state?.root?.children ?? []
  const out: string[] = []
  for (const b of blocks) {
    if (b.type === 'list') {
      for (const li of b.children ?? []) out.push((li.children ?? []).map(inline).join(''))
      continue
    }
    const html = (b.children ?? []).map(inline).join('').trim()
    if (html) out.push(html)
  }
  return out
}
