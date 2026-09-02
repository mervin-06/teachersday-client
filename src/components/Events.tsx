import "../styles/Events.css";

const events = [
  ["💃", "Dance", "Express your energy and creativity through a wonderful dance performance.", "👤 Individual or Team"],
  ["🎤", "Singing", "Share your voice and make the celebration more joyful with your favourite performance.", "👤 Individual or Team"],
  ["🎙️", "Speech", "Share your thoughts, appreciation, and gratitude for the teachers who guide us.", "👤 Individual Participation"],
];

function Events() {
  return <section className="events-section"><div className="events-container">
    <div className="events-header"><p className="section-tag">🎉 CELEBRATION ACTIVITIES</p><h2>Express Yourself,<span> Celebrate Together!</span></h2><p>Share your talent, creativity, and happiness as we celebrate the wonderful teachers who inspire us every day.</p></div>
    <div className="category-title"><span>🎊</span><div><h3>Entertainment Programs</h3><p>These activities are part of the celebration and are <strong>not competitions.</strong></p></div></div>
    <div className="event-grid">{events.map(([icon, title, description, participation]) => <div className="event-card" key={title}><div className="event-icon">{icon}</div><h3>{title}</h3><p>{description}</p><div className="event-info">⏱️ 2–3 Minutes — Entertainment, not a competition</div><div className="event-info">{participation}</div></div>)}</div>
    <div className="competition-section"><div className="competition-content"><div className="competition-icon">🏆</div><div><p className="competition-tag">OPTIONAL COMPETITION</p><h3>As Your Wish</h3><p>Have a special talent? Show us something unique! Perform anything creative and express yourself.</p></div></div><div className="competition-badge">⭐ Show Your Talent</div></div>
  </div></section>;
}

export default Events;
