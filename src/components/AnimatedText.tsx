
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
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const currentText = phrases[currentPhrase];
    const typeSpeed = isDeleting ? 50 : 100;
    const pauseTime = isDeleting ? 500 : 2000;

    const timer = setTimeout(() => {
      if (!isDeleting && charIndex < currentText.length) {
        setDisplayText(currentText.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
      } else if (isDeleting && charIndex > 0) {
        setDisplayText(currentText.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
      } else if (!isDeleting && charIndex === currentText.length) {
        setTimeout(() => setIsDeleting(true), pauseTime);
      } else if (isDeleting && charIndex === 0) {
        setIsDeleting(false);
        setCurrentPhrase((prev) => (prev + 1) % phrases.length);
      }
    }, typeSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, currentPhrase, phrases]);

  return (
    <div className="text-center">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
        {displayText}
        <span className="animate-pulse">|</span>
      </h1>
      <div className="h-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full w-32 mx-auto animate-pulse"></div>
    </div>
  );
};

export default AnimatedText;
