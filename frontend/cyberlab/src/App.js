import MatrixBackground from "./components/Background/MatrixBackground.jsx";

export default function App() {
  return (
    <>
      <MatrixBackground />
      <div style={{ position: "relative", zIndex: 1, color: "#fff" }}>
        <h1>Twoja aplikacja</h1>
      </div>
    </>
  );
}
