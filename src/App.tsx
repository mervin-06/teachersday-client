import "./App.css";
import AboutCelebration from "./components/AboutCelebration";
import Events from "./components/Events";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import StudentRegistration from "./components/StudentRegistration";

function App() {
  return (
    <main className="app">
      <Hero />
      <AboutCelebration />
      <Events />
      <StudentRegistration/>
      <Footer />
    </main>
  );
}

export default App;
