"use client";

import { useRouter } from "next/navigation";
import React from "react";

const TestPage: React.FC = () => {
  const router = useRouter();
  const handleStartTest = () => {
    router.push("/exam");
  };

  return (
    <>
      <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center bg-slate-100">
        <div className="rounded-lg w-full max-w-2xl">
          {/* Title */}
          <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
            Ancient Indian History MCQ
          </h1>

          {/* Stats Section */}
          <div className="bg-slate-800 text-white rounded-md flex justify-between text-center py-4 mb-6">
            <div className="flex-1 border-r border-slate-600">
              <p className="text-sm text-gray-300">Total MCQ s:</p>
              <p className="text-2xl font-semibold">100</p>
            </div>
            <div className="flex-1 border-r border-slate-600">
              <p className="text-sm text-gray-300">Total Marks:</p>
              <p className="text-2xl font-semibold">100</p>
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-300">Total Time:</p>
              <p className="text-2xl font-semibold">90:00</p>
            </div>
          </div>

          {/* Instructions */}
          <div className="text-gray-700 mb-8">
            <h2 className="font-semibold mb-2">Instructions:</h2>
            <ol className="list-decimal list-inside space-y-1 text-sm leading-relaxed">
              <li>You have 100 minutes to complete the test.</li>
              <li>Test consists of 100 multiple-choice questions.</li>
              <li>
                You are allowed 2 retest attempts if you do not pass on the
                first try.
              </li>
              <li>Each incorrect answer will incur a negative mark of -1/4.</li>
              <li>
                Ensure you are in a quiet environment with a stable internet
                connection.
              </li>
              <li>
                Keep an eye on the timer and try to finish within the given
                time.
              </li>
              <li>
                Do not use external resources such as dictionaries, websites, or
                assistance.
              </li>
              <li>
                Complete the test honestly to accurately assess your
                proficiency.
              </li>
              <li>Check your answers before submitting.</li>
              <li>
                Your results will be displayed immediately after submission,
                showing your pass/fail status.
              </li>
            </ol>
          </div>

          {/* Start Button */}
          <div className="flex justify-center">
            <button
              onClick={handleStartTest}
              className="bg-slate-800 hover:bg-slate-700 text-white px-6 py-2 rounded-md font-medium transition-all"
            >
              Start Test
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default TestPage;
