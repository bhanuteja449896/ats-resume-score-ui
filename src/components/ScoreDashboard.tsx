import React from 'react';
import { TrendingUp, AlertCircle, CheckCircle2, Target, Award, Zap } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface ScoreData {
  score: number;
  scoreBreakdown: {
    [key: string]: {
      score: number;
      maxScore: number;
    };
  };
  suggestions: string[];
  missingSections: string[];
  matchedKeywords: string[];
}

interface ScoreDashboardProps {
  data: ScoreData;
  onReset: () => void;
}

const ScoreDashboard = ({ data, onReset }: ScoreDashboardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600';
    if (score >= 60) return 'text-amber-600';
    return 'text-red-500';
  };

  const getScoreGradient = (score: number) => {
    if (score >= 80) return 'from-emerald-400 via-emerald-500 to-emerald-600';
    if (score >= 60) return 'from-amber-400 via-amber-500 to-amber-600';
    return 'from-red-400 via-red-500 to-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return { emoji: "🚀", message: "Outstanding! ATS systems will love your resume!" };
    if (score >= 80) return { emoji: "🎯", message: "Excellent! Your resume is highly ATS-compatible!" };
    if (score >= 70) return { emoji: "👍", message: "Good job! Minor improvements will boost your score!" };
    if (score >= 60) return { emoji: "📈", message: "Getting there! Some optimizations needed!" };
    return { emoji: "💪", message: "Room for improvement! Let's optimize your resume!" };
  };

  const formatCategoryName = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  const scoreMessage = getScoreMessage(data.score);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        {/* Animated Score Circle */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="relative inline-block">
            <div className={`w-28 h-28 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-r ${getScoreGradient(data.score)} p-1.5 sm:p-2 shadow-2xl animate-scale-in`}>
              <div className="w-full h-full bg-white rounded-full flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
                <div className={`text-2xl sm:text-3xl md:text-4xl font-bold ${getScoreColor(data.score)} animate-bounce`}>
                  {data.score}
                </div>
                <div className="text-xs sm:text-sm text-gray-500 font-medium">ATS Score</div>
              </div>
            </div>
            
            {/* Floating icons around the circle */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '0.5s' }}>
              <Award className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1s' }}>
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-white" />
            </div>
            <div className="absolute top-0 -left-6 sm:-left-8 w-5 h-5 sm:w-6 sm:h-6 bg-purple-500 rounded-full flex items-center justify-center animate-bounce" style={{ animationDelay: '1.5s' }}>
              <Zap className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-white" />
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 animate-fade-in px-4" style={{ animationDelay: '1s' }}>
            <div className="text-2xl sm:text-3xl md:text-4xl mb-2">{scoreMessage.emoji}</div>
            <p className={`text-base sm:text-lg md:text-xl font-semibold ${getScoreColor(data.score)} mb-2 leading-tight`}>
              {scoreMessage.message}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {/* Score Breakdown */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            <Card className="p-4 sm:p-6 md:p-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-blue-600" />
                Performance Breakdown
              </h2>
              
              <div className="space-y-4 sm:space-y-6">
                {Object.entries(data.scoreBreakdown).map(([category, scores], index) => {
                  const percentage = (scores.score / scores.maxScore) * 100;
                  return (
                    <div key={category} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                      <div className="flex justify-between items-center mb-2 sm:mb-3">
                        <span className="font-semibold text-gray-700 text-sm sm:text-base md:text-lg">
                          {formatCategoryName(category)}
                        </span>
                        <span className="text-sm sm:text-base md:text-lg font-bold text-gray-600">
                          {scores.score}/{scores.maxScore}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 sm:h-4 shadow-inner">
                        <div
                          className={`h-3 sm:h-4 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out shadow-lg ${
                            percentage >= 80 
                              ? 'from-emerald-400 to-emerald-600' 
                              : percentage >= 60 
                                ? 'from-amber-400 to-amber-600' 
                                : 'from-red-400 to-red-600'
                          }`}
                          style={{ 
                            width: `${percentage}%`,
                            transitionDelay: `${index * 200}ms`
                          }}
                        ></div>
                      </div>
                      <div className="text-right mt-1">
                        <span className="text-xs sm:text-sm text-gray-500">{Math.round(percentage)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Suggestions */}
            <Card className="p-4 sm:p-6 md:p-8 bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 sm:mb-6 flex items-center">
                <AlertCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 sm:mr-3 text-orange-600" />
                Smart Recommendations
              </h2>
              
              <div className="space-y-3 sm:space-y-4">
                {data.suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gradient-to-r from-orange-50 to-yellow-50 rounded-xl border-l-4 border-orange-400 animate-fade-in shadow-sm hover:shadow-md transition-shadow"
                    style={{ animationDelay: `${index * 300}ms` }}
                  >
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0 animate-pulse"></div>
                    <p className="text-gray-700 font-medium text-sm sm:text-base leading-relaxed">{suggestion}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-4 sm:space-y-6 md:space-y-8">
            {/* Missing Sections */}
            {data.missingSections.length > 0 && (
              <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
                <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                  <AlertCircle className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-red-600" />
                  Missing Elements
                </h3>
                
                <div className="space-y-2 sm:space-y-3">
                  {data.missingSections.map((section, index) => (
                    <div 
                      key={index} 
                      className="bg-red-50 border border-red-200 rounded-lg p-2.5 sm:p-3 animate-fade-in"
                      style={{ animationDelay: `${index * 150}ms` }}
                    >
                      <span className="text-red-700 font-medium text-sm sm:text-base">{section}</span>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Matched Keywords */}
            <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <CheckCircle2 className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-emerald-600" />
                Detected Keywords ({data.matchedKeywords.length})
              </h3>
              
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {data.matchedKeywords.map((keyword, index) => (
                  <span 
                    key={index} 
                    className="bg-emerald-100 text-emerald-800 px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium animate-fade-in hover:bg-emerald-200 transition-colors cursor-default"
                    style={{ animationDelay: `${index * 75}ms` }}
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </Card>

            {/* Score Legend */}
            <Card className="p-4 sm:p-6 bg-white/70 backdrop-blur-sm border-0 shadow-xl rounded-2xl">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800 mb-3 sm:mb-4 flex items-center">
                <Award className="h-4 w-4 sm:h-5 sm:w-5 mr-2 text-yellow-600" />
                Score Guide
              </h3>
              
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full shadow-sm flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">80-100: Outstanding</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full shadow-sm flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">60-79: Good</span>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r from-red-400 to-red-600 rounded-full shadow-sm flex-shrink-0"></div>
                  <span className="text-xs sm:text-sm text-gray-700 font-medium">0-59: Needs Work</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScoreDashboard;
