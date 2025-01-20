"use client";
import { useState, useRef } from "react";

export default function Home() {
  const [input, setInput] = useState("3.");
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [incorrectGuess, setIncorrectGuess] = useState(false);
  function checkPi(value: string) {
    console.log(value);
    console.log(pi.substring(0, input.length + 1));
    if (value == pi.substring(0, input.length + 1)) {
      console.log("correct!");
      setInput(value);
    } else {
      setIncorrectGuess(true);
    }
  }
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
  function resetGame() {
    setInput("3.");
    setIncorrectGuess(false);
  }
  const pi =
    "3.14159265358979323846264338327950288419716939937510582097494459230781640628620899862803482534211706798214808651328230664709384460955058223172535940812848111745028410270193852110555964462294895493038196442881097566593344612847564823378678316527120190914564856692346034861045432664821339360726024914127372458700660631558817488152092096282925409171536436789259036001133053054882046652138414695194151160943305727036575959195309218611738193261179310511854807446237996274956735188575272489122793818301194912";
  return (
    <main className="flex min-h-screen flex-col items-center justify-start bg-zinc-600 text-white">
      <div className="container flex flex-col items-center justify-start gap-12 px-4 py-16">
        <h1 className="text-4xl font-black md:text-8xl">Pi Challenge</h1>
        <div className="flex flex-col items-center justify-center gap-5 text-center text-4xl font-black">
          Start typing the digits of pi!
          <textarea
            ref={textareaRef}
            className="border-1 h-fit resize-none rounded-2xl border border-white bg-zinc-600 p-2 text-xl md:rounded-[90px] md:p-5 md:px-10 md:text-6xl"
            value={input}
            disabled={incorrectGuess}
            name="pi-input"
            rows={1}
            inputMode="numeric"
            onChange={handleInput}
          />
          {incorrectGuess ? (
            <div className="text-center text-4xl text-red-400 flex flex-col">
              Wrong! Correct number was {pi[input.length]}
              <button
                className="rounded-3xl bg-red-500 p-5 text-white"
                onClick={() => resetGame()}
              >
                Try Again?
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </main>
  );
}
