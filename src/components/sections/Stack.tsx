'use client'

import shared from './section.module.css'
import styles from './Stack.module.css'

const TOOLS = [
  { name: 'React',         level: 'pro',    left: 38, top: 32 },
  { name: 'TypeScript',    level: 'pro',    left: 20, top: 14 },
  { name: 'Next.js',       level: 'pro',    left: 54, top: 46 },
  { name: 'Node.js',       level: 'pro',    left: 14, top: 46 },
  { name: 'Tailwind',      level: 'good',   left: 48, top: 10 },
  { name: 'Git',           level: 'good',   left: 32, top: 58 },
  { name: 'React Native',  level: 'good',   left: 58, top: 24 },
  { name: 'REST APIs',     level: 'good',   left: 8,  top: 28 },
  { name: 'PostgreSQL',    level: 'good',   left: 40, top: 68 },
  { name: 'Vercel',        level: 'good',   left: 64, top: 56 },
  { name: 'Zustand',       level: 'good',   left: 24, top: 38 },
  { name: 'Framer Motion', level: 'doable', left: 18, top: 64 },
  { name: 'Figma',         level: 'doable', left: 62, top: 6  },
  { name: 'Docker',        level: 'doable', left: 54, top: 76 },
  { name: 'Python',        level: 'doable', left: 34, top: 4  },
  { name: 'GraphQL',       level: 'doable', left: 70, top: 38 },
  { name: 'Supabase',      level: 'doable', left: 10, top: 76 },
] as const

const ROTATES = [-2.1, 1.4, -0.8, 2.6, -1.7, 0.9, -2.4, 1.1, -0.5, 2.0, -1.3, 0.7, -2.8, 1.6, -0.4, 2.2, -1.0]

export function Stack() {
  return (
    <section id="stack" className={shared.section}>
      <span className={shared.label}>Stack</span>
      <h2 className={shared.heading}>What I work with</h2>

      <div className={styles.scatter}>
        {TOOLS.map((tool, i) => (
          <span
            key={tool.name}
            className={`${styles.chip} ${styles[tool.level]}`}
            style={{
              '--r': `${ROTATES[i]}deg`,
              left: `${tool.left}%`,
              top:  `${tool.top}%`,
            } as React.CSSProperties}
          >
            {tool.name}
          </span>
        ))}
      </div>
    </section>
  )
}
