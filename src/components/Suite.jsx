const PRODUCTS = [
  {
    vars: { '--p': '0% 42%', '--z': '130%', '--mp': '0% 29%' },
    num: '01 / 05', vb: 'Meet', title: 'Meet',
    text: 'Set up meetings, keep track of every one, and let Meet record and transcribe the conversation so nothing said goes missing.',
    caps: ['Scheduling', 'Integrations', 'Recordings', 'Transcripts'],
    slot: 'M', slotLabel: 'Meet',
  },
  {
    vars: { '--p': '100% 22%', '--z': '200%', '--mp': '100% 0%' },
    num: '02 / 05', vb: 'Celebrate', title: 'Invites',
    text: 'Bring people to the moments that matter, and keep every celebration in one place.',
    caps: ['Guest lists', 'RSVPs', 'Shared moments'],
    slot: 'I', slotLabel: 'Invites',
  },
  {
    vars: { '--p': '95% 45%', '--z': '120%', '--mp': '65% 39%' },
    num: '03 / 05', vb: 'Grow', title: 'Careers',
    text: 'Chart your path, track your progress, and let your record speak for you.',
    caps: ['Living CV', 'Progress tracking', 'Career paths'],
    slot: 'C', slotLabel: 'Careers',
  },
  {
    vars: { '--p': '100% 86%', '--z': '150%', '--mp': '100% 100%' },
    num: '04 / 05', vb: 'Connect & Prove', title: 'Platforms',
    text: 'Communities where leaderboards, an XP ledger and a living CV turn effort into proof.',
    caps: ['Leaderboards', 'XP ledger', 'Communities'],
    slot: 'P', slotLabel: 'Platforms',
  },
  {
    vars: { '--p': '0% 100%', '--z': '160%', '--mp': '0% 100%' },
    num: '05 / 05', vb: 'Create', title: 'Tools',
    text: 'Practical tools for making things, signed in with the same Luniq account.',
    caps: [], capLink: { href: '#ai', label: 'Luniq AI' },
    slot: 'T', slotLabel: 'Tools',
  },
]

export default function Suite({ site }) {
  const go = (href) => (e) => site.onAnchor(e, href)
  return (
    <section id="suite">
      <div className="sh2">
        <span className="lb rv">The suite</span>
        <h2 className="rv">Five products. One account.</h2>
      </div>
      <div className="stack">
        {PRODUCTS.map((p) => (
          <article key={p.title} className="pn" style={p.vars}>
            <div className="bg"></div>
            <div className="in">
              <div className="pr"><span>{p.num}</span><span className="vb">{p.vb}</span></div>
              <div className="pb">
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                  <div className="cp">
                    {p.capLink && <a href={p.capLink.href} onClick={go(p.capLink.href)}>{p.capLink.label}</a>}
                    {p.caps.map((c) => <span key={c}>{c}</span>)}
                  </div>
                </div>
                <div className="slot"><b>{p.slot}</b><small>{p.slotLabel}</small></div>
              </div>
            </div>
            <div className="sd"></div>
          </article>
        ))}
      </div>
    </section>
  )
}
