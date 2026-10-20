import { useEffect, useRef, useState } from 'react'

const SC = [
  {
    tab: 'Summarise',
    prompt: 'Summarise this meeting.',
    answer: 'You agreed to ship the new onboarding next Friday. Sam will confirm the design, and the team will review the analytics on Tuesday. One open question: launch to everyone, or a small group first?',
    actions: ['Copy', 'Save to Meet'],
    src: true,
  },
  {
    tab: 'Action items',
    prompt: 'What are my action items?',
    answer: '1. Send the revised timeline to Sam by Wednesday.\n2. Review the onboarding analytics before Tuesday’s check-in.\n3. Confirm the launch audience with the team.',
    actions: ['Copy', 'Add to tracker'],
    src: true,
  },
  {
    tab: 'Follow-up',
    prompt: 'Draft a follow-up to the team.',
    answer: 'Thanks for today. To recap: we’re shipping onboarding next Friday, Sam is confirming the design, and we’ll review the analytics on Tuesday. Reply here if I missed anything.',
    actions: ['Copy', 'Send'],
    src: true,
  },
  {
    tab: 'Schedule',
    prompt: 'Set up a 30-minute catch-up with Sam next week.',
    answer: 'I found Tuesday at 10:00, when you’re both free, and drafted the invite with an agenda from today’s open questions. Meet will record and transcribe it.',
    actions: ['Open invite', 'Add to calendar'],
    src: false,
  },
  {
    tab: 'Careers',
    prompt: 'Turn this week into a CV line.',
    answer: 'Led the product sync that set the onboarding launch plan, aligning the team on timeline, design and success metrics. Ready to add to your living CV.',
    actions: ['Copy', 'Add to living CV'],
    src: false,
  },
]

const CARDS = [
  ['01', 'Summarise', 'Turn a Meet recording or transcript into a clear summary.', '0s'],
  ['02', 'Action items', 'Pull out who agreed to do what, and by when.', '.08s'],
  ['03', 'Follow-ups', 'Draft the recap email while the meeting is still fresh.', '.16s'],
  ['04', 'Ask your meetings', 'Search across transcripts and ask what was decided, and when.', '0s'],
  ['05', 'Schedule and prepare', 'Set up the next meeting with an agenda built from open questions.', '.08s'],
  ['06', 'Grow your profile', 'Turn what you’ve done into lines for your living CV.', '.16s'],
]

const FLOW = [
  ['Meet', 'Sets up, tracks and records your meetings, and writes the transcript.'],
  ['Luniq AI', 'Reads the transcript with the context of your Luniq profile.'],
  ['Output', 'Summaries, action items and follow-ups, ready to use.'],
  ['Your profile', 'What you did lands on your one profile and living CV.'],
]

const TYPING_DELAY = 1200
const TYPING_TICK = 18
const TYPING_STEP = 2
const HOLD = 5400

export default function AiSection() {
  const [active, setActive] = useState(0)
  const [typed, setTyped] = useState('')
  const [typing, setTyping] = useState(false)
  const [visible, setVisible] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      ([e]) => setVisible(e.isIntersecting),
      { rootMargin: '-25% 0px -25% 0px' }
    )
    io.observe(rootRef.current)
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (!visible) return
    const text = SC[active].answer
    setTyped('')
    setTyping(true)
    let n = 0
    let tick, hold
    const type = () => {
      n += TYPING_STEP
      setTyped(text.slice(0, n))
      if (n < text.length) tick = setTimeout(type, TYPING_TICK)
      else {
        setTyping(false)
        hold = setTimeout(() => setActive((i) => (i + 1) % SC.length), HOLD)
      }
    }
    const start = setTimeout(type, TYPING_DELAY)
    return () => { clearTimeout(start); clearTimeout(tick); clearTimeout(hold) }
  }, [active, visible])

  const glow = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--mx', e.clientX - r.left + 'px')
    e.currentTarget.style.setProperty('--my', e.clientY - r.top + 'px')
  }

  const s = SC[active]

  return (
    <section className="ai" id="ai" ref={rootRef}>
      <div className="ag">
        <div>
          <span className="lb rv">Luniq AI · Part of Tools</span>
          <h2 className="rv">Luniq AI</h2>
          <p className="s rv">The assistant inside Luniq Tools. It reads what happened in Meet, knows your Luniq profile, and helps you write, plan and follow through.</p>
          <p className="s rv" style={{ marginTop: 16 }}>Every recording and transcript becomes something you can ask questions of, so nothing said in a meeting is lost.</p>
          <div className="ak rv">
            {['Summaries', 'Action items', 'Follow-ups', 'Scheduling', 'Search'].map((k) => <span key={k}>{k}</span>)}
          </div>
        </div>

        <div className="win rv" style={{ '--d': '.15s' }}>
          <div className="wi">
            <div className="wb">
              <span className="av2"><span className="mk"></span></span>
              <div><b>Luniq AI</b><small><i></i>Online</small></div>
            </div>
            <div className="ctx"><span>Meet transcripts</span><span>Your Luniq profile</span></div>
            <div className="tb">
              {SC.map((c, i) => (
                <button key={c.tab} className={i === active ? 'on' : ''} onClick={() => setActive(i)}>{c.tab}</button>
              ))}
            </div>
            <div className="ms" aria-live="polite">
              {s.src && (
                <div className="src">
                  <span className="wv"><i></i><i></i><i></i><i></i></span>
                  Product sync <small>· 42 min · Transcript</small>
                </div>
              )}
              <div className="bu" key={'u' + active}>{s.prompt}</div>
              <div className="ba" key={'a' + active}>
                <div className="bn"><span className="mk g"></span>Luniq AI</div>
                <div className={'bt' + (typing ? ' t' : '')}>
                  {typed}
                  {!typed && !typing && <span className="dt"><i></i><i></i><i></i></span>}
                </div>
                {!typing && (
                  <div className="ac">
                    {s.actions.map((a, i) => <span key={a} style={{ animationDelay: i * 0.12 + 's' }}>{a}</span>)}
                  </div>
                )}
              </div>
            </div>
            <div className="ip"><span>Ask Luniq AI anything…</span><span className="sn" aria-hidden="true">↑</span></div>
          </div>
        </div>
      </div>

      <div className="cg">
        {CARDS.map(([n, h, p, d]) => (
          <div key={n} className="rv" style={{ '--d': d }} onPointerMove={glow}>
            <i>{n}</i>
            <h4>{h}</h4>
            <p>{p}</p>
          </div>
        ))}
      </div>

      <div className="fh">
        <span className="lb rv">How it works with Meet</span>
        <div className="fw2 rv">
          {FLOW.map(([h, p]) => (
            <div key={h}><b>{h}</b><p>{p}</p></div>
          ))}
        </div>
      </div>
    </section>
  )
}
