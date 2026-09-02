import "../styles/Hero.css";

const scrollToSection = (sectionId: string) => {
  document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
};

function Hero() {
  return (
    <section className="hero">
      <div className="hero-shape shape-1" />
      <div className="hero-shape shape-2" />
      <div className="hero-content">
        <p className="hero-tag">🎓 TEACHER'S DAY CELEBRATION</p>
        <h1>Celebrating Those Who<span> Inspire Our Future</span></h1>
        <p className="hero-description">A special celebration to honour our teachers with talent, entertainment, joy, and unforgettable memories.</p>
        <div className="hero-buttons">
          <button type="button" className="student-btn" onClick={() => scrollToSection("student-register")}>🎓 Join as Student</button>
          <button type="button" className="staff-btn" onClick={() => scrollToSection("staff-register")}>👩‍🏫 Join as Staff</button>
        </div>
        <p className="hero-note">✨ Everyone is welcome to participate!</p>
      </div>
      <div className="hero-visual"><div className="teacher-circle">🧑‍🏫</div></div>
    </section>
  );
}

export default Hero;
