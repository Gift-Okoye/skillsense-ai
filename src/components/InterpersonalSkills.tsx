import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface Skill {
  name: string;
  rating: number; // 1-5 stars
}

interface InterpersonalSkillsProps {
  skills: Skill[];
  className?: string;
}

export const InterpersonalSkills = ({ skills, className }: InterpersonalSkillsProps) => {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 transition-smooth hover:scale-105"
        >
          <span className="text-sm font-medium text-foreground uppercase">
            {skill.name}
          </span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={cn(
                  "w-3 h-3",
                  star <= skill.rating
                    ? "fill-foreground text-foreground"
                    : "text-muted-foreground"
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
