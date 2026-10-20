import { useRef } from 'react'
import useLuniqSite from './hooks/useLuniqSite'
import Loader from './components/Loader'
import Cursor from './components/Cursor'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Vision from './components/Vision'
import Suite from './components/Suite'
import AiSection from './components/AiSection'
import Identity from './components/Identity'
import Day from './components/Day'
import Platform from './components/Platform'
import Faq from './components/Faq'
import Marquee from './components/Marquee'
import Join from './components/Join'
import SiteFooter from './components/SiteFooter'

export default function App() {
  const refs = {
    ld: useRef(null),
    lc: useRef(null),
    fm: useRef(null),
    nv: useRef(null),
    mb: useRef(null),
    ml: useRef(null),
    ov: useRef(null),
    wm: useRef(null),
    fw: useRef(null),
    hp: useRef(null),
    ht: useRef(null),
    cv: useRef(null),
    sec: useRef(null),
    mf: useRef(null),
    idc: useRef(null),
    fo: useRef(null),
    cur: useRef(null),
    tl: useRef(null),
  }
  const site = useLuniqSite(refs)

  return (
    <>
      <Loader refs={refs} />
      <Cursor curRef={refs.cur} />
      <Nav site={site} nvRef={refs.nv} mbRef={refs.mb} mlRef={refs.ml} ovRef={refs.ov} />
      <Hero site={site} refs={refs} />
      <Vision mfRef={refs.mf} secRef={refs.sec} />
      <Suite site={site} />
      <AiSection />
      <Identity idcRef={refs.idc} site={site} />
      <Day tlRef={refs.tl} />
      <Platform />
      <Faq />
      <Marquee />
      <Join foRef={refs.fo} />
      <SiteFooter fwRef={refs.fw} onAnchor={(e, href) => site.onAnchor(e, href)} />
    </>
  )
}
