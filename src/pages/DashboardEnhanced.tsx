import { GlassCard } from "@/components/GlassCard";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SkillInsightCard } from "@/components/SkillInsightCard";
import { GrowthTracker } from "@/components/GrowthTracker";
import { LearningRecommendations } from "@/components/LearningRecommendations";
import { CareerFitSuggestions } from "@/components/CareerFitSuggestions";
import { AchievementsBadges } from "@/components/AchievementsBadges";
import { FeedbackPrompt } from "@/components/FeedbackPrompt";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "@/assets/skillsense-logo.png";

const DashboardEnhanced = () => {
  const navigate = useNavigate();

  // Mock data for demonstrations
  const skillWithSources = {
    skill: "React.js",
    category: "hard" as const,
    confidence: 95,
    sources: [
      {
        type: 'cv' as const,
        text: "5 years of experience building scalable React applications",
        confidence: 40
      },
      {
        type: 'project' as const,
        text: "Built e-commerce platform serving 100k+ users with React and Redux",
        confidence: 30
      },
      {
        type: 'linkedin' as const,
        text: "React Developer at Tech Corp - Led frontend team",
        confidence: 15
      },
      {
        type: 'certification' as const,
        text: "React Advanced Patterns - Udemy Certificate 2023",
        confidence: 10
      }
    ]
  };

  const growthTrends = [
    { skill: "React.js", current: 95, previous: 85, change: 10, trend: 'up' as const },
    { skill: "TypeScript", current: 88, previous: 80, change: 8, trend: 'up' as const },
    { skill: "Node.js", current: 85, previous: 85, change: 0, trend: 'stable' as const },
    { skill: "Python", current: 78, previous: 82, change: -4, trend: 'down' as const },
  ];

  const learningCourses = [
    {
      title: "Advanced React Patterns",
      provider: "Frontend Masters",
      duration: "8 hours",
      rating: 4.9,
      skillMatch: "React.js",
      url: "https://frontendmasters.com",
      isPremium: true
    },
    {
      title: "Python for Data Science",
      provider: "Coursera",
      duration: "40 hours",
      rating: 4.7,
      skillMatch: "Python",
      url: "https://coursera.org",
      isPremium: false
    },
    {
      title: "System Design Interview",
      provider: "Educative",
      duration: "12 hours",
      rating: 4.8,
      skillMatch: "Cloud Architecture",
      url: "https://educative.io",
      isPremium: true
    }
  ];

  const careerMatches = [
    {
      title: "Senior Frontend Developer",
      matchScore: 92,
      industry: "Technology",
      salaryRange: "$120k - $160k",
      matchingSkills: ["React.js", "TypeScript", "Node.js"],
      growthPotential: 'high' as const
    },
    {
      title: "Full Stack Engineer",
      matchScore: 85,
      industry: "Fintech",
      salaryRange: "$130k - $180k",
      matchingSkills: ["React.js", "Node.js", "SQL"],
      growthPotential: 'high' as const
    },
    {
      title: "Technical Lead",
      matchScore: 78,
      industry: "E-commerce",
      salaryRange: "$150k - $200k",
      matchingSkills: ["Leadership", "React.js", "Team Collaboration"],
      growthPotential: 'medium' as const
    }
  ];

  const achievements = [
    {
      id: "skill-master",
      title: "Skill Master",
      description: "Reached 90%+ confidence in 5 skills",
      icon: 'trophy' as const,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      unlocked: true
    },
    {
      id: "validation-hero",
      title: "Validation Hero",
      description: "Confirmed 10 AI-detected skills",
      icon: 'award' as const,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      unlocked: true
    },
    {
      id: "growth-champion",
      title: "Growth Champion",
      description: "Improved a skill by 20% or more",
      icon: 'zap' as const,
      color: "bg-gradient-to-br from-blue-500 to-indigo-500",
      unlocked: false,
      progress: 15,
      maxProgress: 20
    },
    {
      id: "learning-path",
      title: "Learning Path",
      description: "Completed 3 recommended courses",
      icon: 'star' as const,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      unlocked: false,
      progress: 1,
      maxProgress: 3
    },
    {
      id: "career-ready",
      title: "Career Ready",
      description: "90%+ match with target role",
      icon: 'target' as const,
      color: "bg-gradient-to-br from-red-500 to-pink-500",
      unlocked: false,
      progress: 85,
      maxProgress: 90
    },
    {
      id: "ai-trainer",
      title: "AI Trainer",
      description: "Provided feedback on 20 insights",
      icon: 'crown' as const,
      color: "bg-gradient-to-br from-indigo-500 to-purple-500",
      unlocked: false,
      progress: 8,
      maxProgress: 20
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background relative">
      {/* Ambient glow effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--accent)/0.1),transparent_70%)] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/dashboard")}
              className="rounded-2xl hover:bg-secondary hover:text-foreground"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Button>
            <img 
              src={logo} 
              alt="SkillSense Logo" 
              className="h-10 w-auto"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-heading font-bold">Enhanced Dashboard</h1>
              <p className="text-sm text-muted-foreground">Modern UX Features Demo</p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        {/* Main Content Grid */}
        <div className="space-y-8">
          {/* Row 1: Skill Insights */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>🔍</span> AI Skill Insights
              </h2>
              <SkillInsightCard {...skillWithSources} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>💬</span> Feedback Loop
              </h2>
              <FeedbackPrompt skillName="React.js" insightType="skill_detection" />
            </div>
          </div>

          {/* Row 2: Growth & Learning */}
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>📈</span> Growth Tracker
              </h2>
              <GrowthTracker trends={growthTrends} />
            </div>
            <div>
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span>📚</span> Learning Recommendations
              </h2>
              <LearningRecommendations recommendations={learningCourses} />
            </div>
          </div>

          {/* Row 3: Career Fit */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>💼</span> Career Fit Suggestions
            </h2>
            <CareerFitSuggestions suggestions={careerMatches} />
          </div>

          {/* Row 4: Achievements */}
          <div>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <span>🏆</span> Gamified Achievements
            </h2>
            <AchievementsBadges achievements={achievements} />
          </div>

          {/* Feature Summary Card */}
          <GlassCard className="animate-fade-in">
            <div className="text-center space-y-4 py-4">
              <h2 className="text-2xl font-heading font-bold">
                ✨ Apple-like UX Excellence
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                This enhanced dashboard showcases modern, intuitive, and playful UX features
                with minimal friction, subtle animations, and meaningful transitions.
                Every interaction is designed to build trust through AI transparency and
                human-AI collaboration.
              </p>
              <div className="flex flex-wrap gap-3 justify-center pt-4">
                <span className="px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                  Minimal Friction
                </span>
                <span className="px-4 py-2 rounded-full bg-green-500/10 text-green-600 text-sm font-medium">
                  Subtle Animations
                </span>
                <span className="px-4 py-2 rounded-full bg-blue-500/10 text-blue-600 text-sm font-medium">
                  AI Transparency
                </span>
                <span className="px-4 py-2 rounded-full bg-purple-500/10 text-purple-600 text-sm font-medium">
                  Trustworthy
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardEnhanced;
