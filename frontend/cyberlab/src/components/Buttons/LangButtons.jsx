export default function LangButtons({lang, setLang}) {

  return (
    <>
      <button
        className="text-2xl cursor-pointer text-white"
        onClick={() => setLang("PL")}
      >
        PL
      </button>
      <button
        className="text-2xl cursor-pointer text-white"
        onClick={() => setLang("ENG")}
      >
        ENG
      </button>
      <button
        className="text-2xl cursor-pointer text-white" 
        onClick={() => setLang("DE")}
      >
        DE
      </button>
      <button
        className="text-2xl cursor-pointer text-white"
        onClick={() => setLang("ESP")}
      >
        ESP
      </button>
    </>
  );
}
