const ROWS = [
  ['01', 'Leaderboards', 'Rankings that reward consistent effort, not one good day.'],
  ['02', 'XP ledger', 'Every action recorded as a point, so progress is never lost or disputed.'],
  ['03', 'Living CV', 'A profile that updates itself as you build and prove skills.'],
  ['04', 'Event-driven workers', 'Background jobs react to what happens, so every app stays fast.'],
  ['05', 'GraphQL API', 'One typed API behind every client, on mobile and web.'],
  ['06', 'Luniq account', 'One sign-in and one identity across all five products.'],
]

export default function Platform() {
  return (
    <section id="platform">
      <span className="lb rv">Under the hood</span>
      <h2 className="rv">Built once. Shared by all five.</h2>
      <div>
        {ROWS.map(([n, h, p]) => (
          <div key={n} className="rw">
            <span>{n}</span>
            <h3>{h}</h3>
            <p>{p}</p>
          </div>
        ))}
      </div>
      <p className="stk">Flutter · Fastify · Postgres · Redis · Appwrite</p>
    </section>
  )
}
