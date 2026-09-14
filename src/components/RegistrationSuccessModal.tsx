import "../styles/RegistrationSuccessModal.css";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/GegAYnAy5qiAClDYVNiQDb";
const WHATSAPP_QR_CODE = "/whatsapp-group-qr.png";

type RegistrationSuccessModalProps = {
  participantName: string;
  isTeamRegistration: boolean;
  onClose: () => void;
};

function RegistrationSuccessModal({ participantName, isTeamRegistration, onClose }: RegistrationSuccessModalProps) {
  return <div className="success-modal-backdrop" role="presentation" onMouseDown={onClose}><section className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-modal-title" onMouseDown={(event) => event.stopPropagation()}><span className="confetti confetti-one" /><span className="confetti confetti-two" /><span className="confetti confetti-three" /><span className="confetti confetti-four" /><div className="success-icon">✦</div><h2 id="success-modal-title">Registration Successful!</h2><p className="success-congratulations">Congratulations, {participantName}!</p><p>Your registration for the Engineer&apos;s Day Competition has been successfully received.</p>{isTeamRegistration && <p className="team-confirmation">Your multi-event registration has been successfully received.</p>}<p className="success-thanks">Thank you for bringing your ideas to the competition.</p><div className="whatsapp-join-section"><p className="whatsapp-step-title">IMPORTANT NEXT STEP</p><h3>Join Our Official WhatsApp Group</h3><p>Receive announcements, event updates, schedules, and Engineer&apos;s Day information in the official group.</p><a className="whatsapp-join-button" href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer">Join Official WhatsApp Group</a><p className="whatsapp-or">OR</p><h4>Scan the QR Code</h4><img className="whatsapp-qr-code" src={WHATSAPP_QR_CODE} alt="WhatsApp Group QR code" /><p className="whatsapp-qr-help">Scan this QR code with your phone camera or WhatsApp scanner.</p></div><button type="button" className="success-done-button" onClick={onClose}>Done ✓</button></section></div>;
}

export default RegistrationSuccessModal;
