import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { SkillProgressBar } from "@/components/SkillProgressBar";
import { ShareDropdown } from "@/components/ShareDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { AIAssistantPanel } from "@/components/AIAssistantPanel";
import { AIRecommendations } from "@/components/AIRecommendations";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NavLink } from "@/components/NavLink";
import { useNavigate } from "react-router-dom";
import { Download, Share2, User, Briefcase, Award, ArrowLeft, Camera, X, Plus, GraduationCap, MapPin, DollarSign, Clock, CheckCircle2, ExternalLink, Sparkles, TrendingUp } from "lucide-react";
import logo from "@/assets/skillsense-logo.png";
import aiIcon from "@/assets/ai-assistant-icon.png";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { MobileMenu } from "@/components/MobileMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent } from "@/components/ui/sheet";
const Dashboard = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showAIPanel, setShowAIPanel] = useState(false);
  const isMobile = useIsMobile();
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image under 5MB",
          variant: "destructive"
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
        toast({
          title: "Profile image updated",
          description: "Your profile image has been changed successfully"
        });
      };
      reader.readAsDataURL(file);
    }
  };
  const [activeSection, setActiveSection] = useState<"skills" | "jobs" | "courses">("skills");
  const [newSkill, setNewSkill] = useState("");
  const [currentTipIndex, setCurrentTipIndex] = useState(0);

  const aiTips = [
    {
      icon: TrendingUp,
      title: "Skill Gap",
      description: "Consider learning GraphQL to complement your API design."
    },
    {
      icon: Briefcase,
      title: "Career Path",
      description: "On track for Tech Lead role within 2 years."
    },
    {
      icon: GraduationCap,
      title: "Learning Priority",
      description: "Focus on System Design and Cloud Architecture."
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTipIndex((prev) => (prev + 1) % aiTips.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  const mockSkills = {
    hard: [{
      name: "React.js",
      confidence: 95,
      category: "hard" as const
    }, {
      name: "TypeScript",
      confidence: 88,
      category: "hard" as const
    }, {
      name: "Node.js",
      confidence: 85,
      category: "hard" as const
    }, {
      name: "Python",
      confidence: 78,
      category: "hard" as const
    }, {
      name: "SQL",
      confidence: 82,
      category: "hard" as const
    }],
    soft: [{
      name: "Leadership",
      confidence: 90,
      category: "soft" as const
    }, {
      name: "Communication",
      confidence: 88,
      category: "soft" as const
    }, {
      name: "Problem Solving",
      confidence: 92,
      category: "soft" as const
    }, {
      name: "Team Collaboration",
      confidence: 86,
      category: "soft" as const
    }],
    inferred: [{
      name: "Agile Methodologies",
      confidence: 75,
      category: "inferred" as const
    }, {
      name: "API Design",
      confidence: 80,
      category: "inferred" as const
    }, {
      name: "Cloud Architecture",
      confidence: 72,
      category: "inferred" as const
    }]
  };
  const [jobs, setJobs] = useState([{
    id: "1",
    title: "Senior React Developer",
    company: "TechCorp",
    location: "San Francisco, CA",
    salary: "$150k - $180k",
    matchScore: 95,
    postedDate: "2 days ago",
    applied: false
  }, {
    id: "2",
    title: "Full Stack Engineer",
    company: "StartupXYZ",
    location: "Remote",
    salary: "$130k - $160k",
    matchScore: 88,
    postedDate: "5 days ago",
    applied: false
  }, {
    id: "3",
    title: "Frontend Lead",
    company: "BigTech Inc",
    location: "New York, NY",
    salary: "$170k - $200k",
    matchScore: 92,
    postedDate: "1 week ago",
    applied: false
  }, {
    id: "4",
    title: "UI/UX Engineer",
    company: "DesignHub",
    location: "Austin, TX",
    salary: "$120k - $150k",
    matchScore: 85,
    postedDate: "3 days ago",
    applied: false
  }, {
    id: "5",
    title: "React Native Developer",
    company: "MobileFirst",
    location: "Seattle, WA",
    salary: "$140k - $170k",
    matchScore: 90,
    postedDate: "4 days ago",
    applied: false
  }, {
    id: "6",
    title: "TypeScript Specialist",
    company: "CodeCraft",
    location: "Remote",
    salary: "$135k - $165k",
    matchScore: 93,
    postedDate: "1 day ago",
    applied: false
  }, {
    id: "7",
    title: "Web3 Frontend Developer",
    company: "BlockchainCo",
    location: "Miami, FL",
    salary: "$160k - $190k",
    matchScore: 82,
    postedDate: "6 days ago",
    applied: false
  }, {
    id: "8",
    title: "Senior Software Engineer",
    company: "CloudSystems",
    location: "Denver, CO",
    salary: "$145k - $175k",
    matchScore: 89,
    postedDate: "2 days ago",
    applied: false
  }, {
    id: "9",
    title: "JavaScript Architect",
    company: "TechInnovate",
    location: "Boston, MA",
    salary: "$175k - $210k",
    matchScore: 91,
    postedDate: "3 days ago",
    applied: false
  }, {
    id: "10",
    title: "Frontend Team Lead",
    company: "DataWorks",
    location: "Remote",
    salary: "$165k - $195k",
    matchScore: 87,
    postedDate: "1 week ago",
    applied: false
  }, {
    id: "11",
    title: "React Specialist",
    company: "AgileDevs",
    location: "Portland, OR",
    salary: "$125k - $155k",
    matchScore: 86,
    postedDate: "5 days ago",
    applied: false
  }, {
    id: "12",
    title: "Principal Engineer",
    company: "ScaleUp Tech",
    location: "Los Angeles, CA",
    salary: "$200k - $250k",
    matchScore: 94,
    postedDate: "2 days ago",
    applied: false
  }]);
  const courses = [{
    id: "1",
    title: "Advanced TypeScript Patterns",
    provider: "Frontend Masters",
    duration: "6 hours",
    level: "Advanced",
    skillMatch: ["TypeScript", "React.js"],
    rating: 4.8
  }, {
    id: "2",
    title: "System Design for Interviews",
    provider: "Educative",
    duration: "12 hours",
    level: "Intermediate",
    skillMatch: ["Cloud Architecture", "API Design"],
    rating: 4.9
  }, {
    id: "3",
    title: "Leadership in Tech",
    provider: "Coursera",
    duration: "4 weeks",
    level: "All Levels",
    skillMatch: ["Leadership", "Team Collaboration"],
    rating: 4.7
  }, {
    id: "4",
    title: "AWS Solutions Architect",
    provider: "A Cloud Guru",
    duration: "20 hours",
    level: "Intermediate",
    skillMatch: ["Cloud Architecture", "AWS"],
    rating: 4.9
  }, {
    id: "5",
    title: "React Performance Optimization",
    provider: "Udemy",
    duration: "8 hours",
    level: "Advanced",
    skillMatch: ["React.js", "TypeScript"],
    rating: 4.6
  }, {
    id: "6",
    title: "Node.js Microservices",
    provider: "Pluralsight",
    duration: "10 hours",
    level: "Intermediate",
    skillMatch: ["Node.js", "API Design"],
    rating: 4.8
  }, {
    id: "7",
    title: "Advanced SQL Techniques",
    provider: "DataCamp",
    duration: "15 hours",
    level: "Advanced",
    skillMatch: ["SQL", "Python"],
    rating: 4.7
  }, {
    id: "8",
    title: "Communication for Engineers",
    provider: "LinkedIn Learning",
    duration: "3 hours",
    level: "All Levels",
    skillMatch: ["Communication", "Leadership"],
    rating: 4.5
  }, {
    id: "9",
    title: "GraphQL Complete Guide",
    provider: "Udemy",
    duration: "12 hours",
    level: "Intermediate",
    skillMatch: ["API Design", "Node.js"],
    rating: 4.8
  }, {
    id: "10",
    title: "Docker & Kubernetes",
    provider: "A Cloud Guru",
    duration: "18 hours",
    level: "Intermediate",
    skillMatch: ["Cloud Architecture", "Agile Methodologies"],
    rating: 4.9
  }, {
    id: "11",
    title: "Problem Solving Mastery",
    provider: "Coursera",
    duration: "5 weeks",
    level: "All Levels",
    skillMatch: ["Problem Solving", "Team Collaboration"],
    rating: 4.6
  }, {
    id: "12",
    title: "Full Stack Development",
    provider: "Frontend Masters",
    duration: "25 hours",
    level: "Advanced",
    skillMatch: ["React.js", "Node.js", "TypeScript"],
    rating: 4.9
  }];
  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    toast({
      title: "Skill Added",
      description: `"${newSkill}" has been added to your profile for AI analysis.`
    });
    setNewSkill("");
  };
  const handleApplyJob = (jobId: string) => {
    setJobs(prev => prev.map(job => job.id === jobId ? {
      ...job,
      applied: true
    } : job));
    toast({
      title: "Application Submitted",
      description: "Your application has been sent successfully!"
    });
  };
  return <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background relative">
      {/* Gradient glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[radial-gradient(circle,hsl(var(--accent)/0.1),transparent_70%)] pointer-events-none" />
      
      <div className="container mx-auto px-4 md:px-6 lg:px-8 py-4 md:py-8 relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 md:mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/analysis")} className="rounded-2xl hover:bg-secondary hover:text-foreground">
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </Button>
            <img src={logo} alt="SkillSense Logo" className="h-8 md:h-10 w-auto" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-2 bg-muted/50 backdrop-blur-sm rounded-2xl p-1.5">
            <Button variant={activeSection === "skills" ? "default" : "ghost"} size="sm" onClick={() => setActiveSection("skills")} className="rounded-xl">
              <Award className="w-4 h-4 mr-2" />
              Skills
            </Button>
            <Button variant={activeSection === "jobs" ? "default" : "ghost"} size="sm" onClick={() => setActiveSection("jobs")} className="rounded-xl">
              <Briefcase className="w-4 h-4 mr-2" />
              Jobs
            </Button>
            <Button variant={activeSection === "courses" ? "default" : "ghost"} size="sm" onClick={() => setActiveSection("courses")} className="rounded-xl">
              <GraduationCap className="w-4 h-4 mr-2" />
              Courses
            </Button>
          </nav>
          
          <div className="flex gap-2 md:gap-3 items-center">
            {/* Profile Picture on Mobile - acts as profile link */}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => navigate("/profile")} 
              className="lg:hidden rounded-full p-0 w-10 h-10"
            >
              <Avatar className="w-10 h-10 border-2 border-primary/20">
                {profileImage && <AvatarImage src={profileImage} alt="Profile" />}
                <AvatarFallback className="text-sm font-semibold gradient-primary text-white">
                  JD
                </AvatarFallback>
              </Avatar>
            </Button>

            {/* Desktop controls */}
            <div className="hidden lg:flex gap-3">
              <ThemeToggle />
              <Button variant="outline" className="rounded-2xl border-2" onClick={() => navigate("/profile")}>
                <User className="w-4 h-4 mr-2" />
                <span className="hidden xl:inline">View Profile</span>
              </Button>
              <ShareDropdown />
            </div>

            {/* Mobile Menu */}
            <div className="lg:hidden">
              <MobileMenu showShare />
            </div>
          </div>
        </div>

        {/* Mobile Navigation Tabs */}
        <nav className="flex lg:hidden gap-2 bg-muted/50 backdrop-blur-sm rounded-2xl p-1.5 mb-6">
          <Button variant={activeSection === "skills" ? "default" : "ghost"} size="sm" onClick={() => setActiveSection("skills")} className="rounded-xl flex-1">
            <Award className="w-4 h-4 mr-1" />
            Skills
          </Button>
          <Button variant={activeSection === "jobs" ? "default" : "ghost"} size="sm" onClick={() => setActiveSection("jobs")} className="rounded-xl flex-1">
            <Briefcase className="w-4 h-4 mr-1" />
            Jobs
          </Button>
          <Button variant={activeSection === "courses" ? "default" : "ghost"} size="sm" onClick={() => setActiveSection("courses")} className="rounded-xl flex-1">
            <GraduationCap className="w-4 h-4 mr-1" />
            Courses
          </Button>
        </nav>

        {/* Main Content */}
        {activeSection === "skills" && <div className="w-full">
            {/* Skills Section */}
            <div className="w-full space-y-8">
              {/* Add Skill & AI Recommendations Container */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-x-6">
                {/* Add New Skill & AI Recommendations (add_rec_container) */}
                <div className="w-full lg:w-[130%] flex flex-col gap-4 flex-grow">
                  {/* Add New Skill */}
                  <GlassCard className="animate-fade-in">
                    <h3 className="font-semibold mb-3 flex items-center gap-2">
                      <Plus className="w-4 h-4" />
                      Add New Skill
                    </h3>
                    <div className="flex gap-2">
                      <Input value={newSkill} onChange={e => setNewSkill(e.target.value)} placeholder="e.g., Docker, GraphQL..." className="rounded-2xl" />
                      <Button onClick={handleAddSkill} className="rounded-2xl gradient-primary text-white">
                        Add
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Add skills AI might have missed
                    </p>
                  </GlassCard>

                  {/* AI Recommendations */}
                  <GlassCard className="animate-fade-in flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                      </div>
                      <h2 className="text-xl font-heading font-semibold">AI Tips</h2>
                    </div>
                    
                    <div className="relative">
                      <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 space-y-2 min-h-[120px] animate-fade-in" key={currentTipIndex}>
                        <div className="flex items-center gap-2">
                          {(() => {
                            const Icon = aiTips[currentTipIndex].icon;
                            return <Icon className="w-4 h-4 text-accent" />;
                          })()}
                          <h4 className="font-semibold text-sm">{aiTips[currentTipIndex].title}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{aiTips[currentTipIndex].description}</p>
                      </div>
                      
                      <div className="flex justify-center gap-2 mt-4">
                        {aiTips.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentTipIndex(index)}
                            className={cn(
                              "w-2 h-2 rounded-full transition-all duration-300",
                              currentTipIndex === index 
                                ? "bg-accent w-6" 
                                : "bg-accent/30 hover:bg-accent/50"
                            )}
                            aria-label={`Go to tip ${index + 1}`}
                          />
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                </div>

                {/* Profile Card */}
                <GlassCard className="animate-scale-in text-center w-full lg:w-[30%] flex-shrink-0">
                  <div className="space-y-6">
                  <div className="relative group cursor-pointer mx-auto w-24" onClick={() => fileInputRef.current?.click()}>
                    <Avatar className="w-24 h-24 border-4 border-primary/20">
                      {profileImage && <AvatarImage src={profileImage} alt="Profile" />}
                      <AvatarFallback className="text-2xl font-semibold gradient-primary text-white">
                        JD
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera className="w-6 h-6 text-white" />
                    </div>
                    <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  </div>

                  <div>
                    <h3 className="text-2xl font-heading font-bold mb-2">John Doe</h3>
                    <p className="text-muted-foreground">Senior Software Engineer</p>
                  </div>

                  <div className="pt-4 border-t border-border space-y-3 text-left">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">5+ years experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-muted-foreground" />
                      <span className="text-sm">14 skills identified</span>
                    </div>
                  </div>

                  <Button onClick={() => navigate("/profile")} className="w-full gradient-primary text-primary-foreground rounded-2xl h-12 font-semibold hover-glow">
                    View Full Profile
                  </Button>
                  </div>
                </GlassCard>
              </div>

              {/* Hard Skills & Quick Actions/Stats Container */}
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-x-6">
                {/* Hard Skills */}
                <GlassCard className="animate-fade-in w-full">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
                      <Award className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-2xl font-heading font-semibold">Hard Skills</h2>
                  </div>
                  <div className="space-y-4">
                    {mockSkills.hard.map((skill, index) => <SkillProgressBar key={skill.name} skill={skill.name} confidence={skill.confidence} category={skill.category} delay={index * 100} />)}
                  </div>
                </GlassCard>

                {/* Quick Actions & Analysis Summary (quick_ana_container) */}
                <div className="space-y-4 md:space-y-6 w-full lg:w-[30%]">
                  {/* Quick Actions */}
                  <GlassCard className="animate-fade-in" style={{
                animationDelay: "200ms"
              }}>
                    <div className="space-y-4">
                      <h3 className="font-heading font-semibold text-lg">Quick Actions</h3>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start rounded-2xl h-12 border-2">
                        <Download className="w-4 h-4 mr-3" />
                        Download Report
                      </Button>
                      <Button variant="outline" className="w-full justify-start rounded-2xl h-12 border-2">
                        <Share2 className="w-4 h-4 mr-3" />
                        Share Results
                      </Button>
                    </div>
                    </div>
                  </GlassCard>

                  {/* Analysis Summary */}
                  <GlassCard className="animate-fade-in" style={{
                animationDelay: "300ms"
              }}>
                    <h3 className="font-heading font-semibold text-lg mb-4">Analysis Summary</h3>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Confidence Score</span>
                        <span className="font-semibold text-lg">87%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Total Skills</span>
                        <span className="font-semibold text-lg">14</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Top Category</span>
                        <span className="font-semibold text-lg">Technical</span>
                      </div>
                    </div>
                  </GlassCard>
                </div>
              </div>

              {/* Soft & Inferred Skills - Side by Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                {/* Soft Skills */}
                <GlassCard className="animate-fade-in" style={{
              animationDelay: "150ms"
            }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-accent flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h2 className="text-xl font-heading font-semibold">Soft Skills</h2>
                  </div>
                  <div className="space-y-4">
                    {mockSkills.soft.map((skill, index) => <SkillProgressBar key={skill.name} skill={skill.name} confidence={skill.confidence} category={skill.category} delay={index * 100} />)}
                  </div>
                </GlassCard>

                {/* Inferred Skills */}
                <GlassCard className="animate-fade-in" style={{
              animationDelay: "300ms"
            }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-2xl bg-secondary border-2 border-border flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-secondary-foreground" />
                    </div>
                    <h2 className="text-xl font-heading font-semibold">Inferred Skills</h2>
                  </div>
                  <div className="space-y-4">
                    {mockSkills.inferred.map((skill, index) => <SkillProgressBar key={skill.name} skill={skill.name} confidence={skill.confidence} category={skill.category} delay={index * 100} />)}
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>}

        {/* Jobs Section */}
        {activeSection === "jobs" && <div className="flex flex-col h-[calc(100vh-12rem)]">
            <div className="flex items-center justify-between mb-6 flex-shrink-0">
              <h2 className="text-2xl md:text-3xl font-heading font-bold">Matching Job Opportunities</h2>
              <Button className="rounded-2xl gradient-primary text-white hidden md:flex">
                Auto-Apply to All
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 overflow-y-auto flex-1 pr-2">
              {jobs.map(job => <GlassCard key={job.id} className="animate-fade-in flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h4 className="font-semibold text-lg mb-1">{job.title}</h4>
                        <p className="text-sm text-muted-foreground">{job.company}</p>
                      </div>
                      <Badge className="gradient-primary text-white shrink-0">
                        {job.matchScore}%
                      </Badge>
                    </div>

                    <div className="space-y-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3 h-3" />
                        {job.location}
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-3 h-3" />
                        {job.salary}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3" />
                        {job.postedDate}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4 pt-4 border-t border-border">
                    {job.applied ? <Button size="sm" variant="outline" className="rounded-2xl flex-1" disabled>
                        <CheckCircle2 className="w-3 h-3 mr-2 text-green-500" />
                        Applied
                      </Button> : <Button size="sm" onClick={() => handleApplyJob(job.id)} className="rounded-2xl flex-1 gradient-primary text-white">
                        Quick Apply
                      </Button>}
                    <Button size="sm" variant="outline" className="rounded-2xl">
                      <ExternalLink className="w-3 h-3" />
                    </Button>
                  </div>
                </GlassCard>)}
            </div>
          </div>}

        {/* Courses Section */}
        {activeSection === "courses" && <div className="flex flex-col h-[calc(100vh-12rem)]">
            <h2 className="text-2xl md:text-3xl font-heading font-bold mb-6 flex-shrink-0">Recommended Courses</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 overflow-y-auto flex-1 pr-2">
              {courses.map(course => <GlassCard key={course.id} className="animate-fade-in flex flex-col">
                  <div className="space-y-4 flex-1">
                    <div>
                      <h4 className="font-semibold text-lg mb-1">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">{course.provider}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="text-xs">{course.level}</Badge>
                      <Badge variant="outline" className="text-xs">{course.duration}</Badge>
                      <Badge variant="outline" className="text-xs">⭐ {course.rating}</Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Strengthens:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.skillMatch.map((skill, idx) => <Badge key={idx} className="text-xs bg-accent/10 text-accent border-accent/20">
                            {skill}
                          </Badge>)}
                      </div>
                    </div>
                  </div>

                  <Button size="sm" className="rounded-2xl w-full gradient-primary text-white mt-4">
                    <GraduationCap className="w-3 h-3 mr-2" />
                    Enroll Now
                  </Button>
                </GlassCard>)}
            </div>
          </div>}
      </div>

      {/* Floating AI Assistant Button */}
      <button onClick={() => setShowAIPanel(true)} className="fixed bottom-8 right-8 z-40 group" aria-label="Open AI Assistant">
        <div className="bg-background dark:bg-background shadow-lg hover:shadow-xl transition-all duration-300 rounded-full p-4 border border-border hover:scale-110">
          <img src={aiIcon} alt="AI Assistant" className="w-8 h-8 md:w-12 md:h-12" />
        </div>
      </button>

      {/* AI Assistant Panel - Desktop */}
      {!isMobile && showAIPanel && <>
          <Button variant="ghost" size="icon" onClick={() => setShowAIPanel(false)} className="fixed right-[492px] top-4 z-50 rounded-2xl bg-background/95 backdrop-blur-xl border border-border hover:bg-background">
            <X className="w-5 h-5" />
          </Button>
          <div className="fixed right-0 top-0 h-screen w-[480px] z-50 transition-transform duration-300 translate-x-0">
            <AIAssistantPanel onClose={() => setShowAIPanel(false)} />
          </div>
        </>}

      {/* AI Assistant Sheet - Mobile */}
      {isMobile && (
        <Sheet open={showAIPanel} onOpenChange={setShowAIPanel}>
          <SheetContent side="bottom" className="h-[85vh] p-0">
            <AIAssistantPanel onClose={() => setShowAIPanel(false)} isMobile />
          </SheetContent>
        </Sheet>
      )}
    </div>;
};
export default Dashboard;