"use client";
import React, { useState, useEffect } from "react";
import api from "@/lib/axios";
import { toast } from "sonner";
import QuestionPanel from "./components/QuestionPanel";
import QuestionGrid from "./components/QuestionGrid";
import Timer from "./components/Timer";

interface Option {
  id: number;
  option: string;
  is_correct: boolean;
  image: string | null;
}

interface Question {
  question_id: number;
  number: number;
  question: string;
  comprehension: string | null;
  image: string | null;
  options: Option[];
}

interface QuestionListResponse {
  success: boolean;
  total_time: number;
  total_marks: number;
  questions_count: number;
  questions: Question[];
}

const QuestionList: React.FC = () => {
  const [data, setData] = useState<QuestionListResponse | null>(null);
  const [current, setCurrent] = useState(0);
  const [selectedOptions, setSelectedOptions] = React.useState<
    { question_id: number; id: number; is_correct: boolean; type: number }[]
  >([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        if (!token) {
          toast.error("No access token found");
          return;
        }

        const res = await api.get<QuestionListResponse>("/question/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
     
        if (res.data.success) {
          setData(res.data);
        } else {
          toast.error("Failed to fetch questions");
        }
      } catch (error) {
        toast.error("Error fetching questions");
      }
    };

    fetchQuestions();
  }, []);

  if (!data)
    return <p className="text-center text-gray-500 py-10">Loading...</p>;

  const currentQuestion = data.questions[current];
  console.log(data);
  
  const handleButtonClick = (type: number) => {

    if (type === 1) {
      const result = selectedOptions.find(
        (item) => item.question_id === data?.questions[current].question_id
      );
      if (!result) {
        setSelectedOptions((prev) => [
          ...prev,
          {
            question_id: data?.questions[current].question_id,
            id: 0,
            is_correct: false,
            type: 2,
          },
        ]);
      }
      setCurrent((c) => Math.min(c + 1, data.questions.length - 1));
    } else if (type === 2) {
      setCurrent((c) => c - 1);
    } else if (type === 3) {
      const result = selectedOptions.find(
        (item) => item.question_id === data?.questions[current].question_id
      );

      if (result) {
        if (result.type === 1) {
          setSelectedOptions((prev) =>
            prev.map(
              (item) =>
                item.question_id === data?.questions[current].question_id
                  ? { ...item, type: 4 } // update only matching question
                  : item // keep others unchanged
            )
          );
        } else if (result.type === 2) {
          setSelectedOptions((prev) =>
            prev.map(
              (item) =>
                item.question_id === data?.questions[current].question_id
                  ? { ...item, type: 3 } // update only matching question
                  : item // keep others unchanged
            )
          );
        }
      } else {
         setSelectedOptions((prev) => [
          ...prev,
          {
            question_id: data?.questions[current].question_id,
            id: 0,
            is_correct: false,
            type: 3,
          },
        ]);
      }
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col md:flex-row bg-blue-50">
      {/* Left Section */}
      <div className="flex flex-col flex-1 p-3 overflow-hidden">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-gray-700 text-lg">
            Ancient Indian History MCQ
          </h2>
          <p className="text-gray-800 font-medium">
            {currentQuestion.number.toString().padStart(2, "0")}/
            {data.questions_count}
          </p>
        </div>

        {/* Scrollable question area */}
        <div className="flex-1 overflow-y-auto">
          <QuestionPanel
            question_id={currentQuestion.question_id}
            questionNumber={currentQuestion.number}
            questionText={currentQuestion.question}
            imageUrl={currentQuestion.image}
            options={currentQuestion.options}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
          ;
        </div>

        {/* Buttons fixed at bottom of same container */}
        <div className="flex flex-wrap justify-between gap-3 mt-4 pt-3 border-t border-gray-200">
          <button
            onClick={() => handleButtonClick(3)}
            className="bg-[#800080] cursor-pointer text-white px-5 py-2 rounded-md w-full sm:w-auto sm:min-w-[140px] lg:min-w-[300px] text-sm sm:text-base hover:bg-[#6d006d] transition-all disabled:opacity-50"
          >
            Mark for Review
          </button>

          <button
            disabled={current === 0}
            onClick={() => handleButtonClick(2)}
            className="bg-gray-300 text-gray-700 px-5 py-2 rounded-md w-full sm:w-auto sm:min-w-[140px] lg:min-w-[300px] text-sm sm:text-base hover:bg-gray-400 transition-all disabled:opacity-50"
          >
            Previous
          </button>

          <button
            onClick={() => handleButtonClick(1)}
            className="bg-sky-700 text-white px-5 py-2 rounded-md w-full sm:w-auto sm:min-w-[140px] lg:min-w-[300px] text-sm sm:text-base hover:bg-sky-800 transition-all"
          >
            Next
          </button>
        </div>
      </div>

      {/* ✅ Fixed Bottom Button Bar */}

      {/* Right Section */}
      <div className="w-full md:w-1/3 lg:w-1/3 p-3 flex flex-col">
        {/* Header row with title and timer */}
        <div className="flex items-center justify-between mb-2 px-1">
          <p className="font-semibold text-xs text-gray-700">
            Question No. Sheet :
          </p>

          <div className="flex items-center gap-1">
            <p className="font-semibold text-xs text-gray-700">
              Remaining Time :
            </p>
            <Timer totalTime={data.total_time} />
          </div>
        </div>

        {/* Question Grid Section */}
        <div className="min-h-[calc(100vh-9rem)] w-full bg-blue-60 border-l p-4 m-1 flex flex-col gap-4">
          <QuestionGrid
            total={data.questions.length}
            data={data.questions}
            selectedOptions={selectedOptions}
            current={current}
           onSelect={(i) => setCurrent(i)}
          />
        </div>
      </div>
    </div>
  );
};

export default QuestionList;
