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
import SQLPentestMethodology from "./components/SQLInjectionSection/SQLInjectionTasks/SQLPentestMethodology/index.jsx";
import PhishingPentestMethodology from "./components/PhishingSection/PhishingTasks/PhishingPentestMethodology/index.jsx";
import XSSReconnaissanceTask from "./components/XSSSection/XSSTasks/ReconnaissanceTask/index.jsx";
import XSSPentestMethodology from "./components/XSSSection/XSSTasks/PentestMethodology/index.jsx";
import XSSScanningTask from "./components/XSSSection/XSSTasks/ScanningTask/index.jsx";
import XSSExploitationTask from "./components/XSSSection/XSSTasks/ExploitationTask/index.jsx";
import CSRFPentestMethodology from "./components/CSRFSection/CSRFTasks/PentestMethodology/index.jsx";
import CSRFReconnaissanceTask from "./components/CSRFSection/CSRFTasks/ReconnaissanceTask/index.jsx";
import CSRFScanningTask from "./components/CSRFSection/CSRFTasks/ScanningTask/index.jsx";
import CSRFExploitationTask from "./components/CSRFSection/CSRFTasks/ExploitationTask/index.jsx";
import CSRFMoneyTransfer from "./components/CSRFSection/CSRFTasks/CSRFMoneyTransfer/index.jsx";
import CSRFTokenBypass from "./components/CSRFSection/CSRFTasks/CSRFTokenBypass/index.jsx";
import CSRFEmailChange from "./components/CSRFSection/CSRFTasks/CSRFEmailChange/index.jsx";
import CSRFInfo from "./components/CSRFSection/CSRFInfo/index.jsx";
import CSRFQuiz from "./components/CSRFSection/CSRFQuiz/index.jsx";
import ReflectedXSSTask from "./components/XSSSection/XSSTasks/ReflectedXSSTask/index.jsx";
import StoredXSSTask from "./components/XSSSection/XSSTasks/StoredXSSTask/index.jsx";
import DOMBasedXSSTask from "./components/XSSSection/XSSTasks/DOMBasedXSSTask/index.jsx";
import ErrorPage from "./components/ErrorPage/index.jsx";
import RedirectsInfo from "./components/RedirectsSection/RedirectsInfo/index.jsx";
import Methodologies from "./components/Methodologies/index.jsx";
import RedirectsPentestMethodology from "./components/RedirectsSection/RedirectsTasks/RedirectsMehodology/index.jsx";
import RedirectsReconnaissanceTask from "./components/RedirectsSection/RedirectsTasks/ReconnaissanceTask/index.jsx";
import RedirectsScanningTask from "./components/RedirectsSection/RedirectsTasks/ScanningTask/index.jsx";
import RedirectsExploitationTask from "./components/RedirectsSection/RedirectsTasks/ExploitationTask/index.jsx";
import RedirectsQuiz from "./components/RedirectsSection/RedirectsQuiz/index.jsx";
import InteractivePentest from "./components/InteractivePentest/index.jsx";

export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <MatrixBackground />
        <Routes>
          <Route path="/attacks" element={<MainPage />} />
          <Route path="/phishing" element={<PhishingMainPage />} />
          <Route path="phishing/quiz" element={<PhishingQuiz />} />
          <Route
            path="phishing/methodology"
            element={<PhishingPentestMethodology />}
          />
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
            element={<SQLPentestMethodology />}
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
          <Route path="xss/methodology" element={<XSSPentestMethodology />} />
          <Route
            path="xss/tasks/reconnaissanceXSS"
            element={<XSSReconnaissanceTask />}
          />
          <Route path="xss/tasks/scanningXSS" element={<XSSScanningTask />} />
          <Route
            path="xss/tasks/exploitationXSS"
            element={<XSSExploitationTask />}
          />
          <Route path="xss/tasks/task1" element={<ReflectedXSSTask />} />
          <Route path="xss/tasks/task2" element={<StoredXSSTask />} />
          <Route path="xss/tasks/task3" element={<DOMBasedXSSTask />} />
          <Route path="/csrf/" element={<CSRFInfo />} />
          <Route
            path="/csrf/methodology"
            element={<CSRFPentestMethodology />}
          />
          <Route path="/csrf/quiz" element={<CSRFQuiz />} />
          <Route
            path="/csrf/tasks/reconnaissanceCSRF"
            element={<CSRFReconnaissanceTask />}
          />
          <Route
            path="/csrf/tasks/scanningCSRF"
            element={<CSRFScanningTask />}
          />
          <Route
            path="/csrf/tasks/exploitationCSRF"
            element={<CSRFExploitationTask />}
          />
          <Route path="/csrf/tasks/task1" element={<CSRFMoneyTransfer />} />
          <Route path="/csrf/tasks/task2" element={<CSRFTokenBypass />} />
          <Route path="/csrf/tasks/task3" element={<CSRFEmailChange />} />

          <Route path="/redirects/quiz" element={<RedirectsQuiz />} />
          <Route path="/redirects/info" element={<RedirectsInfo />} />
          <Route
            path="/redirects/methodology"
            element={<RedirectsPentestMethodology />}
          />
          <Route
            path="/redirects/tasks/reconnaissanceRedirects"
            element={<RedirectsReconnaissanceTask />}
          />
          <Route
            path="/redirects/tasks/scanningRedirects"
            element={<RedirectsScanningTask />}
          />
          <Route
            path="/redirects/tasks/exploitationRedirects"
            element={<RedirectsExploitationTask />}
          />

          <Route path="/" element={<Methodologies />} />
          <Route path="/interactive-pentest" element={<InteractivePentest />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}
