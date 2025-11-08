import { GlassCard } from "@/components/GlassCard";
import { Award, Zap, Trophy, Star, Target, Crown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: 'award' | 'zap' | 'trophy' | 'star' | 'target' | 'crown';
  color: string;
  unlocked: boolean;
  progress?: number;
  maxProgress?: number;
}

interface AchievementsBadgesProps {
  achievements: Achievement[];
}

export const AchievementsBadges = ({ achievements }: AchievementsBadgesProps) => {
  const iconMap = {
    award: Award,
    zap: Zap,
    trophy: Trophy,
    star: Star,
    target: Target,
    crown: Crown,
  };

  return (
    <GlassCard className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">
          <Trophy className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-semibold">Achievements</h2>
          <p className="text-sm text-muted-foreground">
            {achievements.filter(a => a.unlocked).length} of {achievements.length} unlocked
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {achievements.map((achievement, idx) => {
          const Icon = iconMap[achievement.icon];
          return (
            <div
              key={achievement.id}
              className={cn(
                "relative p-4 rounded-2xl border transition-all animate-scale-in",
                achievement.unlocked
                  ? "bg-background/60 border-border/50 hover:bg-background/80 cursor-pointer hover:scale-105"
                  : "bg-background/20 border-border/30 opacity-50 grayscale"
              )}
              style={{ animationDelay: `${idx * 50}ms` }}
            >
              {achievement.unlocked && (
                <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center animate-scale-in">
                  <Star className="w-3 h-3 text-white fill-white" />
                </div>
              )}

              <div
                className={cn(
                  "w-12 h-12 rounded-2xl flex items-center justify-center mb-3 mx-auto",
                  achievement.unlocked
                    ? achievement.color
                    : "bg-muted"
                )}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>

              <div className="text-center">
                <h3 className="font-semibold text-sm mb-1">{achievement.title}</h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {achievement.description}
                </p>

                {!achievement.unlocked && achievement.progress !== undefined && (
                  <div className="mt-3">
                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary transition-all duration-300"
                        style={{ width: `${(achievement.progress / (achievement.maxProgress || 1)) * 100}%` }}
                      />
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-1">
                      {achievement.progress}/{achievement.maxProgress}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </GlassCard>
  );
};
