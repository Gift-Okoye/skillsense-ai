import { GlassCard } from "@/components/GlassCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Brain, Target, Zap, ArrowLeft } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/skillsense-logo.png";
import gridPattern from "@/assets/grid-pattern.png";
import { Button } from "@/components/ui/button";

const Analysis = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate analysis process
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 4000);

    return () => clearTimeout(timer);
  }, [navigate]);

  const steps = [
    { icon: Brain, label: "Analyzing content", sublabel: "Processing your profile data" },
    { icon: Target, label: "Identifying skills", sublabel: "Extracting key competencies" },
    { icon: Zap, label: "Calculating confidence", sublabel: "Verifying skill strength" },
  ];

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
      
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_50%_50%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/upload")}
              className="rounded-2xl hover:bg-secondary hover:text-foreground"
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

        <div className="flex items-center justify-center min-h-[calc(100vh-120px)]">
          <div className="max-w-2xl mx-auto space-y-12 w-full">
            <GlassCard className="text-center space-y-8 animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 gradient-primary opacity-20 blur-3xl rounded-full animate-pulse-glow" />
              </div>
              <LoadingSpinner size="lg" className="mx-auto relative" />
            </div>

            <div className="space-y-2">
              <h2 className="text-3xl font-heading font-bold">
                Analyzing Your Profile
              </h2>
              <p className="text-lg text-muted-foreground">
                Our AI is discovering your hidden skills...
              </p>
            </div>

            {/* Progress Steps */}
            <div className="space-y-6 pt-4">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-secondary/50 animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left flex-1">
                    <div className="font-semibold text-foreground">{step.label}</div>
                    <div className="text-sm text-muted-foreground">{step.sublabel}</div>
                  </div>
                  <div className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <div
                        key={dot}
                        className="w-2 h-2 rounded-full bg-primary animate-pulse"
                        style={{ animationDelay: `${dot * 150}ms` }}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-xs text-muted-foreground">Data Points</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">AI</div>
                <div className="text-xs text-muted-foreground">Powered</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">95%</div>
                <div className="text-xs text-muted-foreground">Accuracy</div>
              </div>
            </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
