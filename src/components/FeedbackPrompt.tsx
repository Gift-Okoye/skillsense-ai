import { GlassCard } from "@/components/GlassCard";
import { MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface FeedbackPromptProps {
  skillName?: string;
  insightType: string;
}

export const FeedbackPrompt = ({ skillName, insightType }: FeedbackPromptProps) => {
  const [feedback, setFeedback] = useState<'positive' | 'negative' | null>(null);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = () => {
    if (feedback) {
      // Send feedback to backend
      console.log('Feedback submitted:', { skillName, insightType, feedback, comment });
      
      setIsSubmitted(true);
      toast({
        title: "Thank you for your feedback!",
        description: "Your input helps improve our AI accuracy",
      });

      // Reset after animation
      setTimeout(() => {
        setIsSubmitted(false);
        setFeedback(null);
        setComment("");
      }, 3000);
    }
  };

  if (isSubmitted) {
    return (
      <GlassCard className="animate-scale-in">
        <div className="flex items-center gap-3 text-green-600 justify-center py-4">
          <ThumbsUp className="w-6 h-6" />
          <p className="font-semibold">Feedback received!</p>
        </div>
      </GlassCard>
    );
  }

  return (
    <GlassCard className="animate-fade-in">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold">Was this insight accurate?</h3>
            <p className="text-sm text-muted-foreground">
              {skillName ? `About "${skillName}"` : 'Help us improve'}
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant={feedback === 'positive' ? 'default' : 'outline'}
            className="flex-1 rounded-2xl h-12 transition-all"
            onClick={() => setFeedback('positive')}
          >
            <ThumbsUp className="w-4 h-4 mr-2" />
            Yes, accurate
          </Button>
          <Button
            variant={feedback === 'negative' ? 'default' : 'outline'}
            className="flex-1 rounded-2xl h-12 transition-all"
            onClick={() => setFeedback('negative')}
          >
            <ThumbsDown className="w-4 h-4 mr-2" />
            Not quite
          </Button>
        </div>

        {feedback && (
          <div className="space-y-3 animate-fade-in">
            <Textarea
              placeholder="Tell us more (optional)..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="resize-none rounded-2xl min-h-[80px]"
            />
            <Button
              onClick={handleSubmit}
              className="w-full rounded-2xl gradient-primary text-primary-foreground"
            >
              Submit Feedback
            </Button>
          </div>
        )}
      </div>
    </GlassCard>
  );
};
