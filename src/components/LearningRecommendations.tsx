import { GlassCard } from "@/components/GlassCard";
import { BookOpen, ExternalLink, Clock, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface Course {
  title: string;
  provider: string;
  duration: string;
  rating: number;
  skillMatch: string;
  url: string;
  isPremium: boolean;
}

interface LearningRecommendationsProps {
  recommendations: Course[];
}

export const LearningRecommendations = ({ recommendations }: LearningRecommendationsProps) => {
  return (
    <GlassCard className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center">
          <BookOpen className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-semibold">Learning Recommendations</h2>
          <p className="text-sm text-muted-foreground">Boost your skills with these courses</p>
        </div>
      </div>

      <div className="space-y-4">
        {recommendations.map((course, idx) => (
          <div
            key={idx}
            className="group p-4 rounded-xl bg-background/40 border border-border/50 hover:bg-background/60 transition-all animate-scale-in"
            style={{ animationDelay: `${idx * 50}ms` }}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-semibold line-clamp-1 group-hover:text-primary transition-colors">
                    {course.title}
                  </h3>
                  {course.isPremium && (
                    <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs">
                      PRO
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span>{course.provider}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {course.duration}
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 fill-yellow-500 text-yellow-500" />
                    {course.rating}
                  </div>
                </div>

                <Badge variant="outline" className="text-xs">
                  For improving: {course.skillMatch}
                </Badge>
              </div>

              <Button
                size="sm"
                variant="ghost"
                className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => window.open(course.url, '_blank')}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>

      <Button variant="outline" className="w-full mt-4 rounded-2xl">
        View All Recommendations
      </Button>
    </GlassCard>
  );
};
