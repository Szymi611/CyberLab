export default function PLDescription({ lang }) {
  console.log(`languge: ${lang}`);
  return (
    <>
      {lang === "PL" && (
        <>
          <h2 className="text-2xl text-blue-500 py-2">
            Cześć! Przed tobą platforma do nauki cyberbezpieczeństwa.
          </h2>
          <p className="text-lg leading-relaxed mt-4">Opis platformy</p>
        </>
      )}
      {lang === "ENG" && (
        <>
          <h2 className="text-2xl text-blue-500 py-2">
            Hi! Welcome to the Cybersecurity Learning Platform.
          </h2>
          <p className="text-lg leading-relaxed mt-4">Platfotm description</p>
        </>
      )}
      {lang === "DE" && (
        <>
          <h2 className="text-2xl text-blue-500 py-2">
            Hallo! Willkommen auf der Cybersecurity-Lernplattform.
          </h2>
          <p className="text-lg leading-relaxed mt-4">Platfotm description</p>
        </>
      )}
      {lang === "ESP" && (
        <>
          <h2 className="text-2xl text-blue-500 py-2">
            Bienvenido a la Plataforma de Aprendizaje sobre Ciberseguridad.
          </h2>
          <p className="text-lg leading-relaxed mt-4">Platfotm description</p>
        </>
      )}
    </>
  );
}
