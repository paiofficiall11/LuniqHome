const LETTERS = ['L', 'U', 'N', 'I', 'Q']

export default function Hero({ site, refs }) {
  const go = (href) => (e) => site.onAnchor(e, href)
  return (
    <header className="hero" id="top">
      <div className="hbg" aria-hidden="true">
        <div className="hp" ref={refs.hp}><div className="hi"></div></div>
      </div>
      <canvas id="cv" aria-hidden="true" ref={refs.cv}></canvas>
      <div className="hv"></div>
      <div className="ht" ref={refs.ht}>
        <p className="lead">One account for the people you meet, the things you make, and the work you&rsquo;re proud of.</p>
        <div className="ct">
          <a className="pl" href="#join" onClick={go('#join')}>Get early access</a>
          <a className="pl o" href="#suite" onClick={go('#suite')}>Explore the suite</a>
        </div>
      </div>
      <div>
        <h1 className="wm" aria-label="Luniq">
          <span className="fw" id="wm" ref={refs.wm} aria-hidden="true">
            {LETTERS.map((l, i) => (
              <span key={l} className="lt" style={{ '--i': i }}>{l}</span>
            ))}
          </span>
        </h1>
        <div className="hb">
          <span>Meet. Create. Connect. Celebrate. Grow.</span>
          <span>LuniqLLC · Delaware, US</span>
        </div>
      </div>
    </header>
  )
}
