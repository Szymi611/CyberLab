import React from "react";
import Navbar from "./components/Navbar";
import MainPage from "./components/MainPage";
import Footer from "./components/Footer";
import "./index.css";
import "./components/BackgroundAnimation.css";

const App = () => {
  return (
    <div>
      <MainPage />
      <Footer />
    </div>
  );
};

export default App;
