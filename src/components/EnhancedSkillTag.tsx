import { Badge } from "@/components/ui/badge";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Progress } from "@/components/ui/progress";
import { Sparkles, FileText, Award, Clock, CheckCircle2, Pencil } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Evidence {
  id: string;
  source: {
    type: 'experience' | 'education' | 'project' | 'certification';
    section: string;
    text: string;
  };
  confidenceContribution: number;
  keywords: string[];
}

interface EnhancedSkillTagProps {
  skill: string;
  category: "hard" | "soft" | "inferred";
  confidence: number;
  evidence?: Evidence[];
  onEdit?: (newValue: string) => void;
  onConfirm?: () => void;
  isConfirmed?: boolean;
}

export const EnhancedSkillTag = ({ 
  skill, 
  category, 
  confidence, 
  evidence = [],
  onEdit,
  onConfirm,
  isConfirmed = false
}: EnhancedSkillTagProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(skill);
  const { toast } = useToast();

  const categoryStyles = {
    hard: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
    soft: "bg-accent/10 text-accent-foreground border-accent/20 hover:bg-accent/20",
    inferred: "bg-muted text-muted-foreground border-border hover:bg-muted/80",
  };

  const sourceIcons = {
    experience: Sparkles,
    education: Award,
    project: FileText,
    certification: CheckCircle2,
  };

  const handleSave = () => {
    if (editValue.trim() && editValue !== skill) {
      onEdit?.(editValue.trim());
      toast({
        title: "Skill updated",
        description: `Updated "${skill}" to "${editValue.trim()}"`,
      });
      
      // Track analytics event
      trackSkillEdit(skill, editValue.trim());
    }
    setIsEditing(false);
  };

  const handleConfirm = () => {
    onConfirm?.();
    toast({
      title: "Skill confirmed",
      description: `Confirmed "${skill}" as accurate`,
    });
    
    // Track analytics event
    trackSkillConfirmation(skill);
  };

  const trackSkillEdit = (oldValue: string, newValue: string) => {
    // Analytics tracking - would integrate with backend
    console.log('Analytics: Skill edited', { oldValue, newValue, timestamp: Date.now() });
  };

  const trackSkillConfirmation = (skillName: string) => {
    // Analytics tracking - would integrate with backend
    console.log('Analytics: Skill confirmed', { skillName, timestamp: Date.now() });
  };

  if (isEditing) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-primary bg-background">
        <Input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') setIsEditing(false);
          }}
          className="h-6 w-32 px-2 text-sm border-0 focus-visible:ring-0"
          autoFocus
        />
        <Button size="sm" onClick={handleSave} className="h-6 px-2 text-xs">
          Save
        </Button>
      </div>
    );
  }

  return (
    <HoverCard openDelay={200}>
      <HoverCardTrigger asChild>
        <Badge
          className={cn(
            "px-4 py-2 text-sm font-medium border-2 transition-all cursor-pointer hover:scale-105 group relative",
            categoryStyles[category],
            isConfirmed && "ring-2 ring-green-500/50"
          )}
        >
          {skill}
          {isConfirmed && (
            <CheckCircle2 className="w-3 h-3 ml-1 text-green-500 inline" />
          )}
          <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="h-5 w-5 p-0 rounded-full bg-background border"
            >
              <Pencil className="w-3 h-3" />
            </Button>
          </div>
        </Badge>
      </HoverCardTrigger>
      <HoverCardContent className="w-96" side="top">
        <div className="space-y-4">
          {/* Confidence Score */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-sm">Confidence Score</h4>
              <span className="text-lg font-bold text-primary">{confidence}%</span>
            </div>
            <Progress value={confidence} className="h-2" />
            <p className="text-xs text-muted-foreground mt-1">
              Based on {evidence.length} evidence source{evidence.length !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Evidence */}
          {evidence.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold mb-2 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Evidence Found
              </h5>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {evidence.map((e) => {
                  const SourceIcon = sourceIcons[e.source.type];
                  return (
                    <div key={e.id} className="text-xs p-2 bg-muted/50 rounded-lg border border-border">
                      <div className="flex items-center gap-2 mb-1">
                        <SourceIcon className="w-3 h-3 text-primary" />
                        <span className="font-medium capitalize">{e.source.type}</span>
                        <span className="ml-auto text-primary font-semibold">
                          +{e.confidenceContribution}%
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-1">{e.source.section}</p>
                      <p className="italic">"{e.source.text}"</p>
                      {e.keywords.length > 0 && (
                        <div className="flex gap-1 mt-1 flex-wrap">
                          {e.keywords.map((keyword, i) => (
                            <span key={i} className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[10px]">
                              {keyword}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t">
            {!isConfirmed && (
              <Button
                size="sm"
                variant="outline"
                onClick={handleConfirm}
                className="flex-1 text-xs"
              >
                <CheckCircle2 className="w-3 h-3 mr-1" />
                Confirm
              </Button>
            )}
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsEditing(true)}
              className="flex-1 text-xs"
            >
              <Pencil className="w-3 h-3 mr-1" />
              Edit
            </Button>
          </div>

          {/* Last Updated */}
          <div className="flex items-center gap-1 text-[10px] text-muted-foreground pt-2 border-t">
            <Clock className="w-3 h-3" />
            <span>Last analyzed: Just now</span>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
