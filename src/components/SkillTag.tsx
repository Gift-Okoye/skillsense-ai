import { cn } from "@/lib/utils";

interface SkillTagProps {
  skill: string;
  category?: "hard" | "soft" | "inferred";
  confidence?: number;
  className?: string;
}

export const SkillTag = ({ skill, category = "hard", confidence, className }: SkillTagProps) => {
  const categoryColors = {
    hard: "bg-primary/10 text-primary border-primary/20",
    soft: "bg-accent/10 text-accent border-accent/20",
    inferred: "bg-secondary text-secondary-foreground border-border",
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-4 py-2 rounded-full border transition-smooth hover:scale-105",
        categoryColors[category],
        className
      )}
    >
      <span className="text-sm font-medium">{skill}</span>
      {confidence && (
        <span className="text-xs opacity-70">{Math.round(confidence)}%</span>
      )}
    </div>
  );
};
