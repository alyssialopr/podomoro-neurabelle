import { useState, useEffect } from "react";

export default function PomodoroTimer() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [selectedDuration, setSelectedDuration] = useState(25);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  useEffect(() => {
    if (timeLeft === 0) {
      if (mode === "work") {
        setMode("break");
        setTimeLeft(5 * 60);
      } else {
        setMode("work");
        setTimeLeft(selectedDuration * 60);
      }
      setIsRunning(false);
    }
  }, [timeLeft, mode, selectedDuration]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  const handleStartStop = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeLeft(selectedDuration * 60);
    setMode("work");
  };

  const handleSelectDuration = (duration) => {
    setSelectedDuration(duration);
    setTimeLeft(duration * 60);
    setIsRunning(false);
    setMode("work");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 p-8">
      <h1 className="text-4xl font-bold text-pink-600 mb-4">NeuraBelle</h1>
      <p className="text-xl mb-2 text-pink-400">Mode : {mode === "work" ? "Concentration" : "Pause 🍵"}</p>

      <div className="mb-4 flex gap-2">
        {[25, 40, 60, 120].map((duration) => (
          <button
            key={duration}
            onClick={() => handleSelectDuration(duration)}
            className={`${
              selectedDuration === duration ? "bg-pink-600 text-white" : "bg-white text-pink-600 border border-pink-300"
            } px-4 py-2 rounded-full`}
          >
            {duration} min
          </button>
        ))}
      </div>

      <div className="bg-white rounded-full shadow-xl p-16 text-center border-4 border-pink-200">
        <div className="text-6xl font-mono text-pink-700 mb-6">{formatTime(timeLeft)}</div>
        <div className="flex gap-4 justify-center">
          <button onClick={handleStartStop} className="bg-pink-400 p-2 rounded-full hover:bg-pink-500 text-white">
            {isRunning ? "Pause" : "Start"}
          </button>
          <button onClick={handleReset} variant="outline" className="border-pink-400 text-pink-600">
            Reset
          </button>
        </div>
      </div>

      <p className="mt-6 text-sm text-pink-500 italic">
        "Le cerveau est comme un muscle, plus on le sollicite, plus il devient puissant." – Marie Curie
      </p>
    </div>
  );
}
