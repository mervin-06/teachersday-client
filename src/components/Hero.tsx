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
        <p className="hero-tag">⚙ ENGINEER&apos;S DAY COMPETITION</p>
        <h1>Think. Build.<span>Compete.</span></h1>
        <p className="hero-description">A college-wide engineering showdown for problem solvers, creators, and designers ready to turn ideas into impact.</p>
        <div className="hero-buttons">
          <button type="button" className="student-btn" onClick={() => scrollToSection("student-register")}>🎓 Join as Student</button>
        </div>
        <p className="hero-note">⌁ Four competitions · One registration</p>
      </div>
      <div className="hero-visual"><div className="engineer-circle">&lt;/&gt;</div></div>
    </section>
  );
}

export default Hero;
