import { useState } from "react";
import type { FormEvent } from "react";
import RegistrationSuccessModal from "./RegistrationSuccessModal";
import "../styles/StaffRegistration.css";

const staffEndpoint = "http://localhost:5000/api/register/staff";
type ParticipationType = "Individual" | "Team";
type StaffForm = { name: string; department: string; phone: string; event: string; participationType: ParticipationType; teamName: string; teamMembers: string[] };
const initialForm: StaffForm = { name: "", department: "", phone: "", event: "", participationType: "Individual", teamName: "", teamMembers: [""] };

function StaffRegistration() {
  const [form, setForm] = useState<StaffForm>(initialForm);
  const [status, setStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successfulRegistration, setSuccessfulRegistration] = useState<{ name: string; isTeam: boolean } | null>(null);
  const supportsTeams = form.event === "Dance" || form.event === "Singing";
  const updateMember = (index: number, value: string) => setForm((current) => ({ ...current, teamMembers: current.teamMembers.map((member, memberIndex) => memberIndex === index ? value : member) }));

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStatus(null);
    const payload = { ...form, teamName: form.participationType === "Team" ? form.teamName.trim() : "", teamMembers: form.teamMembers.map((member) => member.trim()).filter(Boolean) };
    try {
      const response = await fetch(staffEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const result: { success: boolean; message: string } = await response.json();
      if (!response.ok) throw new Error(result.message || "Unable to complete registration. Please try again.");
      setSuccessfulRegistration({ name: payload.name, isTeam: payload.participationType === "Team" });
      setForm(initialForm);
    } catch (error) {
      setStatus({ type: "error", message: error instanceof Error ? error.message : "Unable to complete registration. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return <><section className="staff-registration" id="staff-register"><div className="staff-registration-container"><div className="staff-registration-info"><p className="section-tag">👩‍🏫 STAFF PARTICIPATION</p><h2>Join the<span> Celebration!</span></h2><p>Be a part of the Teacher&apos;s Day Celebration and help create beautiful memories together.</p></div><div className="staff-registration-form-box"><h3>🎉 Join as Staff</h3><p>Fill in your details to register.</p><form onSubmit={handleSubmit}><input type="text" placeholder="Full Name" value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required disabled={isSubmitting} /><input type="text" placeholder="Department" value={form.department} onChange={(event) => setForm({ ...form, department: event.target.value })} required disabled={isSubmitting} /><input type="tel" placeholder="Phone Number" value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required disabled={isSubmitting} /><select value={form.event} onChange={(event) => setForm({ ...form, event: event.target.value, participationType: "Individual", teamName: "", teamMembers: [""] })} required disabled={isSubmitting}><option value="">Select Event</option><option value="Dance">💃 Dance</option><option value="Singing">🎤 Singing</option><option value="Speech">🎙️ Speech</option><option value="As Your Wish">🏆 As Your Wish</option></select>{supportsTeams && <select value={form.participationType} onChange={(event) => setForm({ ...form, participationType: event.target.value as ParticipationType })} disabled={isSubmitting}><option value="Individual">Individual</option><option value="Team">Team</option></select>}{supportsTeams && form.participationType === "Team" && <><input type="text" placeholder="Team Name" value={form.teamName} onChange={(event) => setForm({ ...form, teamName: event.target.value })} required disabled={isSubmitting} />{form.teamMembers.map((member, index) => <input key={index} type="text" placeholder={`Team Member ${index + 1} Name`} value={member} onChange={(event) => updateMember(index, event.target.value)} disabled={isSubmitting} />)}<button className="add-team-member" type="button" onClick={() => setForm((current) => ({ ...current, teamMembers: [...current.teamMembers, ""] }))} disabled={isSubmitting}>Add Team Member</button></>}<button type="submit" className="submit-registration" disabled={isSubmitting}>{isSubmitting ? "Registering..." : "🎉 Register Now"}</button>{status && <p className={`form-status ${status.type}`} role="status">{status.message}</p>}</form></div></div></section>{successfulRegistration && <RegistrationSuccessModal participantName={successfulRegistration.name} isTeamRegistration={successfulRegistration.isTeam} onClose={() => setSuccessfulRegistration(null)} />}</>;
}

export default StaffRegistration;
