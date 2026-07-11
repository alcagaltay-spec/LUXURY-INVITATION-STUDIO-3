import "./Event.css";

const bg = (file) => `${import.meta.env.BASE_URL}images/backgrounds/${file}`;

export default function Event() {
  const goToCountdown = () => {
    document.getElementById("countdown")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="event"
      className="event-section"
      style={{ backgroundImage: `url(${bg("event.jpg")})` }}
    >
      <div className="event-overlay" />

      <div className="event-card">
        <p className="event-eyebrow">Düğün Bilgileri</p>

        <div className="event-date">
          <span className="event-day">12</span>
          <span className="event-month">Haziran</span>
          <span className="event-year">2027</span>
        </div>

        <div className="event-divider" />

        <div className="event-info">
          <span>Saat</span>
          <strong>19:30</strong>
        </div>

        <div className="event-info">
          <span>Mekan</span>
          <strong>Royal Garden Davet Salonu</strong>
        </div>

        <button className="event-map-button">
          Yol Tarifi Al
        </button>

        <div className="event-next" onClick={goToCountdown}>
          <div className="event-line" />
          <p>Geri Sayımı Gör</p>
        </div>
      </div>
    </section>
  );
}