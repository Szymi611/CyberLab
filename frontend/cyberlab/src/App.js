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
import XSSQuiz from "./components/XSSSection/XSSQuiz/index.jsx";
import VulnerableLogin from "./components/SQLInjectionSection/SQLInjectionTasks/VulnerableLogin/index.jsx";
import BlindSQLInjection from "./components/SQLInjectionSection/SQLInjectionTasks/BlindSQLInjection/index.jsx";
import FilteredSQLInjection from "./components/SQLInjectionSection/SQLInjectionTasks/FilteredSQLInjection/index.jsx";
import UnionBasedSQLInjection from "./components/SQLInjectionSection/SQLInjectionTasks/UnionBaseSQLInjection/index.jsx";
import ErrorBasedSQLInjection from "./components/SQLInjectionSection/SQLInjectionTasks/SQLInjectionErrorBased/index.jsx";
import ReconnaissanceTask from "./components/SQLInjectionSection/SQLInjectionTasks/ReconnaissanceTask/index.jsx";
import ScanningTask from "./components/SQLInjectionSection/SQLInjectionTasks/ScanningTask/index.jsx";
import ExploitationTask from "./components/SQLInjectionSection/SQLInjectionTasks/ExploitationTask/index.jsx";
import PentestMethodology from "./components/SQLInjectionSection/SQLInjectionTasks/PentestMethodology/index.jsx";

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
          <Route
            path="sql-injection/methodology"
            element={<PentestMethodology />}
          />
          <Route
            path="sql-injection/tasks/reconnaissanceSQL"
            element={<ReconnaissanceTask />}
          />
          <Route
            path="sql-injection/tasks/scanningSQL"
            element={<ScanningTask />}
          />
          <Route
            path="sql-injection/tasks/exploitationSQL"
            element={<ExploitationTask />}
          />
          <Route path="sql-injection/tasksss" element={<SQLInjectionTasks />} />
          <Route
            path="sql-injection/tasks/task1"
            element={<VulnerableLogin />}
          />
          <Route
            path="sql-injection/tasks/task2"
            element={<BlindSQLInjection />}
          />
          <Route
            path="/sql-injection/tasks/task3"
            element={<FilteredSQLInjection />}
          />
          <Route
            path="/sql-injection/tasks/task4"
            element={<UnionBasedSQLInjection />}
          />
          <Route
            path="/sql-injection/tasks/task5"
            element={<ErrorBasedSQLInjection />}
          />
          <Route path="/xss" element={<XSSSection />} />
          <Route path="xss/quiz" element={<XSSQuiz />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
