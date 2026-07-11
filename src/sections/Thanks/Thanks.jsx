import "./Thanks.css";

const bg = (file) =>
  `${import.meta.env.BASE_URL}images/backgrounds/${file}`;

export default function Thanks() {
  return (
    <section
      id="thanks"
      className="thanks-section"
      style={{
        backgroundImage: `url(${bg("thanks.jpg")})`,
      }}
    >
      <div className="thanks-overlay" />

      <div className="thanks-content">
        <div className="thanks-emblem" aria-hidden="true">
          <span className="thanks-emblem-line" />
          <span className="thanks-emblem-branch">♧</span>
          <span className="thanks-emblem-line" />
        </div>

        <h2 className="thanks-heading">Teşekkürler</h2>

        <div className="thanks-heart-divider" aria-hidden="true">
          <span />
          <i>♥</i>
          <span />
        </div>

        <p className="thanks-text">
          Bu özel günümüzde yanımızda olduğunuz,
          <br />
          kalbinizle bizimle olduğunuz
          <br />
          için minnettarız.
        </p>

        <div className="thanks-reflection-star" aria-hidden="true">
          ✦
        </div>

        <div className="thanks-signature-row">
          <span aria-hidden="true" />
          <p className="thanks-signature">Ahmet &amp; Elif</p>
          <span aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
