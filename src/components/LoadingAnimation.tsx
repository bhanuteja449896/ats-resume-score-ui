
import React from 'react';
import { Search, FileText, Brain } from 'lucide-react';

const LoadingAnimation = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-8">
        <div className="relative">
          {/* Animated Paper */}
          <div className="relative mx-auto w-32 h-40 bg-white rounded-lg shadow-lg border-2 border-gray-200 overflow-hidden">
            <div className="absolute inset-0 p-4">
              <div className="space-y-2">
                <div className="h-2 bg-gray-300 rounded animate-pulse"></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                <div className="h-2 bg-blue-400 rounded animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                <div className="h-2 bg-gray-300 rounded animate-pulse" style={{ animationDelay: '0.8s' }}></div>
              </div>
            </div>
            
            {/* Scanning Line */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-[slide-down_2s_ease-in-out_infinite]"></div>
          </div>

          {/* Animated Magnifying Glass */}
          <div className="absolute -top-4 -right-4 transform animate-[bounce_1s_ease-in-out_infinite]">
            <div className="relative">
              <Search className="h-12 w-12 text-blue-600" />
              <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
            </div>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-800">Analyzing Your Resume</h2>
          
          <div className="flex justify-center space-x-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center animate-pulse">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <span className="text-sm text-gray-600">Parsing</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2" style={{ animationDelay: '1s' }}>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center animate-pulse">
                <Brain className="h-6 w-6 text-purple-600" />
              </div>
              <span className="text-sm text-gray-600">Analyzing</span>
            </div>
            
            <div className="flex flex-col items-center space-y-2" style={{ animationDelay: '2s' }}>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center animate-pulse">
                <Search className="h-6 w-6 text-green-600" />
              </div>
              <span className="text-sm text-gray-600">Scoring</span>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="w-64 mx-auto bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full animate-[progress_3s_ease-in-out_infinite]"></div>
          </div>
          
          <p className="text-gray-600 animate-pulse">
            This may take a few moments...
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation;
