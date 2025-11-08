import { GlassCard } from "@/components/GlassCard";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface SkillTrend {
  skill: string;
  current: number;
  previous: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
}

interface GrowthTrackerProps {
  trends: SkillTrend[];
}

export const GrowthTracker = ({ trends }: GrowthTrackerProps) => {
  return (
    <GlassCard className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-500 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-semibold">Growth Tracker</h2>
          <p className="text-sm text-muted-foreground">Your skill progress over time</p>
        </div>
      </div>

      <div className="space-y-4">
        {trends.map((trend, idx) => (
          <div
            key={trend.skill}
            className="p-4 rounded-xl bg-background/40 border border-border/50 animate-scale-in hover:bg-background/60 transition-all"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <h3 className="font-semibold">{trend.skill}</h3>
                {trend.trend === 'up' && (
                  <div className="flex items-center gap-1 text-green-500">
                    <TrendingUp className="w-4 h-4" />
                    <span className="text-sm font-medium">+{trend.change}%</span>
                  </div>
                )}
                {trend.trend === 'down' && (
                  <div className="flex items-center gap-1 text-red-500">
                    <TrendingDown className="w-4 h-4" />
                    <span className="text-sm font-medium">{trend.change}%</span>
                  </div>
                )}
                {trend.trend === 'stable' && (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-sm font-medium">Stable</span>
                  </div>
                )}
              </div>
              <span className="text-lg font-bold text-primary">{trend.current}%</span>
            </div>

            {/* Progress bars comparison */}
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Current</span>
                </div>
                <Progress value={trend.current} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Previous</span>
                </div>
                <Progress value={trend.previous} className="h-1.5 opacity-50" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
        <div className="flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">Keep it up!</span> You've shown 
            improvement in {trends.filter(t => t.trend === 'up').length} skills this month.
          </p>
        </div>
      </div>
    </GlassCard>
  );
};
