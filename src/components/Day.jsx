const EVENTS = [
  ['08:00', 'Meet', 'You set up a meeting with someone building in your field. Meet joins, records and transcribes it, so you can stay in the conversation.'],
  ['12:30', 'Invites', 'You invite them to a small gathering. Guests, replies and details live in one place.'],
  ['16:00', 'Careers', 'You add what you shipped this week. Your living CV updates as you act.'],
  ['19:00', 'Platforms', 'A community you belong to ranks the week’s contributions, and your XP ledger records yours.'],
  ['22:00', 'Tools', 'Luniq AI turns the day’s transcripts into tomorrow’s plan, signed in with the same account.'],
]

export default function Day({ tlRef }) {
  return (
    <section id="day">
      <div className="dg">
        <div className="dh">
          <span className="lb rv">A day with Luniq</span>
          <h2 className="rv">One day. One account.</h2>
          <p className="rv">See how the suite fits together, from the first hello to tomorrow’s plan.</p>
        </div>
        <div className="tl" id="tl" ref={tlRef}>
          <i className="ln"><b></b></i>
          {EVENTS.map(([time, title, text]) => (
            <div key={time + title} className="ev">
              <time>{time}</time>
              <h3>{title}</h3>
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
