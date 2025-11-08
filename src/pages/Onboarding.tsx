import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate } from "react-router-dom";
import { Sparkles, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-illustration.jpg";

const Onboarding = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
      {/* Gradient glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-16">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-16">
          <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-heading font-semibold">SkillSense</span>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-7xl mx-auto">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Skills Analysis</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-tight">
              Discover your{" "}
              <span className="gradient-text">hidden skills</span>{" "}
              with AI
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              SkillSense uses advanced AI to analyze your CV or LinkedIn profile, 
              uncovering valuable skills you didn't know you had and presenting 
              them in a beautiful, professional format.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => navigate("/upload")}
                className="group gradient-primary text-primary-foreground rounded-2xl h-14 px-8 text-base font-semibold hover-glow transition-smooth"
              >
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-2xl h-14 px-8 text-base font-medium border-2 hover:bg-secondary"
              >
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground">Profiles Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Skill Categories</div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 gradient-primary opacity-20 blur-3xl rounded-full" />
            <GlassCard className="relative overflow-hidden">
              <img
                src={heroImage}
                alt="AI Skills Discovery Illustration"
                className="w-full h-auto rounded-2xl"
              />
            </GlassCard>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mt-32 max-w-6xl mx-auto">
          {[
            {
              title: "AI-Powered Analysis",
              description: "Advanced algorithms identify skills from your experience and achievements",
            },
            {
              title: "Skill Verification",
              description: "Confidence scores help you understand the strength of each identified skill",
            },
            {
              title: "Beautiful Profiles",
              description: "Generate professional skill portfolios ready to share with employers",
            },
          ].map((feature, index) => (
            <GlassCard
              key={index}
              hover
              className="animate-fade-in space-y-4"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-heading font-semibold">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </GlassCard>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
