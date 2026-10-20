export default function Loader({ refs }) {
  return (
    <>
      <div id="ld" ref={refs.ld}><b id="lc" ref={refs.lc}>0</b></div>
      <div id="fm" aria-hidden="true" ref={refs.fm}>
        <span className="mk d"></span>
        <span className="mk f"></span>
      </div>
    </>
  )
}
