import { TopBar } from '@/components/topbar/TopBar'
import { Masthead } from '@/components/masthead/Masthead'
import { Footer } from '@/components/sections/Footer'
import styles from './site.module.css'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.wrapper}>
      <TopBar />
      <Masthead />
      {children}
      <Footer />
    </div>
  )
}
