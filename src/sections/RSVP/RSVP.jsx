import { useState } from "react";
import "./RSVP.css";

export default function RSVP() {
  const [attendance, setAttendance] = useState("yes");
  const whatsappNumber = "905443655732";

  const goToThanks = () => {
    document.getElementById("thanks")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = () => {
    const response =
      attendance === "yes"
        ? "Katılacağız 🎉"
        : "Katılamayacağız";
    const message = `Merhaba, Ahmet & Elif'in düğün davetiyesi için katılım yanıtımız: ${response}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <section id="rsvp" className="rsvp-section">
      <div className="rsvp-overlay" />

      <div className="rsvp-content">
        <p className="rsvp-eyebrow">RSVP</p>

        <h2>
          Bizimle
          <span>Misiniz?</span>
        </h2>

        <div className="rsvp-divider" />

        <p className="rsvp-text">
          Katılım durumunuzu seçerek bize bildirmeniz yeterli.
        </p>

        <div className="rsvp-card">
          <p className="rsvp-card-title">
            Katılım Durumu
          </p>

          <button
            type="button"
            className={`rsvp-option ${
              attendance === "yes" ? "active" : ""
            }`}
            onClick={() => setAttendance("yes")}
          >
            <div className="rsvp-icon" aria-hidden="true">
              ✓
            </div>

            <div className="rsvp-info">
              <strong>Katılacağız</strong>

              <span>
                Bu özel gecede yanınızdayız.
              </span>
            </div>
          </button>

          <button
            type="button"
            className={`rsvp-option ${
              attendance === "no" ? "active" : ""
            }`}
            onClick={() => setAttendance("no")}
          >
            <div className="rsvp-icon" aria-hidden="true">
              ✕
            </div>

            <div className="rsvp-info">
              <strong>Katılamayacağız</strong>

              <span>
                Kalbimiz sizinle olacak.
              </span>
            </div>
          </button>
        </div>

        <button
          type="button"
          className="rsvp-send"
          onClick={handleSubmit}
        >
          Yanıtımı Gönder
        </button>

        <div
          className="rsvp-next"
          onClick={goToThanks}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              goToThanks();
            }
          }}
        >
          <div className="rsvp-line" />

          <p>Teşekkürler</p>
        </div>
      </div>
    </section>
  );
}
