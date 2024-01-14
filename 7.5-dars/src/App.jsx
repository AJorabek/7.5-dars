import { useEffect, useState } from "react";
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = null;
if (SpeechRecognition) {
  recognition = new SpeechRecognition();
}
const App = () => {
  const [listening, setListening] = useState(false);
  const [text, setText] = useState([]);
  const handleStart = () => {
    recognition.start();
  };
  useEffect(() => {
    recognition.addEventListener("result", (e) => {
      setText(e.results[0][0].transcript);
      let ul = document.getElementById("ul");
      let li = document.createElement("li");
      let result = e.results[0][0].transcript;
      li.textContent = `${result},`;
      ul.append(li);
    });
    recognition.addEventListener("start", (e) => setListening(true));
    recognition.addEventListener("end", (e) => setListening(false));
  }, []);
  return (
    <div>
      <div>{text}</div>
      <button onClick={handleStart} className="btn">
        {listening ? <iframe src="https://lottie.host/embed/468d8e5e-60ee-4288-ba0d-2adaf20c626c/FJ9bPKSJ6s.json"></iframe> : "create"}
      </button>
      <ol id="ul" style={{ display: "flex", flexDirection: "column" }}>
        <h1>TodoList:</h1>
      </ol>
    </div>
  );
};

export default App;
