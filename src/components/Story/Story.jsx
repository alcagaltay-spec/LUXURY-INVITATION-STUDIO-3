import "./Story.css";

const bg = (file) => `${import.meta.env.BASE_URL}images/backgrounds/${file}`;

export default function Story() {
  const goToGallery = () => {
    document.getElementById("gallery")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <section
      id="story"
      className="story-scene"
      style={{ backgroundImage: `url(${bg("story.jpg")})` }}
    >
      <div className="story-bg-motion" />
      <div className="story-overlay" />

      <div className="story-content">
        <p className="story-eyebrow">Hikayemiz</p>

        <h2>Bir Bakışla Başladı</h2>

        <p className="story-intro">
          Zamanla büyüyen, yıldızlar kadar parlak bir sevdaya dönüştü.
        </p>

        <div className="story-timeline">
          <div className="story-card">
            <span>2021</span>
            <h3>İlk Tanışma</h3>
            <p>Bir tesadüf gibi başlayan o gün, hikâyemizin ilk satırı oldu.</p>
          </div>

          <div className="story-card">
            <span>2023</span>
            <h3>Birlikte Yolculuk</h3>
            <p>Yeni şehirler, yeni anılar ve aynı gökyüzünün altında büyüyen bir aşk.</p>
          </div>

          <div className="story-card">
            <span>2026</span>
            <h3>Bir Ömür Sözü</h3>
            <p>O günden sonra her yol, bizi aynı geleceğe götürdü.</p>
          </div>
        </div>

        <div className="story-next" onClick={goToGallery}>
          <div className="story-line" />
          <p>Anılarımıza Yolculuk</p>
        </div>
      </div>
    </section>
  );
}