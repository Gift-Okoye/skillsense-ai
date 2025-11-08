import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface SkillProgressBarProps {
  skill: string;
  confidence: number;
  category?: "hard" | "soft" | "inferred";
  delay?: number;
}

export const SkillProgressBar = ({ 
  skill, 
  confidence, 
  category = "hard",
  delay = 0 
}: SkillProgressBarProps) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidth(confidence);
    }, delay);
    return () => clearTimeout(timer);
  }, [confidence, delay]);

  const categoryColors = {
    hard: "bg-primary",
    soft: "bg-accent",
    inferred: "bg-muted-foreground/50",
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="font-medium text-foreground">{skill}</span>
        <span className="text-muted-foreground">{Math.round(confidence)}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-1000 ease-out",
            categoryColors[category]
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
};
