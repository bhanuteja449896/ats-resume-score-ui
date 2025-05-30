
import React, { useState, useEffect } from 'react';
import { Upload, CheckCircle, AlertCircle, FileText, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import AnimatedText from '@/components/AnimatedText';
import LoadingAnimation from '@/components/LoadingAnimation';
import ScoreDashboard from '@/components/ScoreDashboard';
import Navbar from '@/components/Navbar';

interface AnalysisResponse {
  data: {
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
  };
  success: boolean;
  message: string;
  timestamp: number;
}

const Index = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResponse | null>(null);
  const [serverStatus, setServerStatus] = useState<'checking' | 'active' | 'inactive'>('checking');
  const { toast } = useToast();

  // Check server status on component mount
  useEffect(() => {
    checkServerStatus();
  }, []);

  const checkServerStatus = async () => {
    try {
      setServerStatus('checking');
      const response = await fetch('http://localhost:8080/api/health');
      if (response.ok) {
        setServerStatus('active');
      } else {
        setServerStatus('inactive');
      }
    } catch (error) {
      console.error('Server status check failed:', error);
      setServerStatus('inactive');
      toast({
        title: "Server Status",
        description: "Backend server is starting up. This may take up to 45 seconds.",
        variant: "destructive",
      });
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowedTypes.includes(selectedFile.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload only PDF or DOCX files.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (selectedFile.size > 5 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "Please upload files smaller than 5MB.",
        variant: "destructive",
      });
      return;
    }

    setFile(selectedFile);
    toast({
      title: "File Selected",
      description: `${selectedFile.name} is ready for analysis.`,
    });
  };

  const handleUpload = async () => {
    if (!file) return;

    if (serverStatus !== 'active') {
      toast({
        title: "Server Unavailable",
        description: "Please wait for the server to become active.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8080/api/analyze-resume', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result: AnalysisResponse = await response.json();
        setAnalysisResult(result);
        toast({
          title: "Analysis Complete",
          description: "Your resume has been successfully analyzed!",
        });
      } else {
        throw new Error('Analysis failed');
      }
    } catch (error) {
      console.error('Upload failed:', error);
      toast({
        title: "Analysis Failed",
        description: "Failed to analyze resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const resetToHome = () => {
    setFile(null);
    setAnalysisResult(null);
    setIsUploading(false);
  };

  if (analysisResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar onReset={resetToHome} />
        <ScoreDashboard data={analysisResult.data} onReset={resetToHome} />
      </div>
    );
  }

  if (isUploading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navbar />
        <LoadingAnimation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <AnimatedText />
          
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto leading-relaxed">
            Upload your resume and get an instant ATS compatibility score with detailed feedback
            to improve your chances of landing your dream job.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <Card className="p-8 shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <div className="space-y-6">
              {/* Server Status Indicator */}
              <div className="flex items-center justify-center space-x-2 mb-6">
                {serverStatus === 'checking' && (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                    <span className="text-sm text-gray-600">Checking server status...</span>
                  </>
                )}
                {serverStatus === 'active' && (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-600">Server Active</span>
                  </>
                )}
                {serverStatus === 'inactive' && (
                  <>
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm text-red-600">Server Starting (45s)</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={checkServerStatus}
                      className="ml-2"
                    >
                      Retry
                    </Button>
                  </>
                )}
              </div>

              {/* File Upload Area */}
              <div className="relative">
                <input
                  type="file"
                  id="resume-upload"
                  accept=".pdf,.docx"
                  onChange={handleFileChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  disabled={serverStatus !== 'active'}
                />
                <div className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
                  file 
                    ? 'border-green-400 bg-green-50' 
                    : serverStatus === 'active'
                      ? 'border-blue-300 hover:border-blue-400 hover:bg-blue-50' 
                      : 'border-gray-300 bg-gray-50'
                }`}>
                  <div className="space-y-4">
                    {file ? (
                      <FileText className="h-12 w-12 text-green-600 mx-auto" />
                    ) : (
                      <Upload className="h-12 w-12 text-blue-600 mx-auto" />
                    )}
                    
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">
                        {file ? 'File Selected' : 'Upload Your Resume'}
                      </h3>
                      {file ? (
                        <p className="text-green-600 font-medium">{file.name}</p>
                      ) : (
                        <p className="text-gray-600">
                          Drag and drop your resume here, or click to browse
                        </p>
                      )}
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <p>Supported formats: PDF, DOCX</p>
                      <p>Maximum size: 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Upload Button */}
              <Button
                onClick={handleUpload}
                disabled={!file || serverStatus !== 'active'}
                className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 transition-all duration-200"
              >
                <Eye className="h-5 w-5 mr-2" />
                Analyze Resume
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Index;
