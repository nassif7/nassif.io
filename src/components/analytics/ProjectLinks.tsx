'use client'

import posthog from 'posthog-js'
import { FaApple, FaGooglePlay, FaChrome, FaGithub, FaGlobe, FaNpm } from 'react-icons/fa'
import type { ProjectLink } from '@/lib/projects'
import styles from '@/app/(site)/projects/[slug]/project.module.css'

const STORE_PLATFORMS = ['App Store', 'Google Play']

function PlatformIcon({ platform }: { platform: string }) {
  switch (platform) {
    case 'App Store': return <FaApple className={styles.storeIcon} />
    case 'Google Play': return <FaGooglePlay className={styles.storeIcon} />
    case 'Chrome Web Store': return <FaChrome className={styles.storeIcon} />
    case 'GitHub': return <FaGithub className={styles.storeIcon} />
    case 'npm': return <FaNpm className={styles.storeIcon} />
    default: return <FaGlobe className={styles.storeIcon} />
  }
}

function storeLabel(platform: string): { small: string; big: string } {
  switch (platform) {
    case 'App Store': return { small: 'Download on the', big: 'App Store' }
    case 'Google Play': return { small: 'Get it on', big: 'Google Play' }
    default: return { small: 'Available on', big: platform }
  }
}

interface Props {
  projectName: string
  links: ProjectLink[]
  privacyPolicy?: string | null
}

export function ProjectLinks({ projectName, links, privacyPolicy }: Props) {
  const handleClick = (platform: string) => {
    posthog.capture('project_link_clicked', { project_name: projectName, platform })
  }

  const storeLinks = links.filter(l => STORE_PLATFORMS.includes(l.platform))
  const regularLinks = links.filter(l => !STORE_PLATFORMS.includes(l.platform))

  return (
    <>
      {privacyPolicy && (
        <a href={privacyPolicy} className={styles.link} onClick={() => handleClick('Privacy Policy')}>
          Privacy Policy
        </a>
      )}

      {regularLinks.map(l => (
        <a
          key={l._key}
          href={l.url!}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.link}
          onClick={() => handleClick(l.platform)}
        >
          {l.platform}
        </a>
      ))}

      {storeLinks.length > 0 && (
        <div className={styles.storeLinks}>
          {storeLinks.map(l => {
            const label = storeLabel(l.platform)
            if (l.comingSoon) {
              return (
                <div key={l._key} className={styles.storeBtnDisabled}>
                  <PlatformIcon platform={l.platform} />
                  <span className={styles.storeMeta}>
                    <span className={styles.storeSmall}>Coming soon on</span>
                    <span className={styles.storeBig}>{l.platform}</span>
                  </span>
                </div>
              )
            }
            return (
              <a
                key={l._key}
                href={l.url!}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.storeBtn}
                onClick={() => handleClick(l.platform)}
              >
                <PlatformIcon platform={l.platform} />
                <span className={styles.storeMeta}>
                  <span className={styles.storeSmall}>{label.small}</span>
                  <span className={styles.storeBig}>{label.big}</span>
                </span>
              </a>
            )
          })}
        </div>
      )}
    </>
  )
}
