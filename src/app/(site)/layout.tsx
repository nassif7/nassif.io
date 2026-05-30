import { TopBar } from '@/components/topbar/TopBar'
import { Masthead } from '@/components/masthead/Masthead'
import { Footer } from '@/components/sections/Footer'

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <TopBar />
      <Masthead />
      {children}
      <Footer />
    </>
  )
}
