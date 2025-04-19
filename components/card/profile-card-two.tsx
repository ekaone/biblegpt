"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, MessageCircle, Zap } from "lucide-react";

export default function ProfileCardTwo() {
  const [showFooter, setShowFooter] = useState(false);

  const toggleFooter = () => {
    setShowFooter(!showFooter);
  };

  return (
    <div className="relative w-full max-w-md">
      {/* Main Card */}
      <div className="relative z-10 overflow-hidden rounded-[20px] bg-gray-900 bg-opacity-90 p-6 shadow-lg backdrop-blur-sm">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <span className="text-gray-400 text-sm">Web Designer</span>
          <div className="flex items-center text-gray-400">
            <Clock className="h-4 w-4 mr-1" />
            <span>7:15PM</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="mb-8">
          <div className="flex items-center">
            <Avatar className="h-16 w-16 border-2 border-gray-800">
              <AvatarImage src="https://i.pravatar.cc/300" alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <h2 className="text-2xl font-bold text-white">Jay Dwivedi</h2>
              <div className="flex items-center text-gray-400 mt-1">
                <div className="h-2 w-2 rounded-full bg-green-500 mr-2"></div>
                <span>Available for work</span>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-center">
          <Button
            onClick={toggleFooter}
            className="w-full py-6 bg-gray-800 hover:bg-gray-700 text-white rounded-xl transition-all duration-300 ease-out hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
          >
            <MessageCircle className="mr-2 h-5 w-5" />
            {showFooter ? "Hide Message" : "Show Message"}
          </Button>
        </div>
      </div>

      {/* Animated Footer - Now animating from top to bottom */}
      <div
        className={`absolute left-0 right-0 bg-gray-900 bg-opacity-90 text-white py-4 px-6 mt-2 flex items-center justify-center rounded-b-[20px] rounded-t-[20px] transition-all duration-500 ease-in-out ${
          showFooter
            ? "top-full translate-y-0 opacity-100"
            : "top-10 -translate-y-full opacity-0"
        }`}
      >
        <Zap className="mr-2 h-5 w-5" />
        <span className="font-medium">Currently High on Creativity</span>
      </div>
    </div>
  );
}
