import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, Linkedin, FileText, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/skillsense-logo.png";
import gridPattern from "@/assets/grid-pattern.png";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/hooks/use-toast";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";

const Upload = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState<"format" | "oauth">("format");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const validFormats = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
      
      if (!validFormats.includes(file.type)) {
        setErrorType("format");
        setErrorMessage("Invalid file format. Please upload a PDF, DOC, or DOCX file.");
        setShowError(true);
        return;
      }
      
      setSelectedFile(file);
      simulateUpload(file);
    }
  };

  const simulateUpload = async (file: File) => {
    setIsUploading(true);
    
    // Simulate upload process (2 seconds)
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsUploading(false);
    setIsProcessing(true);
    
    // Simulate AI processing (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    toast({
      title: "Analysis Complete!",
      description: "Your profile has been successfully analyzed.",
    });
    
    setTimeout(() => {
      navigate("/analysis");
    }, 1000);
  };

  const handleLinkedInConnect = async () => {
    setIsUploading(true);
    
    // Simulate OAuth process (random success/failure)
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const success = Math.random() > 0.3; // 70% success rate for demo
    
    if (!success) {
      setIsUploading(false);
      setErrorType("oauth");
      setErrorMessage("LinkedIn connection was denied or failed. Please try again.");
      setShowError(true);
      return;
    }
    
    setIsUploading(false);
    setIsProcessing(true);
    
    // Simulate AI processing (3 seconds)
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    toast({
      title: "Analysis Complete!",
      description: "Your LinkedIn profile has been successfully analyzed.",
    });
    
    setTimeout(() => {
      navigate("/analysis");
    }, 1000);
  };

  const handleRetry = () => {
    setShowError(false);
    setErrorMessage("");
    setSelectedFile(null);
  };

  const handleCancel = () => {
    setShowError(false);
    setErrorMessage("");
    setSelectedFile(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background relative">
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${gridPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1
        }}
      />
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-6 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 md:mb-16">
          <div className="flex items-center gap-2 md:gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-2xl hover:bg-secondary hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Button>
            <a href="/" className="flex items-center">
              <img 
                src={logo} 
                alt="SkillSense Logo" 
                className="h-8 md:h-10 w-auto hover:opacity-80 transition-opacity"
              />
            </a>
          </div>
          <div className="hidden md:block">
            <ThemeToggle />
          </div>
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-8 md:space-y-12">
          <div className="text-center space-y-4 animate-fade-in px-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold">
              Upload Your Profile
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to analyze your skills. Upload your CV or connect your LinkedIn profile.
            </p>
          </div>

          {/* Upload Options */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 animate-scale-in px-4">{/* CV Upload */}
            <GlassCard hover className="space-y-6">
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-3xl gradient-primary flex items-center justify-center mx-auto">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-white" />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-xl md:text-2xl font-heading font-semibold">Upload CV</h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  Upload your resume in PDF or DOCX format
                </p>
              </div>

              <div className="space-y-4">
                <label className="block">
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileChange}
                    className="hidden"
                    id="file-upload"
                  />
                  <div className="border-2 border-dashed border-border hover:border-primary rounded-3xl p-8 text-center cursor-pointer transition-smooth hover:bg-secondary/50">
                    <UploadIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground">
                      {selectedFile ? selectedFile.name : "Click to browse or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      PDF, DOC, DOCX up to 10MB
                    </p>
                  </div>
                </label>

                <Button
                  onClick={() => selectedFile && simulateUpload(selectedFile)}
                  disabled={!selectedFile || isUploading || isProcessing}
                  className="w-full gradient-primary text-primary-foreground rounded-2xl h-12 font-semibold hover-glow transition-smooth"
                >
                  {isUploading ? "Uploading..." : "Analyze CV"}
                </Button>
              </div>
            </GlassCard>

            {/* LinkedIn Connect */}
            <GlassCard hover className="space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-[#0077B5] flex items-center justify-center mx-auto">
                <Linkedin className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-heading font-semibold">Connect LinkedIn</h3>
                <p className="text-muted-foreground">
                  Import your profile directly from LinkedIn
                </p>
              </div>

              <div className="space-y-4">
                <div className="border-2 border-border rounded-3xl p-8 text-center bg-secondary/50">
                  <div className="w-20 h-20 rounded-full bg-[#0077B5]/10 flex items-center justify-center mx-auto mb-4">
                    <Linkedin className="w-10 h-10 text-[#0077B5]" />
                  </div>
                  <p className="text-sm font-medium text-foreground mb-2">
                    Quick & Secure Connection
                  </p>
                  <p className="text-xs text-muted-foreground">
                    We only access your profile information
                  </p>
                </div>

                <Button
                  onClick={handleLinkedInConnect}
                  disabled={isUploading || isProcessing}
                  className="w-full bg-[#0077B5] hover:bg-[#006399] text-white rounded-2xl h-12 font-semibold transition-smooth"
                >
                  {isUploading ? "Connecting..." : "Connect with LinkedIn"}
                </Button>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>

      {/* Processing Modal */}
      <Dialog open={isProcessing} onOpenChange={() => {}}>
        <DialogContent className="w-[calc(100vw-3rem)] sm:max-w-[500px] max-h-[90vh] overflow-y-auto rounded-3xl">
          <div className="absolute inset-0 pointer-events-none opacity-5" style={{
            backgroundImage: `url(${gridPattern})`,
            backgroundSize: "cover"
          }} />
          
          <div className="relative text-center space-y-6 py-8">
            <div className="flex justify-center">
              <LoadingSpinner size="lg" />
            </div>
            
            <DialogHeader>
              <DialogTitle className="text-2xl">Analyzing Your Profile</DialogTitle>
              <DialogDescription className="text-base">
                Our AI is processing your information and extracting valuable insights...
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 text-left">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="flex items-center gap-2 justify-center text-sm text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span>This usually takes 30-60 seconds</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Error Modal */}
      <Dialog open={showError} onOpenChange={setShowError}>
        <DialogContent className="w-[calc(100vw-3rem)] sm:max-w-[425px] max-h-[90vh] overflow-y-auto rounded-3xl">
          <DialogHeader>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                <AlertCircle className="w-8 h-8 text-destructive" />
              </div>
            </div>
            <DialogTitle className="text-center text-xl">
              {errorType === "format" ? "Invalid File Format" : "Connection Failed"}
            </DialogTitle>
            <DialogDescription className="text-center text-base">
              {errorMessage}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex gap-3 mt-4">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1 rounded-xl h-11"
            >
              Cancel
            </Button>
            <Button
              onClick={handleRetry}
              className="flex-1 gradient-primary text-primary-foreground rounded-xl h-11"
            >
              Retry
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Upload;
