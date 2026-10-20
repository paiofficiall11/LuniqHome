const TEXT = 'Most apps make you start over. Luniq doesn’t. One account, one identity and one profile follow you from the first hello to the work you’re proud of.'

const STEPS = [
  ['01', 'Create your account', 'One sign-in is all it takes. Your Luniq account is the key to every product in the suite.', '0s'],
  ['02', 'Pick what you need', 'Run your meetings, host celebrations, grow a career, join communities, or build with Tools and Luniq AI. Use one product or all of them.', '.12s'],
  ['03', 'Watch your profile grow', 'Everything you do adds to one profile and one record of progress, so you never start from zero again.', '.24s'],
]

export default function Vision({ mfRef, secRef }) {
  const words = TEXT.trim().split(/\s+/)
  return (
    <>
      <section id="vision" ref={secRef}>
        <span className="lb rv">Vision</span>
        <p className="mf" id="mf" ref={mfRef}>
          {words.map((w, i) => (
            <span key={i} className="w">{w} </span>
          ))}
        </p>
        <div className="mt rv">
          <span>Built by LuniqLLC</span>
          <span>Registered in Delaware, US</span>
        </div>
      </section>
      <div className="hw">
        {STEPS.map(([n, h, p, d]) => (
          <div key={n} className="rv" style={{ '--d': d }}>
            <b>{n}</b>
            <h3>{h}</h3>
            <p>{p}</p>
          </div>
        ))}
      </div>
    </>
  )
}
