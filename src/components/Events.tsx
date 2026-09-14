import "../styles/Events.css";

const events = [
  ["{ }", "Debugging Competition", "Find the fault, trace the logic, and prove your code-reading instincts.", "⚡ Logic and problem solving"],
  ["?", "Quiz Competition", "Race through engineering, science, and technology questions with confidence.", "🧠 Knowledge and speed"],
  ["✎", "Drawing Competition", "Turn an engineering idea into a thoughtful visual story with your own style.", "🎨 Creativity and expression"],
  ["⌘", "UI/UX Design Competition", "Design an intuitive digital experience that is useful, clear, and memorable.", "💡 Product thinking and design"],
];

function Events() {
  return <section className="events-section"><div className="events-container">
    <div className="events-header"><p className="section-tag">⚙ ENGINEER&apos;S DAY 2026</p><h2>Four Challenges.<span>One Big Stage.</span></h2><p>Think sharper, create boldly, and compete with fellow engineers across four exciting challenges.</p></div>
    <div className="category-title"><span>⌁</span><div><h3>Competition Tracks</h3><p>Choose one challenge or build your score across multiple events.</p></div></div>
    <div className="event-grid">{events.map(([icon, title, description, participation]) => <div className="event-card" key={title}><div className="event-icon">{icon}</div><h3>{title}</h3><p>{description}</p><div className="event-info">⏱️ 2–3 Minutes — Entertainment, not a competition</div><div className="event-info">{participation}</div></div>)}</div>
    <div className="competition-section"><div className="competition-content"><div className="competition-icon">#</div><div><p className="competition-tag">ENGINEER&apos;S DAY COMPETITION</p><h3>Make your mark.</h3><p>One registration gives you the freedom to enter the events where your skills shine brightest.</p></div></div><div className="competition-badge">Register now →</div></div>
  </div></section>;
}

export default Events;
