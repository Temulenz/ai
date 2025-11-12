"use client";
import React, { useState } from "react";
type SummeryProps = {
  title: string;
  article: string;
  summary: string;
  setStep: Function;
};
const Summery = ({ title, article, summary, setStep }: SummeryProps) => {
  return (
    <div>
      <div className="border rounded-lg p-7 bg-white ">
        <div className="flex">
          <img src="Vevtor.png" />
          <h1 className="text-2xl font-semibold">Article Quiz Generator</h1>
        </div>
        <div className="flex pt-[20px]">
          <img className="pr-[3.5px]" src="content.svg" />
          <p>Summarized content</p>
        </div>

        <div className="text-2xl font-semibold py-4">{title}</div>

        <div className="pb-[28px]">
          <p>{summary}</p>
        </div>

        {/* <div className="pb-[20px]">
        <div className="flex">
          <img className="pr-[3.5px]" src="content.svg" alt="" />
          <p>{article}</p>
        </div>
      </div> */}

        <div className="flex justify-between">
          <button
            onClick={() => setStep(1)}
            className="mt-3 bg-white text-black border  px-4 py-2 rounded-md"
          >
            See content
          </button>
          <button className="mt-3 bg-black text-white px-4 py-2 rounded-md">
            Take Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default Summery;
