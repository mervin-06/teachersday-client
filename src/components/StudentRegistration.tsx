import { useState } from "react";
import type { FormEvent } from "react";
import RegistrationSuccessModal from "./RegistrationSuccessModal";
import "../styles/StudentRegistration.css";

const studentEndpoint = "https://teachers-server-a6ul.onrender.com/api/register/student";
type ParticipationType = "Individual" | "Team";
type StudentForm = { name: string; sprNo: string; department: string; year: string; phone: string; event: string; participationType: ParticipationType; teamName: string; teamMembers: string[] };
const initialForm: StudentForm = { name: "", sprNo: "", department: "", year: "", phone: "", event: "", participationType: "Individual", teamName: "", teamMembers: [""] };

function StudentRegistration() {
  const [studentForm, setStudentForm] = useState<StudentForm>(initialForm);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfulRegistration, setSuccessfulRegistration] = useState<{ name: string; isTeam: boolean } | null>(null);
  const supportsTeams = studentForm.event === "Dance" || studentForm.event === "Singing";
  const updateMember = (index: number, value: string) => setStudentForm((form) => ({ ...form, teamMembers: form.teamMembers.map((member, memberIndex) => memberIndex === index ? value : member) }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    setIsSubmitting(true);
    setStatus(null);

    const payload = {
      ...studentForm,
      teamMembers: studentForm.teamMembers.map((member) => member.trim()).filter(Boolean),
      teamName: studentForm.participationType === "Team" ? studentForm.teamName.trim() : "",
    };

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

      setSuccessfulRegistration({ name: payload.name, isTeam: payload.participationType === "Team" });
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
    <div className="registration-info"><p className="section-tag">🎓 STUDENT PARTICIPATION</p><h2>Ready to Make<span> Memories?</span></h2><p>Join the Teacher's Day Celebration and share your talent, creativity, and happiness with everyone.</p><div className="registration-points"><div>🎉 <span>Everyone is welcome to participate</span></div><div>🏆 <span>Every participant receives a certificate</span></div><div>👥 <span>Every team member receives an individual certificate</span></div></div></div>
    <div className="registration-form-box"><h3>🎉 Join as Student</h3><p>Fill in your details to register.</p><form onSubmit={handleSubmit}>
      <input type="text" placeholder="Full Name" value={studentForm.name} onChange={(event) => setStudentForm({ ...studentForm, name: event.target.value })} required disabled={isSubmitting} />
      <input type="text" placeholder="SPR Number" value={studentForm.sprNo} onChange={(event) => setStudentForm({ ...studentForm, sprNo: event.target.value })} required disabled={isSubmitting} />
      <select value={studentForm.department} onChange={(event) => setStudentForm({ ...studentForm, department: event.target.value })} required disabled={isSubmitting}><option value="">Select Department</option><option value="CSE">Computer Science Engineering</option><option value="ECE">Electronics & Communication Engineering</option><option value="EEE">Electrical & Electronics Engineering</option><option value="MECH">Mechanical Engineering</option><option value="CIVIL">Civil Engineering</option></select>
      <select value={studentForm.year} onChange={(event) => setStudentForm({ ...studentForm, year: event.target.value })} required disabled={isSubmitting}><option value="">Select Year</option><option value="1st Year">1st Year</option><option value="2nd Year">2nd Year</option><option value="3rd Year">3rd Year</option><option value="4th Year">4th Year</option></select>
      <input type="tel" placeholder="Phone Number" value={studentForm.phone} onChange={(event) => setStudentForm({ ...studentForm, phone: event.target.value })} required disabled={isSubmitting} />
      <select value={studentForm.event} onChange={(event) => setStudentForm({ ...studentForm, event: event.target.value, participationType: "Individual", teamName: "", teamMembers: [""] })} required disabled={isSubmitting}><option value="">Select Event</option><option value="Dance">💃 Dance</option><option value="Singing">🎤 Singing</option><option value="Speech">🎙️ Speech</option><option value="As Your Wish">🏆 As Your Wish</option></select>
      {supportsTeams && <select value={studentForm.participationType} onChange={(event) => setStudentForm({ ...studentForm, participationType: event.target.value as ParticipationType })} disabled={isSubmitting}><option value="Individual">Individual</option><option value="Team">Team</option></select>}
      {supportsTeams && studentForm.participationType === "Team" && <><input type="text" placeholder="Team Name" value={studentForm.teamName} onChange={(event) => setStudentForm({ ...studentForm, teamName: event.target.value })} required disabled={isSubmitting} />{studentForm.teamMembers.map((member, index) => <input key={index} type="text" placeholder={`Team Member ${index + 1} Name`} value={member} onChange={(event) => updateMember(index, event.target.value)} disabled={isSubmitting} />)}<button className="add-team-member" type="button" onClick={() => setStudentForm((form) => ({ ...form, teamMembers: [...form.teamMembers, ""] }))} disabled={isSubmitting}>Add Team Member</button></>}
      <button type="submit" className="submit-registration" disabled={isSubmitting}>{isSubmitting ? "Registering..." : "🎉 Register Now"}</button>
      {status && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}
    </form></div>
  </div></section>{successfulRegistration && <RegistrationSuccessModal participantName={successfulRegistration.name} isTeamRegistration={successfulRegistration.isTeam} onClose={() => setSuccessfulRegistration(null)} />}</>;
}

export default StudentRegistration;
