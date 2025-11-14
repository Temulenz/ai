"use client";

import { useState } from "react";

type QuizItem = {
  id: number;
  question: string;
  options: string[];
  answer: any;
  userAnswer?: string;
};

type QuizProps = {
  quiz: QuizItem[];
};

export default function Quiz({ quiz }: QuizProps) {
  const [step, setStep] = useState(0);
  const [page, setPage] = useState("test");
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);

  const handleClick = (option: string) => {
    setSelected(option);

    if (option === quiz[step].answer) {
      setScore((prev) => prev + 1);
    }

    quiz[step].userAnswer = option;

    if (step + 1 < quiz.length) {
      setTimeout(() => {
        setStep(step + 1);
        setSelected(null);
      }, 300);
    } else {
      setPage("last");
    }
  };

  return (
    <div>
      {page === "test" && (
        <div>
          <div>
            <div className="flex items-center gap-2">
              <img src="Vevtor.png" alt="" />
              <h1 className="text-2xl font-semibold">Quick test</h1>
            </div>
            <p className="pt-2">Take a quick test about your knowledge</p>
          </div>
          <div className="bg-white p-7 border mt-4">
            <p className="font-semibold text-xl pb-4">
              {quiz.length > 0 ? quiz[step].question : "Hooson"}
            </p>
            <div className="flex flex-wrap w-[588px] gap-4">
              {quiz.length > 0 &&
                quiz[step].options.map((item) => (
                  <button
                    key={item}
                    onClick={() => handleClick(item)}
                    className={`border py-[10px] px-[78.5px] rounded transition-all
                      ${selected === item ? "bg-gray-200" : ""}`}
                  >
                    {item}
                  </button>
                ))}
            </div>
          </div>
        </div>
      )}

      {page === "last" && (
        <div>
          <div className="flex items-center gap-2">
            <img src="Vevtor.png" alt="" />
            <h1 className="text-2xl font-semibold">Quiz completed</h1>
          </div>
          <p className="pt-2">Let's see what you did</p>

          <div className="mt-4 text-xl font-semibold">
            Your score: {score} / {quiz.length}
          </div>

          <div className="mt-6 mb-4 p-4 border rounded bg-white">
            {quiz.map((q, i) => (
              <div key={i} className="p-4">
                <p className="font-semibold">
                  {i + 1}. {q.question}
                </p>
                <p
                  className={`text-sm ${
                    q.userAnswer === q.answer
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Your answer: {q.userAnswer}
                </p>
                <p className="text-sm text-green-600">
                  Correct answer: {q.options[q.answer]}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
