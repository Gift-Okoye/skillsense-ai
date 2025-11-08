import { GlassCard } from "@/components/GlassCard";
import { TrendingUp, Briefcase, GraduationCap, Sparkles } from "lucide-react";

export const AIRecommendations = () => {
  const recommendations = [
    {
      icon: TrendingUp,
      title: "Skill Gap Analysis",
      description: "Your TypeScript skills are strong, but consider learning GraphQL to complement your API design experience."
    },
    {
      icon: Briefcase,
      title: "Career Path",
      description: "Based on your profile, you're on track for a Tech Lead or Engineering Manager role within 2 years."
    },
    {
      icon: GraduationCap,
      title: "Learning Priority",
      description: "Focus on System Design and Cloud Architecture to match 95% of senior roles in your target companies."
    }
  ];

  return (
    <GlassCard className="animate-fade-in" style={{ animationDelay: "350ms" }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
          <Sparkles className="w-5 h-5 text-white" />
        </div>
        <h2 className="text-2xl font-heading font-semibold">AI Recommendations</h2>
      </div>
      
      <div className="space-y-4">
        {recommendations.map((rec, idx) => (
          <div
            key={idx}
            className="bg-accent/10 border border-accent/20 rounded-2xl p-4 space-y-2 hover:bg-accent/15 transition-all"
          >
            <div className="flex items-center gap-2">
              <rec.icon className="w-5 h-5 text-accent" />
              <h4 className="font-semibold">{rec.title}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{rec.description}</p>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
