import { useState } from 'react'

const FAQ = [
  ['What is Luniq?', 'Luniq is a connected suite of five products (Meet, Invites, Careers, Platforms and Tools) built by LuniqLLC and unified by one account, one identity and one profile.'],
  ['What does Meet do?', 'Meet brings your meetings together. It integrates with how you meet, helps you set up meetings, tracks them, and records transcripts, so every conversation is easy to find and act on.'],
  ['Do I need a separate account for each product?', 'No. One Luniq account signs you in to everything, and your profile travels with you across the suite.'],
  ['What is the living CV?', 'A record of what you’ve done that updates as you act across Luniq, so your profile reflects real progress instead of a stale document.'],
  ['What is Luniq AI?', 'The assistant inside Luniq Tools. It works across the suite, including Meet: summarising transcripts, pulling out action items, drafting follow-ups and helping you plan, designed to use the context of your Luniq profile.'],
  ['Who builds Luniq?', 'Luniq is built by LuniqLLC, a company registered in Delaware, US.'],
  ['How do I get access?', 'Request early access with the form below, or email luniq.llc@gmail.com and we’ll reply with next steps.'],
]

export default function Faq() {
  const [open, setOpen] = useState(0)
  return (
    <section id="faq">
      <span className="lb rv">Questions</span>
      <h2 className="rv">Good to know.</h2>
      <div className="fa">
        {FAQ.map(([q, a], i) => (
          <div key={q} className={'qa' + (i === open ? ' on' : '')}>
            <button aria-expanded={i === open} onClick={() => setOpen(i === open ? -1 : i)}>{q}<i></i></button>
            <div><p>{a}</p></div>
          </div>
        ))}
      </div>
    </section>
  )
}
