import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { SkillTag } from "@/components/SkillTag";
import { SkillProgressBar } from "@/components/SkillProgressBar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { Sparkles, Download, Share2, User, Briefcase, Award } from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const mockSkills = {
    hard: [
      { name: "React.js", confidence: 95, category: "hard" as const },
      { name: "TypeScript", confidence: 88, category: "hard" as const },
      { name: "Node.js", confidence: 85, category: "hard" as const },
      { name: "Python", confidence: 78, category: "hard" as const },
      { name: "SQL", confidence: 82, category: "hard" as const },
    ],
    soft: [
      { name: "Leadership", confidence: 90, category: "soft" as const },
      { name: "Communication", confidence: 88, category: "soft" as const },
      { name: "Problem Solving", confidence: 92, category: "soft" as const },
      { name: "Team Collaboration", confidence: 86, category: "soft" as const },
    ],
    inferred: [
      { name: "Agile Methodologies", confidence: 75, category: "inferred" as const },
      { name: "API Design", confidence: 80, category: "inferred" as const },
      { name: "Cloud Architecture", confidence: 72, category: "inferred" as const },
    ],
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-heading font-semibold">SkillSense</span>
          </div>
          
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="rounded-2xl border-2"
              onClick={() => navigate("/profile")}
            >
              <User className="w-4 h-4 mr-2" />
              View Profile
            </Button>
            <Button
              className="gradient-primary text-primary-foreground rounded-2xl hover-glow"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Skills */}
          <div className="lg:col-span-8 space-y-8">
            {/* Hard Skills */}
            <GlassCard className="animate-fade-in">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
                  <Award className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-semibold">Hard Skills</h2>
              </div>
              <div className="space-y-4">
                {mockSkills.hard.map((skill, index) => (
                  <SkillProgressBar
                    key={skill.name}
                    skill={skill.name}
                    confidence={skill.confidence}
                    category={skill.category}
                    delay={index * 100}
                  />
                ))}
              </div>
            </GlassCard>

            {/* Soft Skills */}
            <GlassCard className="animate-fade-in" style={{ animationDelay: "150ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center">
                  <User className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-2xl font-heading font-semibold">Soft Skills</h2>
              </div>
              <div className="space-y-4">
                {mockSkills.soft.map((skill, index) => (
                  <SkillProgressBar
                    key={skill.name}
                    skill={skill.name}
                    confidence={skill.confidence}
                    category={skill.category}
                    delay={index * 100}
                  />
                ))}
              </div>
            </GlassCard>

            {/* Inferred Skills */}
            <GlassCard className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-2xl bg-secondary border-2 border-border flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-secondary-foreground" />
                </div>
                <h2 className="text-2xl font-heading font-semibold">Inferred Skills</h2>
              </div>
              <div className="space-y-4">
                {mockSkills.inferred.map((skill, index) => (
                  <SkillProgressBar
                    key={skill.name}
                    skill={skill.name}
                    confidence={skill.confidence}
                    category={skill.category}
                    delay={index * 100}
                  />
                ))}
              </div>
            </GlassCard>
          </div>

          {/* Right Panel - Profile */}
          <div className="lg:col-span-4 space-y-6">
            {/* Profile Card */}
            <GlassCard className="animate-scale-in text-center space-y-6">
              <Avatar className="w-24 h-24 mx-auto border-4 border-primary/20">
                <AvatarFallback className="text-2xl font-semibold gradient-primary text-white">
                  JD
                </AvatarFallback>
              </Avatar>

              <div>
                <h3 className="text-2xl font-heading font-bold mb-2">John Doe</h3>
                <p className="text-muted-foreground">Senior Software Engineer</p>
              </div>

              <div className="pt-4 border-t border-border space-y-3 text-left">
                <div className="flex items-center gap-3">
                  <Briefcase className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">5+ years experience</span>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-muted-foreground" />
                  <span className="text-sm">14 skills identified</span>
                </div>
              </div>

              <Button
                onClick={() => navigate("/profile")}
                className="w-full gradient-primary text-primary-foreground rounded-2xl h-12 font-semibold hover-glow"
              >
                View Full Profile
              </Button>
            </GlassCard>

            {/* Quick Actions */}
            <GlassCard className="animate-fade-in space-y-4" style={{ animationDelay: "200ms" }}>
              <h3 className="font-heading font-semibold text-lg">Quick Actions</h3>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl h-12 border-2"
                >
                  <Download className="w-4 h-4 mr-3" />
                  Download Report
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start rounded-2xl h-12 border-2"
                >
                  <Share2 className="w-4 h-4 mr-3" />
                  Share Results
                </Button>
              </div>
            </GlassCard>

            {/* Stats */}
            <GlassCard className="animate-fade-in" style={{ animationDelay: "300ms" }}>
              <h3 className="font-heading font-semibold text-lg mb-4">Analysis Summary</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Confidence Score</span>
                  <span className="font-semibold text-lg">87%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Skills</span>
                  <span className="font-semibold text-lg">14</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Top Category</span>
                  <span className="font-semibold text-lg">Technical</span>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
