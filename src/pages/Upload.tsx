import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate } from "react-router-dom";
import { Upload as UploadIcon, Linkedin, FileText, ArrowLeft } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/skillsense-logo.png";

const Upload = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleAnalyze = () => {
    navigate("/analysis");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/")}
              className="rounded-2xl hover:bg-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img 
              src={logo} 
              alt="SkillSense Logo" 
              className="h-10 w-auto"
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h1 className="text-4xl lg:text-5xl font-heading font-bold">
              Upload Your Profile
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to analyze your skills. Upload your CV or connect your LinkedIn profile.
            </p>
          </div>

          {/* Upload Options */}
          <div className="grid md:grid-cols-2 gap-8 animate-scale-in">
            {/* CV Upload */}
            <GlassCard hover className="space-y-6">
              <div className="w-16 h-16 rounded-3xl gradient-primary flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8 text-white" />
              </div>
              
              <div className="text-center space-y-2">
                <h3 className="text-2xl font-heading font-semibold">Upload CV</h3>
                <p className="text-muted-foreground">
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
                  onClick={handleAnalyze}
                  disabled={!selectedFile}
                  className="w-full gradient-primary text-primary-foreground rounded-2xl h-12 font-semibold hover-glow transition-smooth"
                >
                  Analyze CV
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
                  onClick={handleAnalyze}
                  className="w-full bg-[#0077B5] hover:bg-[#006399] text-white rounded-2xl h-12 font-semibold transition-smooth"
                >
                  Connect with LinkedIn
                </Button>
              </div>
            </GlassCard>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-6 text-center animate-fade-in">
            {[
              { label: "Secure", sublabel: "256-bit encryption" },
              { label: "Private", sublabel: "Never shared" },
              { label: "Fast", sublabel: "Results in seconds" },
            ].map((item, index) => (
              <div key={index} className="space-y-1">
                <div className="text-lg font-semibold text-foreground">{item.label}</div>
                <div className="text-sm text-muted-foreground">{item.sublabel}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
