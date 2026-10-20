import { useEffect, useRef, useState } from 'react'

const STEPS = [
  ['Meet', 'Meetings and transcripts', 'Your meetings, recordings and transcripts join your profile, not a silo.'],
  ['Invites', 'Moments remembered', 'The moments you host and attend are remembered.'],
  ['Careers', 'A living CV', 'Your path and your living CV grow as you act.'],
  ['Platforms', 'XP and rank', 'XP and rankings turn effort into proof.'],
  ['Tools', 'Creations and Luniq AI', 'What you create, with Luniq AI, travels with you.'],
]

export default function Identity({ idcRef, site }) {
  const [step, setStep] = useState(0)
  const [inView, setInView] = useState(false)
  const rootRef = useRef(null)
  const rm = useRef(matchMedia('(prefers-reduced-motion:reduce)').matches).current

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: '-25% 0px -25% 0px' })
    io.observe(rootRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!inView || rm) return
    const t = setInterval(() => setStep((s) => (s + 1) % STEPS.length), 4000)
    return () => clearInterval(t)
  }, [inView, rm])

  const tilt = (e) => {
    if (rm || !matchMedia('(hover:hover)').matches) return
    const r = idcRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    const el = idcRef.current
    el.style.transform = `perspective(1200px) rotateY(${(x - 0.5) * 14}deg) rotateX(${-(y - 0.5) * 14}deg)`
    el.style.setProperty('--mx', x * 100 + '%')
    el.style.setProperty('--my', y * 100 + '%')
  }
  const reset = () => { if (idcRef.current) idcRef.current.style.transform = '' }

  return (
    <section className="wh" id="identity" ref={rootRef}>
      <div>
        <span className="lb rv">One identity</span>
        <h2 className="rv">One account. Everything follows.</h2>
        <div className="stp">
          {STEPS.map(([name, , desc], i) => (
            <div
              key={name}
              className={'sp' + (i === step ? ' on' : '')}
              role="button"
              tabIndex="0"
              onClick={() => i !== step && setStep(i)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setStep(i) }
              }}
            >
              <b><i>{String(i + 1).padStart(2, '0')}</i>{name}</b>
              <div className="sx"><p>{desc}</p></div>
            </div>
          ))}
        </div>
        <a className="pl k" href="#join" onClick={(e) => site.onAnchor(e, '#join')}>Get early access</a>
      </div>
      <div className="idk rv">
        <div className="fl">
          <div className="idc" ref={idcRef} onPointerMove={tilt} onPointerLeave={reset}>
            <div className="cd1"><span className="mk"></span>Luniq<em>ID</em></div>
            <div className="cd2">
              <i className="chip"></i>
              <div id="cap" key={step}><b>{STEPS[step][0]}</b>{STEPS[step][1]}</div>
            </div>
            <div className="cd3">
              <span>One account</span>
              <div className="pks">
                {['M', 'I', 'C', 'P', 'T'].map((k, i) => (
                  <b key={k} className={i <= step ? (i === step ? 'on cu' : 'on') : ''}>{k}</b>
                ))}
              </div>
            </div>
            <i className="sh"></i>
          </div>
        </div>
      </div>
    </section>
  )
}
