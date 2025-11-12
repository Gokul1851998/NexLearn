import React from 'react'
import loginIcon1 from "../../../../public/Iogin icon 1.png";
import loginIcon2 from "../../../../public/login icon 2.png";

export default function LoginCard() {
  return(
       <div className="hidden w-1/2 bg-[#1e293b] p-10 text-white lg:flex flex-col justify-center items-center space-y-6">
          <div className="flex items-center space-x-3">
            <div className="rounded-md">
              <img
                src={loginIcon1.src}
                alt="Logo"
                className="h-30 w-30 object-contain"
              />
            </div>
            <div>
              <h1 className="text-2xl font-bold">NexLearn</h1>
              <p className="text-sm text-gray-300">futuristic learning</p>
            </div>
          </div>

          {/* Illustration */}
          <img
            src={loginIcon2.src}
            alt="Login Illustration"
            className="w-72 object-contain"
          />
        </div>
  )
}
