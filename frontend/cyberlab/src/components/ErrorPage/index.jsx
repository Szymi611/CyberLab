import "./styles.scss";

export default function ErrorPage() {
  const handleGoToHomepage = () => {
    window.location.href = "/";
  };

  return (
    <div  className="error-page-container">
      <div className="error-page-content">
        <h1>Error 404: Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
        <p>Please check the URL or return to the homepage.</p>
        <button onClick={handleGoToHomepage} className="homePage-btn">Go to homepage</button>
      </div>
    </div>
  );
}
