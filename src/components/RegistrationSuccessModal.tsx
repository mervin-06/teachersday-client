import "../styles/RegistrationSuccessModal.css";

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/GegAYnAy5qiAClDYVNiQDb";
const WHATSAPP_QR_CODE = "/whatsapp-group-qr.png";

type RegistrationSuccessModalProps = {
  participantName: string;
  isTeamRegistration: boolean;
  onClose: () => void;
};

function RegistrationSuccessModal({ participantName, isTeamRegistration, onClose }: RegistrationSuccessModalProps) {
  return <div className="success-modal-backdrop" role="presentation" onMouseDown={onClose}><section className="success-modal" role="dialog" aria-modal="true" aria-labelledby="success-modal-title" onMouseDown={(event) => event.stopPropagation()}><span className="confetti confetti-one" /><span className="confetti confetti-two" /><span className="confetti confetti-three" /><span className="confetti confetti-four" /><div className="success-icon">🎉</div><h2 id="success-modal-title">Registration Successful!</h2><p className="success-congratulations">Congratulations, {participantName}! 🎊</p><p>Your registration for the Teacher&apos;s Day Celebration has been successfully received.</p>{isTeamRegistration && <p className="team-confirmation">Your team registration has been successfully received.</p>}<p className="success-thanks">❤️ Thank you for participating and making this celebration special!</p><div className="whatsapp-join-section"><p className="whatsapp-step-title">📢 IMPORTANT NEXT STEP</p><h3>Join Our Official WhatsApp Group</h3><p>To receive important announcements, event updates, schedules, and Teacher&apos;s Day Celebration information, please join our official WhatsApp Group.</p><a className="whatsapp-join-button" href={WHATSAPP_GROUP_LINK} target="_blank" rel="noopener noreferrer">💬 Join Official WhatsApp Group</a><p className="whatsapp-or">OR</p><h4>📱 Scan the QR Code</h4><img className="whatsapp-qr-code" src={WHATSAPP_QR_CODE} alt="WhatsApp Group QR code" /><p className="whatsapp-qr-help">📱 Or scan this QR code using your phone camera or WhatsApp scanner to join the official group.</p></div><button type="button" className="success-done-button" onClick={onClose}>Done ✓</button></section></div>;
}

export default RegistrationSuccessModal;
