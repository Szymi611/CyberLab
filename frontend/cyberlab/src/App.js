import MatrixBackground from "./components/Background/MatrixBackground.jsx";
import MainPage from "./components/MainPage/MainPage.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PhishingMainPage from "./components/PhishingSection/PhishingMainPage/index.jsx";
import PhishingQuiz from "./components/PhishingSection/PhishingQuiz/index.jsx";
import PhishingTasks from "./components/PhishingSection/PhishingTasks/index.jsx";

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
        </Routes>
      </BrowserRouter>
    </>
  );
}
