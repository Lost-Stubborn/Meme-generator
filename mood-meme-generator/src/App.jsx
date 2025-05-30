// MoodBasedMemeApp - Vite + React + CSS (No Tailwind)
import { useState } from "react";
import { motion } from "framer-motion";
import "./App.css";

const questions = [
  "How are you feeling today?",
  "How did you sleep last night?",
  "What’s your energy level right now?",
  "Are you feeling productive today?",
  "Do you want to be left alone or talk to people?",
  "How’s your motivation today?",
  "Are you stressed or relaxed?",
  "Do you feel like everything is under control?",
];

const memeBank = [
  {
    mood: "low",
    image:
      "https://i.pinimg.com/564x/f1/29/26/f12926bce95f6621724fc173f2e3a98c.jpg",
    caption: "When life gives you lemons and you don't even like lemonade."
  },
  {
    mood: "high",
    image:
      "https://i.pinimg.com/564x/3b/89/3f/3b893f10e177bbce18c8082a1a2bbfb9.jpg",
    caption: "Vibing through life like deadlines don’t exist."
  },
  {
    mood: "stressed",
    image:
      "https://i.pinimg.com/564x/e2/32/4e/e2324e47dd4d62ea8d61a5d478f97c38.jpg",
    caption: "Trying to stay calm while everything burns around you."
  },
  {
    mood: "relaxed",
    image:
      "https://i.pinimg.com/564x/ff/fd/02/fffd02444e1ae8163cbbe7f0d221c979.jpg",
    caption: "Doing absolutely nothing and loving it."
  },
  {
    mood: "chaotic",
    image:
      "https://i.pinimg.com/564x/7e/53/95/7e5395fc9d1d75dbdf0f82a508d3c76e.jpg",
    caption: "No plan. Just vibes. And chaos."
  }
];

function App() {
  const [answers, setAnswers] = useState(Array(questions.length).fill(""));
  const [step, setStep] = useState(0);
  const [meme, setMeme] = useState(null);

  const handleInputChange = (e) => {
    const newAnswers = [...answers];
    newAnswers[step] = e.target.value;
    setAnswers(newAnswers);
  };

  const nextStep = () => {
    if (step < questions.length - 1) setStep(step + 1);
    else generateMeme();
  };

  const generateMeme = () => {
    const moodWord = answers.join(" ").toLowerCase();
    let selected = memeBank.find((m) => moodWord.includes(m.mood));
    if (!selected) selected = memeBank[Math.floor(Math.random() * memeBank.length)];
    setMeme(selected);
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Mood Based Meme Generator</h1>

        {!meme ? (
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="question">{questions[step]}</p>
            <input
              type="text"
              value={answers[step]}
              onChange={handleInputChange}
              placeholder="Type your response..."
              className="input"
            />
            <button onClick={nextStep} className="btn">
              {step === questions.length - 1 ? "Generate Meme" : "Next"}
            </button>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="meme-display"
          >
            <img src={meme.image} alt="meme" className="meme-img" />
            <p className="caption">{meme.caption}</p>
            <button className="btn" onClick={() => location.reload()}>
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
