
import React, { useState, useEffect } from 'react';

const AnimatedText = () => {
  const phrases = [
    "Best ATS Score Checker",
    "AI-Powered Resume Analysis",
    "Boost Your Job Applications",
    "Professional Resume Review",
    "Beat the ATS System"
  ];

  const [currentPhrase, setCurrentPhrase] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setIsSliding(false);
      }, 500); // Half of the animation duration
    }, 5000);

    return () => clearInterval(interval);
  }, [phrases.length]);

  return (
    <div className="text-center relative overflow-hidden h-20 flex items-center justify-center">
      <div 
        className={`transition-transform duration-1000 ease-in-out ${
          isSliding ? 'transform translate-y-full opacity-0' : 'transform translate-y-0 opacity-100'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {phrases[currentPhrase]}
        </h1>
      </div>
      
      {/* Next text sliding in from top */}
      <div 
        className={`absolute top-0 left-0 right-0 transition-transform duration-1000 ease-in-out ${
          isSliding ? 'transform translate-y-0 opacity-100' : 'transform -translate-y-full opacity-0'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {phrases[(currentPhrase + 1) % phrases.length]}
        </h1>
      </div>
      
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-32 animate-pulse"></div>
    </div>
  );
};

export default AnimatedText;
