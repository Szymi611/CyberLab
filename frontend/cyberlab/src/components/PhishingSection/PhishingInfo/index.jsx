import "./styles.scss";
import content from "../../../assets/content/phishing.json";
import ImageSlider from "../../../lib/ImageSlider";
import { IoMdArrowBack } from "react-icons/io";


export default function PhishingTheoryCard() {
  const handleGoToQuiz = () => {
    window.location.href = "/phishing/quiz";
  };

  const handleGoBack = () => {
    window.history.back();
  }

  return (
    <div className="phishing-card">
      <IoMdArrowBack  onClick={handleGoBack} style={{ cursor: "pointer" }}/>
      <div className="phishing-header">
        <div>
          <h2 className="phishing-title">{content.intro.title}</h2>
          <p className="phishing-intro">{content.intro.text}</p>
        </div>
      </div>

      <div className="phishing-body">
        <div className="phishing-sections">
          <div className="phishing-section">
            <h3>{content.whatIsPhishing.title}</h3>
            <p>{content.whatIsPhishing.text}</p>
          </div>

          <div className="phishing-section">
            <h2>{content.types.title}</h2>
            <h4>{content.types.email.subtitle}</h4>
            <p>{content.types.email.text}</p>
            <h4>{content.types.smishing.subtitle}</h4>
            <p>{content.types.smishing.text}</p>
            <h4>{content.types.vishing.subtitle}</h4>
            <p>{content.types.vishing.text}</p>

            <h4>{content.types.spear.subtitle}</h4>
            <p>{content.types.spear.text}</p>
          </div>

          <div className="phishing-section">
            <h3>{content.howToRecognize.title}</h3>
            <p>{content.howToRecognize.text}</p>
          </div>

          <div className="phishing-section">
            <h3>{content.shortSteps.title}</h3>
            <p>
              {content.shortSteps.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.consequences.title}</h3>
            <p>
              {content.consequences.subtitle}
              <br />
              {content.consequences.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
              {content.consequences.note}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.protection.title}</h3>
            <p>
              Aby zminimalizować ryzyko ataku:
              <br />
              {content.protection.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
              {content.protection.note}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.statistics.title}</h3>
            <p>
              {content.statistics.steps.map((step, index) => (
                <span key={index}>
                  - {step}
                  <br />
                </span>
              ))}
              {content.statistics.note}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.ifVictim.title}</h3>
            <p>
              {content.ifVictim.subtitle}
              <br />
              {content.ifVictim.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
              {content.ifVictim.note}
            </p>
          </div>
          <div className="phishing-section">
            <h3>{content.bestPractices.title}</h3>
            <p>
              {content.bestPractices.subtitle}
              <br />
              {content.bestPractices.steps.map((step, index) => (
                <span key={index}>
                  {index + 1}) {step}
                  <br />
                </span>
              ))}
              <br />
              {content.bestPractices.note}
            </p>
          </div>
        </div>
        <div className="phishing-examples">
          <h3>{content.examples.title}</h3>
          <ImageSlider />
          {/* <div className="phishing-example">
          <h4>{content.examples.email.title}</h4>
          <pre className="phishing-message">
            {content.examples.email.message}
          </pre>
          <ul className="phishing-flags">
            {content.examples.email.flags.map((flag, index) => (
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
        <div className="phishing-section">
          <div className="phishing-section-link">
            <h3>Learn more</h3>
            <p>
              <a
                className="phishing-link"
                href="https://www.cisa.gov/sites/default/files/2023-02/phishing-infographic-508c.pdf?utm_source=chatgpt.com"
              >
                CISA (Cybersecurity & Infrastructure Security Agency)
                Amerykańska agencja rządowa oferująca infografikę na temat
                phishingu, przedstawiającą formy ataków oraz zalecenia dotyczące
                ochrony.
              </a>
            </p>
            <p>
              <a
                className="phishing-link"
                href="https://guardiandigital.com/resources/resource-center/infographics?utm_source=chatgpt.com"
              >
                Guardian Digital - Zasoby i infografiki dotyczące bezpieczeństwa
              </a>
            </p>
          </div>
        </div>
      </div>
      
      <button
        onClick={handleGoToQuiz}
        className="phishing-btn primary desktop-only"
      >
        Start quiz
      </button>
    </div>
  );
}
