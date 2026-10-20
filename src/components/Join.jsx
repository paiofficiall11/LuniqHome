import { useState } from 'react'

const INTERESTS = [
  ['Meet', 'Meet'],
  ['Invites', 'Invites'],
  ['Careers', 'Careers'],
  ['Platforms', 'Platforms'],
  ['Tools & Luniq AI', 'Tools and Luniq AI'],
  ['Partnerships', 'Partnerships'],
]

export default function Join({ foRef }) {
  const [done, setDone] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [picked, setPicked] = useState([])

  const submit = (e) => {
    e.preventDefault()
    const list = picked.length ? picked.join(', ') : 'Not specified'
    const body = `Name: ${name}\nEmail: ${email}\nInterested in: ${list}\n\nI’d like early access to Luniq.`
    setDone(true)
    location.href = 'mailto:luniq.llc@gmail.com?subject=' + encodeURIComponent('Luniq early access request') + '&body=' + encodeURIComponent(body)
  }

  const tilt = (e) => {
    if (!foRef.current) return
    const r = foRef.current.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    foRef.current.style.transform = `perspective(1400px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`
  }
  const reset = () => { if (foRef.current) foRef.current.style.transform = '' }

  return (
    <section className="cta" id="join">
      <div className="bl b1"></div>
      <div className="bl b2"></div>
      <div>
        <h2>Start<br />with one<br />account.</h2>
        <p className="s">Request early access, ask a question, or talk partnerships. We read everything.</p>
        <ol className="nx3">
          <li>Send your request in under a minute.</li>
          <li>We reply with next steps.</li>
          <li>Create your account and choose your products.</li>
        </ol>
      </div>
      <form className={'fr' + (done ? ' done' : '')} ref={foRef} onSubmit={submit} onPointerMove={tilt} onPointerLeave={reset}>
        <div className="fm2">
          <div>
            <h3>Request early access</h3>
            <p className="sb">Tell us what you’d like to use first.</p>
          </div>
          <div className="fq" role="group" aria-label="Interested in">
            {INTERESTS.map(([label, value]) => {
              return (
                <label key={label}>
                  <input
                    type="checkbox"
                    name="i"
                    value={value}
                    checked={picked.includes(value)}
                    onChange={() => setPicked((p) => p.includes(value) ? p.filter((x) => x !== value) : [...p, value])}
                  />
                  <span>{label}</span>
                </label>
              )
            })}
          </div>
          <div className="fi">
            <input id="fn" name="n" required placeholder=" " autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="fn">Your name</label>
          </div>
          <div className="fi">
            <input id="fe" name="e" type="email" required placeholder=" " autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="fe">Email address</label>
          </div>
          <button className="sbm" type="submit"><span>Send request</span><i>→</i></button>
          <small>We read every message and reply with next steps.</small>
        </div>
        <div className="ok" role="status">
          <b>✓</b>
          <h3>Almost there.</h3>
          <p>Your email app should open with your request. If it doesn’t, write to luniq.llc@gmail.com.</p>
        </div>
      </form>
    </section>
  )
}
