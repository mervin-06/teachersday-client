import { useState } from "react";
import type { FormEvent } from "react";
import RegistrationSuccessModal from "./RegistrationSuccessModal";
import "../styles/StudentRegistration.css";

const apiBaseUrl = (import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "https://teachers-server-a6ul.onrender.com")).replace(/\/$/, "");
const studentEndpoint = `${apiBaseUrl}/api/register/student`;
const EVENTS = ["Debugging Competition", "Quiz Competition", "Drawing Competition", "UI/UX Design Competition"] as const;
type EventName = (typeof EVENTS)[number];
type StudentForm = { name: string; sprNumber: string; department: string; year: string; phone: string; email: string; isMultipleEvent: boolean; events: EventName[]; teamName: string; teamMembers: string[] };
const initialForm: StudentForm = { name: "", sprNumber: "", department: "", year: "", phone: "", email: "", isMultipleEvent: false, events: [], teamName: "", teamMembers: ["", ""] };

function StudentRegistration() {
  const [studentForm, setStudentForm] = useState<StudentForm>(initialForm);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfulRegistration, setSuccessfulRegistration] = useState<{ name: string; isTeam: boolean } | null>(null);
  const updateEventsMode = (isMultipleEvent: boolean) => setStudentForm((form) => ({ ...form, isMultipleEvent, events: [], teamName: "", teamMembers: ["", ""] }));
  const toggleEvent = (eventName: EventName) => setStudentForm((form) => ({ ...form, events: form.events.includes(eventName) ? form.events.filter((event) => event !== eventName) : [...form.events, eventName] }));
  const updateTeamMember = (index: number, value: string) => setStudentForm((form) => ({ ...form, teamMembers: form.teamMembers.map((member, memberIndex) => memberIndex === index ? value : member) }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    if (!studentForm.email.trim() || !/^\S+@\S+\.\S+$/.test(studentForm.email.trim())) {
      setStatus({ type: "error", message: "Please enter a valid email address." });
      setIsSubmitting(false);
      return;
    }
    if (studentForm.events.length === 0 || (studentForm.isMultipleEvent && studentForm.events.length < 2)) {
      setStatus({ type: "error", message: studentForm.isMultipleEvent ? "Select at least two events." : "Select an event to continue." });
      setIsSubmitting(false);
      return;
    }

    const payload = { ...studentForm, teamMembers: studentForm.teamMembers.map((member) => member.trim()).filter(Boolean) };

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 20000);

    try {
      const response = await fetch(studentEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      const responseText = await response.text();
      let result: { success?: boolean; message?: string } = {};

      if (responseText) {
        try {
          result = JSON.parse(responseText);
        } catch {
          result = { message: responseText || "Unable to complete registration. Please try again." };
        }
      }

      if (!response.ok) {
        throw new Error(result.message || "Unable to complete registration. Please try again.");
      }

      if (!result.success) {
        throw new Error(result.message || "Registration failed. Please try again.");
      }

      setSuccessfulRegistration({ name: payload.name, isTeam: payload.isMultipleEvent || payload.events.includes("UI/UX Design Competition") });
      setStudentForm(initialForm);
      setStatus({ type: "success", message: result.message || "Registration successful." });
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        setStatus({ type: "error", message: "The registration request took too long. Please try again." });
      } else if (error instanceof TypeError) {
        setStatus({ type: "error", message: "Network error. Please check your connection and try again." });
      } else {
        setStatus({ type: "error", message: error instanceof Error ? error.message : "Unable to complete registration. Please try again." });
      }
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return <><section className="student-registration" id="student-register"><div className="registration-container">
    <div className="registration-info"><p className="section-tag">⚙ STUDENT PARTICIPATION</p><h2>Build. Solve.<span>Compete.</span></h2><p>Join the Engineer&apos;s Day Competition and put your technical thinking, creativity, and design skills to the test.</p><div className="registration-points"><div>⚡ <span>Four challenges, one registration</span></div><div>🏆 <span>Every participant receives a certificate</span></div><div>🧠 <span>Choose the competitions that fit your strengths</span></div></div></div>
    <div className="registration-form-box"><h3>⚙ Register for Competition</h3><p>Enter your details to reserve your place.</p><form onSubmit={handleSubmit}>
      <input type="text" placeholder="Full Name" value={studentForm.name} onChange={(event) => setStudentForm({ ...studentForm, name: event.target.value })} required disabled={isSubmitting} />
      <input type="text" placeholder="SPR Number" value={studentForm.sprNumber} onChange={(event) => setStudentForm({ ...studentForm, sprNumber: event.target.value })} required disabled={isSubmitting} />
      <select value={studentForm.department} onChange={(event) => setStudentForm({ ...studentForm, department: event.target.value })} required disabled={isSubmitting}><option value="">Select Department</option><option value="CSE">Computer Science Engineering</option><option value="ECE">Electronics & Communication Engineering</option><option value="EEE">Electrical & Electronics Engineering</option><option value="MECH">Mechanical Engineering</option><option value="CIVIL">Civil Engineering</option><option value="AIDS">Artificial Intelligence & Data Science</option><option value="IT">Information Technology</option><option value="E&I">Electronics & Instrumentation</option></select>
      <select value={studentForm.year} onChange={(event) => setStudentForm({ ...studentForm, year: event.target.value })} required disabled={isSubmitting}><option value="">Select Year</option><option value="1st Year">1st Year</option><option value="2nd Year">2nd Year</option><option value="3rd Year">3rd Year</option><option value="4th Year">4th Year</option></select>
      <input type="tel" placeholder="Phone Number" value={studentForm.phone} onChange={(event) => setStudentForm({ ...studentForm, phone: event.target.value })} required disabled={isSubmitting} />
      <label className="form-label" htmlFor="student-email">Email</label><input id="student-email" type="email" placeholder="student@example.com" value={studentForm.email} onChange={(event) => setStudentForm({ ...studentForm, email: event.target.value })} required disabled={isSubmitting} />
      <fieldset className="event-choice-group"><legend>Are you joining more than one event?</legend><div className="radio-options"><label><input type="radio" name="isMultipleEvent" checked={!studentForm.isMultipleEvent} onChange={() => updateEventsMode(false)} disabled={isSubmitting} /> No</label><label><input type="radio" name="isMultipleEvent" checked={studentForm.isMultipleEvent} onChange={() => updateEventsMode(true)} disabled={isSubmitting} /> Yes</label></div></fieldset>
      {studentForm.isMultipleEvent ? <fieldset className="event-choice-group"><legend>Select Events <span>(choose at least two)</span></legend><div className="event-checkboxes">{EVENTS.map((eventName) => <label key={eventName}><input type="checkbox" checked={studentForm.events.includes(eventName)} onChange={() => toggleEvent(eventName)} disabled={isSubmitting} /> {eventName}</label>)}</div></fieldset> : <select value={studentForm.events[0] || ""} onChange={(event) => setStudentForm({ ...studentForm, events: event.target.value ? [event.target.value as EventName] : [] })} required disabled={isSubmitting}><option value="">Select Event</option>{EVENTS.map((eventName) => <option key={eventName} value={eventName}>{eventName}</option>)}</select>}
      {studentForm.events.includes("UI/UX Design Competition") && <div className="team-fields"><label className="form-label" htmlFor="team-name">Team Name</label><input id="team-name" type="text" placeholder="Team Name" value={studentForm.teamName} onChange={(event) => setStudentForm({ ...studentForm, teamName: event.target.value })} required disabled={isSubmitting} />{studentForm.teamMembers.map((member, index) => <input key={index} type="text" placeholder={`Team Member ${index + 1} Name`} value={member} onChange={(event) => updateTeamMember(index, event.target.value)} required disabled={isSubmitting} />)}</div>}
      <button type="submit" className="submit-registration" disabled={isSubmitting}>{isSubmitting ? "Registering..." : "🎉 Register Now"}</button>
      {status && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}
    </form></div>
  </div></section>{successfulRegistration && <RegistrationSuccessModal participantName={successfulRegistration.name} isTeamRegistration={successfulRegistration.isTeam} onClose={() => setSuccessfulRegistration(null)} />}</>;
}

export default StudentRegistration;
