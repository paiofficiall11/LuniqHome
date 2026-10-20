const WORDS = ['Meet', 'Create', 'Connect', 'Celebrate', 'Grow']

export default function Marquee() {
  const items = Array.from({ length: 15 }, (_, i) => WORDS[i % 5])
  return (
    <div className="tk" aria-hidden="true">
      <div className="tr">
        {items.map((w, i) => <span key={i}>{w}</span>)}
      </div>
    </div>
  )
}
