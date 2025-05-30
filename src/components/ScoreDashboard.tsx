
import React from 'react';
import { Trophy, TrendingUp, AlertCircle, CheckCircle2, RotateCcw } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

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
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 80) return 'from-green-500 to-emerald-600';
    if (score >= 60) return 'from-yellow-500 to-orange-600';
    return 'from-red-500 to-pink-600';
  };

  const formatCategoryName = (key: string) => {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, str => str.toUpperCase())
      .trim();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Overall Score */}
        <div className="text-center mb-8">
          <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-r ${getScoreBackground(data.score)} shadow-xl mb-4 animate-scale-in`}>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{data.score}</div>
              <div className="text-sm text-white/90">ATS Score</div>
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Resume Analysis Complete</h1>
          <p className="text-gray-600 mb-4">Here's your detailed ATS compatibility report</p>
          
          <Button onClick={onReset} variant="outline" className="mb-8">
            <RotateCcw className="h-4 w-4 mr-2" />
            Analyze Another Resume
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-blue-600" />
                Score Breakdown
              </h2>
              
              <div className="space-y-4">
                {Object.entries(data.scoreBreakdown).map(([category, scores], index) => {
                  const percentage = (scores.score / scores.maxScore) * 100;
                  return (
                    <div key={category} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-700">
                          {formatCategoryName(category)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {scores.score}/{scores.maxScore}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full bg-gradient-to-r transition-all duration-1000 ${
                            percentage >= 80 
                              ? 'from-green-500 to-emerald-600' 
                              : percentage >= 60 
                                ? 'from-yellow-500 to-orange-600' 
                                : 'from-red-500 to-pink-600'
                          }`}
                          style={{ 
                            width: `${percentage}%`,
                            transitionDelay: `${index * 100}ms`
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Card>

            {/* Suggestions */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-orange-600" />
                Improvement Suggestions
              </h2>
              
              <div className="space-y-3">
                {data.suggestions.map((suggestion, index) => (
                  <div 
                    key={index} 
                    className="flex items-start space-x-3 p-3 bg-orange-50 rounded-lg animate-fade-in"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-gray-700">{suggestion}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Side Panel */}
          <div className="space-y-6">
            {/* Missing Sections */}
            {data.missingSections.length > 0 && (
              <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                  <AlertCircle className="h-5 w-5 mr-2 text-red-600" />
                  Missing Sections
                </h3>
                
                <div className="space-y-2">
                  {data.missingSections.map((section, index) => (
                    <Badge 
                      key={index} 
                      variant="destructive" 
                      className="w-full justify-center py-2 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      {section}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* Matched Keywords */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-green-600" />
                Matched Keywords ({data.matchedKeywords.length})
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {data.matchedKeywords.map((keyword, index) => (
                  <Badge 
                    key={index} 
                    variant="secondary" 
                    className="bg-green-100 text-green-800 animate-fade-in"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {keyword}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* Score Legend */}
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-0 shadow-xl">
              <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                Score Guide
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded"></div>
                  <span className="text-sm text-gray-700">80-100: Excellent</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-yellow-500 to-orange-600 rounded"></div>
                  <span className="text-sm text-gray-700">60-79: Good</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-pink-600 rounded"></div>
                  <span className="text-sm text-gray-700">0-59: Needs Work</span>
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
