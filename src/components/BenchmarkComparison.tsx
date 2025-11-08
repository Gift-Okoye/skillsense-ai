import { GlassCard } from "@/components/GlassCard";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface BenchmarkData {
  skillName: string;
  userLevel: number;
  marketAverage: number;
  marketDemand: 'high' | 'medium' | 'low';
  percentile: number;
  salaryImpact: string;
}

interface BenchmarkComparisonProps {
  data: BenchmarkData[];
}

export const BenchmarkComparison = ({ data }: BenchmarkComparisonProps) => {
  const getDemandColor = (demand: string) => {
    switch (demand) {
      case 'high':
        return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'low':
        return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getComparisonIcon = (userLevel: number, marketAverage: number) => {
    const diff = userLevel - marketAverage;
    if (diff > 5) return <TrendingUp className="w-4 h-4 text-green-500" />;
    if (diff < -5) return <TrendingDown className="w-4 h-4 text-red-500" />;
    return <Minus className="w-4 h-4 text-muted-foreground" />;
  };

  return (
    <GlassCard className="animate-fade-in">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
          <Award className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-2xl font-heading font-semibold">Market Benchmark</h2>
          <p className="text-sm text-muted-foreground">Compare your skills to industry standards</p>
        </div>
      </div>

      <div className="space-y-4">
        {data.map((item, index) => {
          const difference = item.userLevel - item.marketAverage;
          const absDiff = Math.abs(difference);
          
          return (
            <div
              key={item.skillName}
              className="p-4 rounded-xl border border-border bg-background/50 hover:bg-background transition-colors"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold">{item.skillName}</h3>
                    {getComparisonIcon(item.userLevel, item.marketAverage)}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span>Top {item.percentile}%</span>
                    <span>•</span>
                    <span>{item.salaryImpact}</span>
                  </div>
                </div>
                <Badge className={cn("text-xs", getDemandColor(item.marketDemand))}>
                  {item.marketDemand.toUpperCase()} DEMAND
                </Badge>
              </div>

              <div className="space-y-2">
                {/* Your Level */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Your Level</span>
                    <span className="font-semibold text-primary">{item.userLevel}%</span>
                  </div>
                  <Progress value={item.userLevel} className="h-2" />
                </div>

                {/* Market Average */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">Market Average</span>
                    <span className="font-semibold">{item.marketAverage}%</span>
                  </div>
                  <Progress value={item.marketAverage} className="h-2 bg-muted" />
                </div>
              </div>

              {/* Comparison */}
              <div className="mt-3 pt-3 border-t border-border">
                <p className={cn(
                  "text-xs font-medium",
                  difference > 0 ? "text-green-600" : difference < 0 ? "text-red-600" : "text-muted-foreground"
                )}>
                  {difference > 0 && `↗ ${absDiff}% above market average`}
                  {difference < 0 && `↘ ${absDiff}% below market average`}
                  {difference === 0 && `→ At market average`}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
        <p className="text-xs text-muted-foreground">
          <span className="font-semibold text-foreground">💡 Insight:</span> Benchmark data sourced from O*NET and ESCO 
          databases, comparing against {data.length} industry-standard skill requirements. 
          Updated monthly to reflect current market trends.
        </p>
      </div>
    </GlassCard>
  );
};
