const PRODUCTS = [
  ['#suite', 'Meet'],
  ['#suite', 'Invites'],
  ['#suite', 'Careers'],
  ['#suite', 'Platforms'],
  ['#ai', 'Tools · Luniq AI'],
]

const EXPLORE = [
  ['#vision', 'Vision'],
  ['#identity', 'One identity'],
  ['#day', 'A day with Luniq'],
  ['#platform', 'Platform'],
  ['#faq', 'FAQ'],
]

export default function SiteFooter({ fwRef, onAnchor }) {
  const go = (href) => (e) => onAnchor(e, href)
  return (
    <footer>
      <div className="fc">
        <div>
          <a className="logo" href="#top" style={{ fontSize: 34 }} onClick={go('#top')}>
            <span className="mk" style={{ height: 38 }}></span>Luniq
          </a>
          <p style={{ color: 'var(--mut)', marginTop: 14 }}>Meet. Create. Connect. Celebrate. Grow.</p>
        </div>
        <div>
          <h4>Products</h4>
          {PRODUCTS.map(([href, label]) => <a key={label} href={href} onClick={go(href)}>{label}</a>)}
        </div>
        <div>
          <h4>Explore</h4>
          {EXPLORE.map(([href, label]) => <a key={label} href={href} onClick={go(href)}>{label}</a>)}
        </div>
        <div>
          <h4>Company</h4>
          <span className="x">LuniqLLC</span>
          <span className="x" style={{ color: 'var(--mut)' }}>Registered in Delaware, US</span>
        </div>
        <div>
          <h4>Contact</h4>
          <a href="mailto:luniq.llc@gmail.com">luniq.llc@gmail.com</a>
          <a href="#join" onClick={go('#join')}>Get early access</a>
        </div>
      </div>
      <div className="fm" aria-hidden="true"><span className="fw" id="fw" ref={fwRef}>LUNIQ</span></div>
    </footer>
  )
}
