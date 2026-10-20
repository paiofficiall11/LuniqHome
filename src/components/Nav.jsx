const LINKS = [
  ['#suite', 'Suite'],
  ['#ai', 'Luniq AI'],
  ['#identity', 'Identity'],
  ['#platform', 'Platform'],
  ['#faq', 'FAQ'],
]

const OVERLAY = [
  ['#vision', 'Vision'],
  ['#suite', 'The suite'],
  ['#ai', 'Luniq AI'],
  ['#platform', 'Platform'],
  ['#faq', 'FAQ'],
  ['#join', 'Get access'],
]

export default function Nav({ site, nvRef, mbRef, mlRef, ovRef }) {
  const go = (href) => (e) => site.onAnchor(e, href)
  return (
    <>
      <nav id="nv" ref={nvRef}>
        <a className="logo" href="#top" aria-label="Luniq home" onClick={go('#top')}>
          <span className="mk"></span>
        </a>
        <div className="nr">
          {LINKS.map(([href, label]) => (
            <a key={href} className="l" href={href} onClick={go(href)}>{label}</a>
          ))}
          <a className="ga" href="#join" onClick={go('#join')}>Get access</a>
          <button id="mb" aria-expanded="false" aria-controls="ov" ref={mbRef}>
            <span id="ml" ref={mlRef}>Menu</span>
          </button>
        </div>
      </nav>
      <div id="ov" role="dialog" aria-label="Menu" ref={ovRef}>
        {OVERLAY.map(([href, label]) => (
          <a key={href} href={href} onClick={go(href)}>{label}</a>
        ))}
      </div>
    </>
  )
}
