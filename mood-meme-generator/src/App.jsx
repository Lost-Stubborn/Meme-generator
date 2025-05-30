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
    image: "https://i.imgflip.com/3b3uda.jpg",
    caption: "When life gives you lemons and you don't even like lemonade."
  },
  {
    mood: "high",
    image: "https://i.imgflip.com/49evys.jpg",
    caption: "Vibing through life like deadlines don’t exist."
  },
  {
    mood: "stressed",
    image: "https://i.imgflip.com/4byg2z.jpg",
    caption: "Trying to stay calm while everything burns around you."
  },
  {
    mood: "relaxed",
    image: "https://i.imgflip.com/4byg2z.jpg",
    caption: "Doing absolutely nothing and loving it."
  },
  {
    mood: "chaotic",
    image: "https://i.imgflip.com/4byg2z.jpg",
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
