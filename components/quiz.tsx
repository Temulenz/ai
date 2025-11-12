"use client";
import React, { useState } from "react";

const Quiz = () => {
  return (
    <div>
      <div>
        <div className="flex">
          <img src="Vevtor.png" alt="" />
          <h1 className="text-2xl font-semibold">Quick test</h1>
        </div>
        <p className="pt-2">
          Take a quick test about your knowledge from your content
        </p>
      </div>

      <div className="bg-white p-7 border ">
        <p className="font-semibold text-xl pb-4">Quistion</p>
        <div className="flex flex-wrap w-[588px]  gap-4">
          <button className="border py-[10px] px-[78.5px]">
            Asnwer choice
          </button>
          <button className="border py-[10px] px-[78.5px]">
            Asnwer choice
          </button>
          <button className="border py-[10px] px-[78.5px]">
            Asnwer choice
          </button>
          <button className="border py-[10px] px-[78.5px]">
            Asnwer choice
          </button>
        </div>
      </div>
    </div>
  );
};

export default Quiz;
