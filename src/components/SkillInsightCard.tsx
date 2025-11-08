import { GlassCard } from "@/components/GlassCard";
import { Badge } from "@/components/ui/badge";
import { FileText, Linkedin, FolderGit2, CheckCircle2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface SkillSource {
  type: 'cv' | 'linkedin' | 'project' | 'certification';
  text: string;
  confidence: number;
}

interface SkillInsightCardProps {
  skill: string;
  category: "hard" | "soft" | "inferred";
  confidence: number;
  sources: SkillSource[];
  onConfirm?: () => void;
  onEdit?: () => void;
  onRemove?: () => void;
}

export const SkillInsightCard = ({
  skill,
  category,
  confidence,
  sources,
  onConfirm,
  onEdit,
  onRemove
}: SkillInsightCardProps) => {
  const [isValidated, setIsValidated] = useState(false);
  const { toast } = useToast();

  const sourceIcons = {
    cv: FileText,
    linkedin: Linkedin,
    project: FolderGit2,
    certification: CheckCircle2,
  };

  const handleConfirm = () => {
    setIsValidated(true);
    onConfirm?.();
    toast({
      title: "Skill validated",
      description: `"${skill}" has been confirmed and will improve AI accuracy`,
    });
  };

  const handleRemove = () => {
    onRemove?.();
    toast({
      title: "Skill removed",
      description: `"${skill}" has been removed from your profile`,
      variant: "destructive",
    });
  };

  return (
    <GlassCard className="animate-scale-in relative overflow-hidden">
      {isValidated && (
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-green-500/20 to-transparent rounded-bl-[100px]" />
      )}
      
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <h3 className="text-xl font-semibold">{skill}</h3>
              {isValidated && (
                <CheckCircle2 className="w-5 h-5 text-green-500 animate-scale-in" />
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">
                {category.toUpperCase()}
              </Badge>
              <span className="text-sm text-muted-foreground">
                {confidence}% confidence
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            {!isValidated && (
              <Button
                size="sm"
                variant="ghost"
                onClick={handleConfirm}
                className="hover:bg-green-500/10 hover:text-green-600 transition-all"
              >
                <CheckCircle2 className="w-4 h-4 mr-1" />
                Confirm
              </Button>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={handleRemove}
              className="hover:bg-red-500/10 hover:text-red-600 transition-all"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Sources */}
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Detected from:
          </p>
          <div className="space-y-2">
            {sources.map((source, idx) => {
              const Icon = sourceIcons[source.type];
              return (
                <div
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-secondary/30 border border-border/50 animate-fade-in"
                  style={{ animationDelay: `${idx * 100}ms` }}
                >
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium capitalize mb-1">
                      {source.type}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      "{source.text}"
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="flex-1 h-1 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary transition-all duration-1000"
                          style={{ width: `${source.confidence}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-muted-foreground">
                        +{source.confidence}%
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </GlassCard>
  );
};
