import "../styles/AboutCelebration.css";

function AboutCelebration() {
  return <section className="about-celebration"><div className="about-container">
    <div className="about-content">
      <p className="section-tag">✨ ABOUT THE CELEBRATION</p>
      <h2>More Than an Event,<span> It's a Celebration!</span></h2>
      <p className="about-description">Teacher's Day is a special occasion to express our gratitude, respect, and love for the teachers who guide us towards a brighter future.</p>
      <p className="about-description">This celebration is all about joy, creativity, entertainment, and making beautiful memories together.</p>
    </div>
    <div className="about-cards">
      <div className="about-card"><div className="about-icon">🎉</div><div><h3>Entertainment for Everyone</h3><p>Dance, Singing, and Speech are entertainment performances created to make our Teacher's Day celebration memorable.</p></div></div>
      <div className="about-card highlight-card"><div className="about-icon">❤️</div><div><h3>Not About Winning</h3><p>Dance, Singing, and Speech are not competitions. Everyone is welcome to participate and enjoy!</p></div></div>
      <div className="about-card certificate-card"><div className="about-icon">🏆</div><div><h3>Certificate for Every Participant</h3><p>Every participant will receive a Certificate of Participation. For team performances, each individual team member will receive a separate certificate.</p></div></div>
    </div>
  </div></section>;
}

export default AboutCelebration;
