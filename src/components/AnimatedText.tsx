
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
  const [isEvaporating, setIsEvaporating] = useState(false);
  const [pixels, setPixels] = useState<Array<{id: number, char: string, x: number, y: number}>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsEvaporating(true);
      
      // Create pixel effect
      const text = phrases[currentPhrase];
      const newPixels = text.split('').map((char, index) => ({
        id: Math.random(),
        char,
        x: index * 20,
        y: 0
      }));
      setPixels(newPixels);
      
      // Change text after evaporation
      setTimeout(() => {
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
        setIsEvaporating(false);
        setPixels([]);
      }, 1500);
    }, 5000);

    return () => clearInterval(interval);
  }, [phrases.length, currentPhrase]);

  return (
    <div className="text-center relative overflow-hidden h-20 flex items-center justify-center">
      {/* Main Text */}
      <div 
        className={`transition-all duration-500 ease-in-out ${
          isEvaporating 
            ? 'opacity-0 scale-110 blur-sm' 
            : 'opacity-100 scale-100 blur-0'
        }`}
      >
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          {phrases[currentPhrase]}
        </h1>
      </div>
      
      {/* Flying Pixels Effect */}
      {isEvaporating && (
        <div className="absolute inset-0 pointer-events-none">
          {pixels.map((pixel) => (
            <div
              key={pixel.id}
              className="absolute text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent animate-pixel-fly"
              style={{
                left: `${pixel.x}px`,
                top: `${pixel.y}px`,
                animationDelay: `${Math.random() * 0.5}s`,
                animationDuration: `${1 + Math.random() * 0.5}s`
              }}
            >
              {pixel.char}
            </div>
          ))}
        </div>
      )}
      
      {/* Gradient Bar */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-32 animate-pulse"></div>
    </div>
  );
};

export default AnimatedText;
