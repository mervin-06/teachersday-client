import "./App.css";
import AboutCelebration from "./components/AboutCelebration";
import Events from "./components/Events";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import StaffRegistration from "./components/StaffRegistration";
import StudentRegistration from "./components/StudentRegistration";

function App() {
  return (
    <main className="app">
      <Hero />
      <AboutCelebration />
      <Events />
      <StudentRegistration />
      <StaffRegistration />
      <Footer />
    </main>
  );
}

export default App;
