'use client'

import posthog from 'posthog-js'
import { FaApple, FaGooglePlay } from 'react-icons/fa'
import styles from '@/app/(site)/projects/[slug]/project.module.css'

interface Props {
  projectName: string
  link?: string
  linkLabel?: string
  privacyPolicy?: string
  appStoreLink?: string
  androidComingSoon?: boolean
}

export function ProjectLinks({ projectName, link, linkLabel, privacyPolicy, appStoreLink, androidComingSoon }: Props) {
  const handleClick = (linkType: string) => {
    posthog.capture('project_link_clicked', { project_name: projectName, link_type: linkType })
  }

  return (
    <>
      {privacyPolicy && (
        <a href={privacyPolicy} className={styles.link} onClick={() => handleClick('privacy_policy')}>
          Privacy Policy
        </a>
      )}

      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.link} onClick={() => handleClick('external')}>
          {linkLabel}
        </a>
      )}

      {(appStoreLink || androidComingSoon) && (
        <div className={styles.storeLinks}>
          {appStoreLink && (
            <a href={appStoreLink} target="_blank" rel="noopener noreferrer" className={styles.storeBtn} onClick={() => handleClick('app_store')}>
              <FaApple className={styles.storeIcon} />
              <span className={styles.storeMeta}>
                <span className={styles.storeSmall}>Download on the</span>
                <span className={styles.storeBig}>App Store</span>
              </span>
            </a>
          )}
          {androidComingSoon && (
            <div className={styles.storeBtnDisabled}>
              <FaGooglePlay className={styles.storeIcon} />
              <span className={styles.storeMeta}>
                <span className={styles.storeSmall}>Coming soon on</span>
                <span className={styles.storeBig}>Google Play</span>
              </span>
            </div>
          )}
        </div>
      )}
    </>
  )
}
