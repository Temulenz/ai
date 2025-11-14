"use client";

import Quiz from "@/components/quiz";
import Summery from "@/components/summery";
import { useState } from "react";

export default function HomePage() {
  const [article, setArticle] = useState("");
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [step, setStep] = useState(2);
  const [quiz, setQuiz] = useState([]);

  const generateSummary = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!article.trim()) {
      alert("Please paste your article content!");
      return;
    }
    setLoading(true);
    setSummary("");

    try {
      const response = await fetch("/api/gemini", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ article }),
      });

      const data = await response.json();
      console.log({ data });
      setQuiz(data.quizList);

      if (data.summary) {
        setSummary(data.summary);
        setStep(2);
      } else {
        alert("Failed to generate summary");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  console.log({ quiz });
  return (
    <div>
      <div className="px-64 py-[112px]   bg-accent">
        {/* {step === 1 && ( */}
        <div>
          <div className="border rounded-lg p-7 bg-white ">
            <div className="flex">
              <img src="Vevtor.png" />
              <h1 className="text-2xl font-semibold">Article Quiz Generator</h1>
            </div>

            <p className="pt-2">
              Take a quick test about your knowledge from your content
            </p>

            <div className="py-[28px]">
              <div className="flex">
                <img className="pr-[3.5px]" src="tittle.svg" alt="" />
                <p>Article Title</p>
              </div>

              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for your article..."
                className="w-full border mt-2 rounded-md p-3"
              />
            </div>

            <div className="pb-[20px]">
              <div className="flex">
                <img className="pr-[3.5px]" src="content.svg" alt="" />
                <p>Article Content</p>
              </div>

              <textarea
                value={article}
                onChange={(e) => setArticle(e.target.value)}
                placeholder="Paste your article content here..."
                className="w-full border mt-2 rounded-md pb-[92px] px-3 pt-2"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={generateSummary}
                disabled={loading}
                className="mt-3 bg-black text-white px-4 py-2 rounded-md"
              >
                {loading ? "Generating..." : "Generate Summary"}
              </button>
            </div>
          </div>
        </div>
        {/* // )} */}

        {/* {step === 2 && ( */}
        <Summery
          setStep={setStep}
          title={title}
          summary={summary}
          article={article}
        ></Summery>
        {/* )} */}

        {/* {step === 3 && ( */}
        <div>
          <Quiz quiz={quiz}></Quiz>
        </div>
        {/* )} */}
      </div>
    </div>
  );
}
