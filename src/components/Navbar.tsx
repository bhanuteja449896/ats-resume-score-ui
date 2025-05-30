
'use client';
import React, { useState } from 'react';
import { Github, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu } from 'lucide-react';

interface NavbarProps { onReset?: () => void; }

const Navbar = ({ onReset }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Creative Logo */}
          <div 
            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() => { onReset && onReset(); }}
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-lg sm:rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-6 transition-transform duration-300">
                <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-white rounded-md sm:rounded-lg flex items-center justify-center">
                  <div className="text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text font-bold text-sm sm:text-base md:text-lg">A</div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 bg-clip-text text-transparent">
                ATS Score
              </h1>
              <p className="text-xs sm:text-xs text-gray-500 font-medium hidden sm:block">Smart Resume Analysis</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2 sm:space-x-3">
            {/* Desktop Buttons */}
            <>
              <Button
                variant="outline"
                size="sm"
                className="items-center space-x-2 hover:bg-gray-50 text-xs sm:text-sm"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                <Github className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden lg:inline">View Source</span>
                <span className="lg:hidden">Source</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                className="items-center space-x-2 hover:bg-yellow-50 hover:border-yellow-300 text-xs sm:text-sm"
                onClick={() => window.open('https://github.com', '_blank')}
              >
                <Star className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden lg:inline">Star on GitHub</span>
                <span className="lg:hidden">Star</span>
              </Button>

              {onReset && (
                <Button
                  onClick={onReset}
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm px-3 sm:px-4"
                >
                  New Analysis
                </Button>
              )}
            </>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden flex items-center">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-6">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open('https://github.com', '_blank')}
                  >
                    View Source
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open('https://github.com', '_blank')}
                  >
                    Star on GitHub
                  </Button>
                  {onReset && (
                    <Button
                      onClick={() => { onReset(); setIsMenuOpen(false); }}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                    >
                      New Analysis
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            {onReset && (
              <Button
                onClick={onReset}
                size="sm"
                className="ml-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-xs sm:text-sm px-3 sm:px-4"
              >
                New
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
