"use client";
import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [input, setInput] = useState("3.");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [incorrectGuess, setIncorrectGuess] = useState(false);
  const [toast, setToast] = useState(false);
  const [highScore, setHighScore] = useState(0);
  function checkPi(value: string) {
    if (value == pi.substring(0, input.length + 1)) {
      setInput(value);
    } else {
      setIncorrectGuess(true);
      if (input.length > highScore) {
        setHighScore(input.length);
        localStorage.setItem("highScore", input.length.toString());
      }
    }
  }
  useEffect(() => {
    const hs = localStorage.getItem("highScore");
    if (hs) {
      setHighScore(+hs);
    }
  }, [highScore]);
  function handleInput(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    checkPi(value);
    const textarea = textareaRef.current;
    if (textarea) {
      console.log("textarea");
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  }
  async function shareScore() {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 750);
    const shareData = {
      title: "🥧π Challenge🥧",
      text: `🥧π Challenge🥧 
🔢 ${input}
⭐ ${input.length} digits of π
🏆 High score: ${highScore}
🔗 ${window.location.href}
`,
      url: window.location.href,
    };
    if (await navigator.canShare) {
      await navigator.share(shareData);
    } else {
      await navigator.clipboard.writeText(shareData.text);
    }
  }
  function resetGame() {
    setInput("3.");
    setIncorrectGuess(false);
  }
  const pi =
    "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912";
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-600 text-white">
      <div
        className={`duration-750 absolute top-20 z-20 rounded-3xl bg-white p-5  text-2xl md:text-3xl font-black text-black ease-in-out ${toast ? `opacity-100` : `opacity-0`} transition-opacity`}
      >
        Score copied to clipboard
      </div>
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16">
        <div className="text-5xl font-black md:text-8xl">π Challenge</div>
        <div className="text-3xl font-black">
          {highScore == 0 ? null : `High score: ${highScore}`}
        </div>
        <div className="flex flex-col items-center justify-center gap-5 text-center text-2xl font-black md:text-4xl">
          Start typing the digits of π!
          <textarea
            ref={textareaRef}
            className="border-1 h-fit w-11/12 resize-none rounded-[90px] border border-white bg-zinc-600 p-2 text-3xl lg:p-5 lg:px-10 lg:text-6xl"
            value={input}
            disabled={incorrectGuess}
            name="pi-input"
            rows={1}
            inputMode="numeric"
            onChange={handleInput}
          />
          {incorrectGuess ? (
            <div className="flex flex-col gap-5 text-center text-4xl text-red-400">
              Wrong! Correct number was {pi[input.length]}
              <button
                className="rounded-3xl bg-red-500 p-5 text-white hover:bg-red-400"
                onClick={() => resetGame()}
              >
                Try Again?
              </button>
              <button
                className="rounded-3xl bg-slate-600 p-5 text-white hover:bg-slate-500 "
                onClick={() => shareScore()}
              >
                Share your score!
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
