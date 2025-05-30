
import React from 'react';
import { FileSearch, Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onReset?: () => void;
}

const Navbar = ({ onReset }: NavbarProps) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={onReset}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <FileSearch className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                ATS Score Checker
              </h1>
              <p className="text-xs text-gray-500">AI-Powered Resume Analysis</p>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <a 
              href="#features" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              How It Works
            </a>
            <a 
              href="#about" 
              className="text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              About
            </a>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2 hover:bg-gray-50"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Github className="h-4 w-4" />
              <span>View Source</span>
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              className="hidden sm:flex items-center space-x-2 hover:bg-yellow-50 hover:border-yellow-300"
              onClick={() => window.open('https://github.com', '_blank')}
            >
              <Star className="h-4 w-4" />
              <span>Star on GitHub</span>
            </Button>

            {onReset && (
              <Button
                onClick={onReset}
                size="sm"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                New Analysis
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
