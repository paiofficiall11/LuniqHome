import { useEffect } from 'react'
import Lenis from 'lenis'

const cl = (v, a, b) => Math.max(a, Math.min(b, v))

export default function useLuniqSite(refs) {
  useEffect(() => {
    const d = document
    const H = d.documentElement
    const rm = matchMedia('(prefers-reduced-motion:reduce)').matches
    const dpr = Math.min(devicePixelRatio || 1, 2)
    const LOAD_MS = 1200
    const R = refs
    let lenis = null
    let go = false
    let fr = false
    const menuOpen = { v: false }

    if (!rm) lenis = new Lenis({ duration: 1.25, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) })

    /* ---------- menu ---------- */
    function tm(o) {
      menuOpen.v = o
      R.ov.current.classList.toggle('on', o)
      R.mb.current.setAttribute('aria-expanded', o)
      R.ml.current.textContent = o ? 'Close' : 'Menu'
      if (lenis) o ? lenis.stop() : lenis.start()
      d.body.style.overflow = o ? 'hidden' : ''
    }
    function onAnchor(e, href) {
      const t = d.querySelector(href)
      if (!t) return
      e.preventDefault()
      if (menuOpen.v) tm(false)
      requestAnimationFrame(() => {
        lenis ? lenis.scrollTo(t, { duration: 1.6 }) : t.scrollIntoView({ behavior: 'smooth' })
      })
    }
    R.onAnchor = onAnchor
    R.mb.current.onclick = () => tm(!menuOpen.v)
    const onKey = (e) => { if (e.key === 'Escape') tm(false) }
    addEventListener('keydown', onKey)

    /* ---------- reveal ---------- */
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.15 })
    d.querySelectorAll('.rv').forEach((e) => io.observe(e))

    /* ---------- wordmark fit ---------- */
    function fit(el, m) {
      el.style.fontSize = '100px'
      const w = el.getBoundingClientRect().width
      el.style.fontSize = (100 * m / w) + 'px'
    }
    function ft() {
      fit(R.wm.current, R.wm.current.parentElement.clientWidth)
      const p = R.fw.current.parentElement
      fit(R.fw.current, p.clientWidth)
      p.style.fontSize = R.fw.current.style.fontSize
    }
    addEventListener('resize', ft)
    ft()
    if (d.fonts && d.fonts.ready) d.fonts.ready.then(() => { fr = true; ft() })
    setTimeout(() => { fr = true }, 1500)

    /* ---------- loader ---------- */
    function finish() {
      const tr = d.querySelector('.logo .mk').getBoundingClientRect()
      const fm = R.fm.current, ld = R.ld.current
      const r0 = fm.getBoundingClientRect()
      fm.style.transition = 'none'
      fm.style.transform = 'none'
      fm.style.left = r0.left + 'px'
      fm.style.top = r0.top + 'px'
      fm.style.height = r0.height + 'px'
      void fm.offsetWidth
      fm.style.transition = ''
      fm.style.left = tr.left + 'px'
      fm.style.top = tr.top + 'px'
      fm.style.height = tr.height + 'px'
      ld.classList.add('out')
      setTimeout(() => { go = true; H.classList.add('go') }, 450)
      setTimeout(() => { H.classList.add('fin') }, 1650)
    }
    if (rm) {
      H.classList.add('go', 'fin')
      go = true
    } else {
      let t0 = null
      const st = (ts) => {
        t0 = t0 || ts
        const el = ts - t0
        let p = cl(el / LOAD_MS, 0, 1)
        p = 1 - Math.pow(1 - p, 3)
        if (!fr) p = Math.min(p, 0.9)
        R.lc.current.textContent = Math.round(p * 100)
        R.fm.current.style.setProperty('--p', p)
        if (el >= LOAD_MS && fr && p >= 1) { finish(); return }
        requestAnimationFrame(st)
      }
      requestAnimationFrame(st)
    }

    /* ---------- hero dust ---------- */
    const cv = R.cv.current, cx2 = cv.getContext('2d')
    let CW, CH
    function rz() {
      CW = cv.width = cv.offsetWidth * dpr
      CH = cv.height = cv.offsetHeight * dpr
    }
    rz()
    addEventListener('resize', rz)
    const P = []
    for (let i = 0; i < 60; i++) P.push({ x: Math.random(), y: Math.random(), r: Math.random() * 1.7 + 0.4, v: Math.random() * 0.00006 + 0.00001, a: Math.random() * 0.4 + 0.1 })
    function dust(t) {
      cx2.clearRect(0, 0, CW, CH)
      P.forEach((p) => {
        p.y -= p.v * 16
        p.x += Math.sin(t / 3000 + p.r) * 0.0002
        if (p.y < 0) p.y = 1
        cx2.fillStyle = 'rgba(215,205,255,' + p.a * (0.6 + 0.4 * Math.sin(t / 700 + p.r * 9)) + ')'
        cx2.beginPath()
        cx2.arc(p.x * CW, p.y * CH, p.r * dpr, 0, 7)
        cx2.fill()
      })
    }

    /* ---------- pointer / cursor ---------- */
    let vh = innerHeight, tx = 0.5, ty = 0.5, sx = 0.5, sy = 0.5, px = 0, py = 0, cx = 0, cy = 0
    const ws = Array.from(R.mf.current.querySelectorAll('.w'))
    let lit = -1
    if (rm) ws.forEach((w) => w.classList.add('l'))
    const onPtr = (e) => {
      tx = e.clientX / innerWidth
      ty = e.clientY / innerHeight
      px = e.clientX
      py = e.clientY
      R.cur.current.style.opacity = 1
    }
    addEventListener('pointermove', onPtr)
    const onOver = (e) => {
      R.cur.current.classList.toggle('h', !!(e.target.closest && e.target.closest('a,button,.rw,.qa,.sp,.fq label')))
    }
    d.addEventListener('pointerover', onOver)

    /* ---------- master scroll loop ---------- */
    const nv = R.nv.current, tl = R.tl.current, hp = R.hp.current, ht = R.ht.current, sec = R.sec.current, cur = R.cur.current
    let raf = 0
    function loop(t) {
      if (lenis) lenis.raf(t)
      const y = scrollY
      vh = innerHeight
      const hs = cl(y / vh, 0, 1.2)
      if (hs < 1.15) {
        sx += (tx - sx) * 0.05
        sy += (ty - sy) * 0.05
        if (!rm) dust(t)
        hp.style.transform = 'translate3d(' + ((0.5 - sx) * 30) + 'px,' + ((0.5 - sy) * 20 + y * 0.3) + 'px,0) scale(' + (1 + hs * 0.12) + ')'
        if (go) ht.style.opacity = cl(1 - hs * 1.5, 0, 1)
      }
      const r = sec.getBoundingClientRect()
      const p = cl((vh * 0.8 - r.top) / (r.height * 0.7), 0, 1)
      const n = Math.floor(p * ws.length + 0.001)
      if (!rm && n !== lit) {
        ws.forEach((w, i) => w.classList.toggle('l', i < n))
        lit = n
      }
      const pn = d.querySelectorAll('.pn')
      pn.forEach((el, i) => {
        const nx = pn[i + 1]
        if (!nx) return
        const k = cl(1 - nx.getBoundingClientRect().top / vh, 0, 1)
        el.style.transform = 'scale(' + (1 - 0.08 * k) + ')'
        el.querySelector('.sd').style.opacity = k * 0.65
      })
      nv.classList.toggle('sc', y > 40)
      const tr2 = tl.getBoundingClientRect()
      tl.style.setProperty('--f', (cl((vh * 0.62 - tr2.top) / tr2.height, 0, 1) * 100) + '%')
      d.querySelectorAll('.ev').forEach((e) => {
        const o = e.getBoundingClientRect().top < vh * 0.62
        if (e.classList.contains('on') !== o) e.classList.toggle('on', o)
      })
      cx += (px - cx) * 0.18
      cy += (py - cy) * 0.18
      cur.style.transform = 'translate3d(' + cx + 'px,' + cy + 'px,0)'
      raf = requestAnimationFrame(loop)
    }
    requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      removeEventListener('resize', ft)
      removeEventListener('resize', rz)
      removeEventListener('pointermove', onPtr)
      removeEventListener('keydown', onKey)
      d.removeEventListener('pointerover', onOver)
      io.disconnect()
      if (lenis) lenis.destroy()
    }
  }, [refs])

  return { onAnchor: (e, href) => refs.onAnchor(e, href) }
}
