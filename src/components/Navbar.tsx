
import React from 'react';
import { Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onReset?: () => void;
}

const Navbar = ({ onReset }: NavbarProps) => {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Creative Logo */}
          <div 
            className="flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={onReset}
          >
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <div className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold text-lg">A</div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                ATS Score
              </h1>
              <p className="text-xs text-gray-500 font-medium">Smart Resume Analysis</p>
            </div>
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
