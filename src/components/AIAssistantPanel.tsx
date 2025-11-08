import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/GlassCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Send, 
  Plus, 
  Briefcase, 
  GraduationCap, 
  TrendingUp,
  ExternalLink,
  Bot,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface AIAssistantPanelProps {
  onClose?: () => void;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  postedDate: string;
  applied: boolean;
}

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: string;
  skillMatch: string[];
  rating: number;
}

export const AIAssistantPanel = ({ onClose }: AIAssistantPanelProps) => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI career assistant. I can help you add skills, find relevant jobs, recommend courses, and provide personalized career advice. What would you like to do today?"
    }
  ]);
  const [input, setInput] = useState("");
  const [newSkill, setNewSkill] = useState("");
  
  // Mock job data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior React Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$150k - $180k",
      matchScore: 95,
      postedDate: "2 days ago",
      applied: false
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$130k - $160k",
      matchScore: 88,
      postedDate: "5 days ago",
      applied: false
    },
    {
      id: "3",
      title: "Frontend Lead",
      company: "BigTech Inc",
      location: "New York, NY",
      salary: "$170k - $200k",
      matchScore: 92,
      postedDate: "1 week ago",
      applied: false
    }
  ]);

  // Mock course data
  const courses: Course[] = [
    {
      id: "1",
      title: "Advanced TypeScript Patterns",
      provider: "Frontend Masters",
      duration: "6 hours",
      level: "Advanced",
      skillMatch: ["TypeScript", "React.js"],
      rating: 4.8
    },
    {
      id: "2",
      title: "System Design for Interviews",
      provider: "Educative",
      duration: "12 hours",
      level: "Intermediate",
      skillMatch: ["Cloud Architecture", "API Design"],
      rating: 4.9
    },
    {
      id: "3",
      title: "Leadership in Tech",
      provider: "Coursera",
      duration: "4 weeks",
      level: "All Levels",
      skillMatch: ["Leadership", "Team Collaboration"],
      rating: 4.7
    }
  ];

  const recommendations = [
    {
      icon: TrendingUp,
      title: "Skill Gap Analysis",
      description: "Your TypeScript skills are strong, but consider learning GraphQL to complement your API design experience."
    },
    {
      icon: Briefcase,
      title: "Career Path",
      description: "Based on your profile, you're on track for a Tech Lead or Engineering Manager role within 2 years."
    },
    {
      icon: GraduationCap,
      title: "Learning Priority",
      description: "Focus on System Design and Cloud Architecture to match 95% of senior roles in your target companies."
    }
  ];

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: "user", content: input };
    setMessages(prev => [...prev, userMessage]);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        role: "assistant",
        content: "I understand you want help with that. Based on your current skills and career goals, I recommend focusing on strengthening your cloud architecture knowledge. Would you like me to find relevant courses or job opportunities?"
      };
      setMessages(prev => [...prev, aiResponse]);
    }, 1000);

    setInput("");
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    toast({
      title: "Skill Added",
      description: `"${newSkill}" has been added to your profile for AI analysis.`,
    });
    setNewSkill("");
  };

  const handleApplyJob = (jobId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, applied: true } : job
    ));
    toast({
      title: "Application Submitted",
      description: "Your application has been sent successfully!",
    });
  };

  const handleAutoApply = () => {
    const unappliedJobs = jobs.filter(j => !j.applied);
    setJobs(prev => prev.map(job => ({ ...job, applied: true })));
    toast({
      title: "Auto-Apply Activated",
      description: `Applied to ${unappliedJobs.length} matching positions automatically.`,
    });
  };

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur-xl border-l border-border">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-semibold">AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Your career companion</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <Tabs defaultValue="chat" className="flex-1 flex flex-col">
        <TabsList className="mx-6 mt-4 grid grid-cols-4 w-auto">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="learn">Learn</TabsTrigger>
        </TabsList>

        {/* Chat Tab */}
        <TabsContent value="chat" className="flex-1 flex flex-col m-0 p-6">
          <ScrollArea className="flex-1 pr-4 mb-4">
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-foreground"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                </div>
              ))}

              {/* Recommendations */}
              <div className="space-y-3 pt-4">
                <h3 className="text-sm font-semibold text-muted-foreground">AI Recommendations</h3>
                {recommendations.map((rec, idx) => (
                  <div
                    key={idx}
                    className="bg-accent/10 border border-accent/20 rounded-2xl p-4 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <rec.icon className="w-4 h-4 text-accent" />
                      <h4 className="font-semibold text-sm">{rec.title}</h4>
                    </div>
                    <p className="text-xs text-muted-foreground">{rec.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>

          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Ask me anything about your career..."
              className="rounded-2xl"
            />
            <Button
              onClick={handleSendMessage}
              className="rounded-2xl gradient-primary text-white"
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="flex-1 m-0 p-6">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-3 flex items-center gap-2">
                  <Plus className="w-4 h-4" />
                  Add New Skill
                </h3>
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="e.g., Docker, GraphQL, AWS..."
                    className="rounded-2xl"
                  />
                  <Button
                    onClick={handleAddSkill}
                    className="rounded-2xl gradient-primary text-white"
                  >
                    Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Add skills that AI might have missed or newly acquired skills
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Suggested Skills to Learn
                </h3>
                {[
                  { name: "GraphQL", reason: "Complements your API Design skills", demand: "High" },
                  { name: "Kubernetes", reason: "Extends Cloud Architecture knowledge", demand: "Very High" },
                  { name: "System Design", reason: "Essential for senior roles", demand: "High" }
                ].map((skill, idx) => (
                  <div
                    key={idx}
                    className="bg-muted/50 rounded-2xl p-4 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold">{skill.name}</h4>
                      <Badge variant="secondary">{skill.demand} Demand</Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">{skill.reason}</p>
                    <Button size="sm" variant="outline" className="rounded-2xl w-full">
                      Explore Courses
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="flex-1 m-0 p-6">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Matching Opportunities</h3>
                <Button
                  onClick={handleAutoApply}
                  size="sm"
                  className="rounded-2xl gradient-primary text-white"
                >
                  <Sparkles className="w-3 h-3 mr-2" />
                  Auto-Apply All
                </Button>
              </div>

              {jobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-muted/50 rounded-2xl p-4 space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold">{job.title}</h4>
                      <p className="text-sm text-muted-foreground">{job.company}</p>
                    </div>
                    <Badge 
                      className="gradient-primary text-white"
                    >
                      {job.matchScore}% Match
                    </Badge>
                  </div>

                  <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {job.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-3 h-3" />
                      {job.salary}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {job.postedDate}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {job.applied ? (
                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-2xl flex-1"
                        disabled
                      >
                        <CheckCircle2 className="w-3 h-3 mr-2 text-green-500" />
                        Applied
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => handleApplyJob(job.id)}
                        className="rounded-2xl flex-1 gradient-primary text-white"
                      >
                        Quick Apply
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-2xl"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Learn Tab */}
        <TabsContent value="learn" className="flex-1 m-0 p-6">
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              <h3 className="font-semibold">Recommended Courses</h3>

              {courses.map((course) => (
                <div
                  key={course.id}
                  className="bg-muted/50 rounded-2xl p-4 space-y-3"
                >
                  <div>
                    <h4 className="font-semibold">{course.title}</h4>
                    <p className="text-sm text-muted-foreground">{course.provider}</p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{course.level}</Badge>
                    <Badge variant="outline">{course.duration}</Badge>
                    <Badge variant="outline">⭐ {course.rating}</Badge>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Strengthens:</p>
                    <div className="flex flex-wrap gap-1">
                      {course.skillMatch.map((skill, idx) => (
                        <Badge key={idx} className="text-xs bg-accent/10 text-accent border-accent/20">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button
                    size="sm"
                    className="rounded-2xl w-full gradient-primary text-white"
                  >
                    <GraduationCap className="w-3 h-3 mr-2" />
                    Enroll Now
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
};
