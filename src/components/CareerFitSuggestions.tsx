import { GlassCard } from "@/components/GlassCard";
import { Briefcase, TrendingUp, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface CareerMatch {
  title: string;
  matchScore: number;
  industry: string;
  salaryRange: string;
  matchingSkills: string[];
  growthPotential: 'high' | 'medium' | 'low';
}

interface CareerFitSuggestionsProps {
  suggestions: CareerMatch[];
}

export const CareerFitSuggestions = ({ suggestions }: CareerFitSuggestionsProps) => {
  const getGrowthColor = (potential: string) => {
    switch (potential) {
      case 'high':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low':
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default:
        return '';
    }
  };

  return (
    <GlassCard className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Target className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-semibold">Career Fit</h2>
          <p className="text-sm text-muted-foreground">Roles aligned with your skills</p>
        </div>
      </div>

      <div className="space-y-4">
        {suggestions.map((career, idx) => (
          <div
            key={idx}
            className="p-5 rounded-xl bg-background/40 border border-border/50 hover:bg-background/60 transition-all animate-scale-in cursor-pointer group"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Briefcase className="w-5 h-5 text-primary" />
                  <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                    {career.title}
                  </h3>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{career.industry}</span>
                  <span>•</span>
                  <span>{career.salaryRange}</span>
                </div>
              </div>
              <Badge className={cn("text-xs flex items-center gap-1", getGrowthColor(career.growthPotential))}>
                <TrendingUp className="w-3 h-3" />
                {career.growthPotential.toUpperCase()} GROWTH
              </Badge>
            </div>

            {/* Match Score */}
            <div className="mb-3">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Match Score</span>
                <span className="font-bold text-primary">{career.matchScore}%</span>
              </div>
              <Progress value={career.matchScore} className="h-2" />
            </div>

            {/* Matching Skills */}
            <div>
              <p className="text-xs text-muted-foreground mb-2">Matching Skills:</p>
              <div className="flex flex-wrap gap-2">
                {career.matchingSkills.map((skill, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className="text-xs bg-primary/5"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </GlassCard>
  );
};
