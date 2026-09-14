import "../styles/AboutCelebration.css";

function AboutCelebration() {
  return <section className="about-celebration"><div className="about-container">
    <div className="about-content">
      <p className="section-tag">⌁ ABOUT THE COMPETITION</p>
      <h2>Engineering is more than a subject,<span> it&apos;s a way of thinking.</span></h2>
      <p className="about-description">Engineer&apos;s Day brings our campus together to celebrate curiosity, practical skill, and the courage to solve unfamiliar problems.</p>
      <p className="about-description">Whether you debug, calculate, draw, or design, there is a track for the way you think.</p>
    </div>
    <div className="about-cards">
      <div className="about-card"><div className="about-icon">⌘</div><div><h3>Four ways to compete</h3><p>Debugging, quiz, drawing, and UI/UX design bring different kinds of engineering talent to the same stage.</p></div></div>
      <div className="about-card highlight-card"><div className="about-icon">◎</div><div><h3>Designed for every thinker</h3><p>Choose one event or combine multiple tracks to show the full range of your technical and creative ability.</p></div></div>
      <div className="about-card certificate-card"><div className="about-icon">✦</div><div><h3>Recognition that matters</h3><p>Every participant receives a certificate and a chance to be recognized for their contribution.</p></div></div>
    </div>
  </div></section>;
}

export default AboutCelebration;
