import { useEffect } from 'react'
import UtilityNav from './components/layout/UtilityNav'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Hero from './components/sections/Hero'
import AudienceTabs from './components/sections/AudienceTabs'
import QuickLinks from './components/sections/QuickLinks'
import Certifications from './components/sections/Certifications'
import AccreditationBody from './components/sections/AccreditationBody'
import AIAssessment from './components/sections/AIAssessment'
import CreditFramework from './components/sections/CreditFramework'
import Partners from './components/sections/Partners'
import GlobalExpansion from './components/sections/GlobalExpansion'
import NewsEvents from './components/sections/NewsEvents'
import MemberBanner from './components/sections/MemberBanner'
import InsightStrip from './components/sections/InsightStrip'

export default function App() {
  useEffect(() => {
    // Force scroll to top after React mounts — overrides browser scroll restoration
    // and clears any auto-focus that might scroll the page mid-way
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur()
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="min-h-screen">
      <UtilityNav />
      <Navbar />
      <main>
        <Hero />
        <AudienceTabs />
        <QuickLinks />
        {/* <Certifications /> */}
        <AccreditationBody />
        <AIAssessment />
        <CreditFramework />
        <Partners />
        <GlobalExpansion />
        <InsightStrip />
        <NewsEvents />
        <MemberBanner />
      </main>
      <Footer />
    </div>
  )
}
