import "./styles.scss";
import content from "../../../assets/content/phishing.json";
import ImageSlider from "../../../lib/ImageSlider";

export default function PhishingTheoryCard({ onStart }) {
  return (
    <div className="phishing-card">
      <div className="phishing-header">
        <div>
          <h2 className="phishing-title">{content.intro.title}</h2>
          <p className="phishing-intro">{content.intro.text}</p>
        </div>
        <button onClick={onStart} className="phishing-btn primary desktop-only">
          Rozpocznij zadania
        </button>
      </div>

      <div className="phishing-body">
        <div className="phishing-sections">
          <div className="phishing-section">
            <h3>{content.naCzymPolega.title}</h3>
            <p>{content.naCzymPolega.text}</p>
          </div>

          <div className="phishing-section">
            <h3>{content.rodzaje.title}</h3>
            <h5>{content.rodzaje.email.subtitle}</h5>
            <p>{content.rodzaje.email.text}</p>
            <h5>{content.rodzaje.smishing.subtitle}</h5>
            <p>{content.rodzaje.smishing.text}</p>
            <h5>{content.rodzaje.vishing.subtitle}</h5>
            <p>{content.rodzaje.vishing.text}</p>

            <h5>{content.rodzaje.spear.subtitle}</h5>
            <p>{content.rodzaje.spear.text}</p>
          </div>

          <div className="phishing-section">
            <h3>{content.jakRozpoznac.title}</h3>
            <p>{content.jakRozpoznac.text}</p>
          </div>

          <div className="phishing-section">
            <h3>{content.krotkieKroki.title}</h3>
            <p>
              {content.krotkieKroki.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.konsekwencje.title}</h3>
            <p>
              {content.konsekwencje.subtitle}
              <br />
              {content.konsekwencje.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
              {content.konsekwencje.note}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.ochrona.title}</h3>
            <p>
              Aby zminimalizować ryzyko ataku:
              <br />
              {content.ochrona.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
              {content.ochrona.note}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.statystyki.title}</h3>
            <p>
              {content.statystyki.steps.map((step, index) => (
                <span key={index}>
                  - {step}
                  <br />
                </span>
              ))}
              {content.statystyki.note}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.jesliOfiara.title}</h3>
            <p>
              {content.jesliOfiara.subtitle}
              <br />
              {content.jesliOfiara.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
              {content.jesliOfiara.note}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.dobrePraktyki.title}</h3>
            <p>
              {content.dobrePraktyki.subtitle}
              <br />
              {content.dobrePraktyki.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
              <br />
              {content.dobrePraktyki.note}
            </p>
          </div>
        </div>

        {/* <aside className="phishing-aside">
          <h4>Szybka lista kontrolna</h4>
          <ul>
            <li>Sprawdź dokładnie adres nadawcy i domenę</li>
            <li>Najeżdżaj na link przed kliknięciem, aby sprawdzić adres</li>
            <li>Nie otwieraj podejrzanych załączników i plików</li>
            <li>Stosuj silne hasła, włącz 2FA i zawsze zgłaszaj incydenty</li>
          </ul>
          <button onClick={onStart} className="phishing-btn secondary">
            Przejdź do zadań
          </button>
        </aside> */}
      </div>
      <div className="phishing-section"></div>
      <div className="phishing-examples">
        <h3>{content.przyklady.title}</h3>

        <ImageSlider />
        {/* <div className="phishing-example">
          <h4>{content.przyklady.email.title}</h4>
          <pre className="phishing-message">
            {content.przyklady.email.message}
          </pre>
          <ul className="phishing-flags">
            {content.przyklady.email.flags.map((flag, index) => (
              <li key={index}>{flag}</li>
            ))}
          </ul>
        </div>

        <div className="phishing-example">
          <h4>{content.przyklady.sms.title}</h4>
          <blockquote className="phishing-message">
            {content.przyklady.sms.message}
          </blockquote>
          <ul className="phishing-flags">
            {content.przyklady.sms.flags.map((flag, index) => (
              <li key={index}>{flag}</li>
            ))}
          </ul>
        </div> */}
      </div>
    </div>
  );
}
