import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { SkillTag } from "@/components/SkillTag";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Share2, Sparkles, Mail, MapPin, Award } from "lucide-react";

const Profile = () => {
  const navigate = useNavigate();

  const allSkills = [
    { name: "React.js", category: "hard" as const, confidence: 95 },
    { name: "TypeScript", category: "hard" as const, confidence: 88 },
    { name: "Node.js", category: "hard" as const, confidence: 85 },
    { name: "Leadership", category: "soft" as const, confidence: 90 },
    { name: "Communication", category: "soft" as const, confidence: 88 },
    { name: "Problem Solving", category: "soft" as const, confidence: 92 },
    { name: "Python", category: "hard" as const, confidence: 78 },
    { name: "SQL", category: "hard" as const, confidence: 82 },
    { name: "Team Collaboration", category: "soft" as const, confidence: 86 },
    { name: "Agile Methodologies", category: "inferred" as const, confidence: 75 },
    { name: "API Design", category: "inferred" as const, confidence: 80 },
    { name: "Cloud Architecture", category: "inferred" as const, confidence: 72 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="rounded-2xl hover:bg-secondary"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-heading font-semibold">SkillSense</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button variant="outline" className="rounded-2xl border-2">
              <Download className="w-4 h-4 mr-2" />
              Download
            </Button>
            <Button className="gradient-primary text-primary-foreground rounded-2xl hover-glow">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section */}
          <GlassCard className="relative overflow-hidden animate-fade-in">
            {/* Background gradient */}
            <div className="absolute top-0 left-0 right-0 h-32 gradient-primary opacity-10" />
            
            <div className="relative pt-8">
              <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
                <Avatar className="w-32 h-32 border-4 border-background shadow-lg">
                  <AvatarFallback className="text-4xl font-bold gradient-primary text-white">
                    JD
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-4">
                  <div>
                    <h1 className="text-4xl font-heading font-bold mb-2">John Doe</h1>
                    <p className="text-xl text-muted-foreground">Senior Software Engineer</p>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span>john.doe@email.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>87% Overall Confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* AI Summary */}
          <GlassCard className="animate-fade-in" style={{ animationDelay: "150ms" }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-heading font-semibold">AI-Generated Summary</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              An accomplished software engineer with over 5 years of experience in full-stack development. 
              Demonstrates strong technical proficiency in modern web technologies including React, TypeScript, 
              and Node.js. Known for exceptional problem-solving abilities and leadership skills. Has proven 
              experience in agile methodologies and cloud architecture, with a track record of delivering 
              high-quality solutions in collaborative team environments.
            </p>
          </GlassCard>

          {/* Skills */}
          <GlassCard className="animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h2 className="text-2xl font-heading font-semibold mb-6">Skills Portfolio</h2>
            
            <div className="space-y-8">
              {/* Hard Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {allSkills
                    .filter((s) => s.category === "hard")
                    .map((skill) => (
                      <SkillTag
                        key={skill.name}
                        skill={skill.name}
                        category={skill.category}
                        confidence={skill.confidence}
                      />
                    ))}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {allSkills
                    .filter((s) => s.category === "soft")
                    .map((skill) => (
                      <SkillTag
                        key={skill.name}
                        skill={skill.name}
                        category={skill.category}
                        confidence={skill.confidence}
                      />
                    ))}
                </div>
              </div>

              {/* Inferred Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  Inferred Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {allSkills
                    .filter((s) => s.category === "inferred")
                    .map((skill) => (
                      <SkillTag
                        key={skill.name}
                        skill={skill.name}
                        category={skill.category}
                        confidence={skill.confidence}
                      />
                    ))}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Footer */}
          <div className="text-center py-8 text-sm text-muted-foreground">
            <p>Profile generated by SkillSense AI • Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
