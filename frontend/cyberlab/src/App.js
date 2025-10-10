import MatrixBackground from "./components/Background/MatrixBackground.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PhishingMainPage from "./components/PhishingSection/PhishingMainPage/index.jsx";
import PhishingQuiz from "./components/PhishingSection/PhishingQuiz/index.jsx";
import EmailAnalysis from "./components/PhishingSection/PhishingTasks/EmailAnalysis/index.jsx";
import UrlInspector from "./components/PhishingSection/PhishingTasks/UrlInspector/index.jsx";
import PhishingTasks from "./components/PhishingSection/PhishingTasks/index.jsx";
import PhishingStories from "./components/PhishingSection/PhishingTasks/PhishingStories/index.jsx";
import SQLInjectionMainPage from "./components/SQLInjectionSection/SQLInjectionMainPage/index.jsx";
import SQLInjectionQuiz from "./components/SQLInjectionSection/SQLInjectionQuiz/index.jsx";
import SQLInjectionTasks from "./components/SQLInjectionSection/SQLInjectionTasks/index.jsx";
import XSSSection from "./components/XSSSection/index.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <MatrixBackground />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/phishing" element={<PhishingMainPage />} />
          <Route path="phishing/quiz" element={<PhishingQuiz />} />
          <Route path="phishing/tasks" element={<PhishingTasks />} />
          <Route
            path="phishing/tasks/emailAnalysis"
            element={<EmailAnalysis />}
          />
          <Route
            path="phishing/tasks/urlInspector"
            element={<UrlInspector />}
          />
          <Route
            path="phishing/tasks/phishingStories"
            element={<PhishingStories />}
          />
          <Route path="/sql-injection" element={<SQLInjectionMainPage />} />
          <Route path="sql-injection/quiz" element={<SQLInjectionQuiz />} />
          <Route path="sql-injection/tasks" element={<SQLInjectionTasks />} />
          <Route path="/xss" element={<XSSSection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
