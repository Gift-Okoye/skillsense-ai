import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { SkillTag } from "@/components/SkillTag";
import { InterpersonalSkills } from "@/components/InterpersonalSkills";
import { PublishDialog } from "@/components/PublishDialog";
import { ShareDropdown } from "@/components/ShareDropdown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Download, Sparkles, Mail, MapPin, Award, Camera, CheckCircle2 } from "lucide-react";
import logo from "@/assets/skillsense-logo.png";
import gridPattern from "@/assets/grid-pattern.png";
import { useState, useRef } from "react";
import { useToast } from "@/hooks/use-toast";
import { MobileMenu } from "@/components/MobileMenu";
const Profile = () => {
  const navigate = useNavigate();
  const {
    toast
  } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isDownloading, setIsDownloading] = useState(false);
  const allSkills = [{
    name: "React.js",
    category: "hard" as const,
    confidence: 95
  }, {
    name: "TypeScript",
    category: "hard" as const,
    confidence: 88
  }, {
    name: "Node.js",
    category: "hard" as const,
    confidence: 85
  }, {
    name: "Leadership",
    category: "soft" as const,
    confidence: 90
  }, {
    name: "Communication",
    category: "soft" as const,
    confidence: 88
  }, {
    name: "Problem Solving",
    category: "soft" as const,
    confidence: 92
  }, {
    name: "Python",
    category: "hard" as const,
    confidence: 78
  }, {
    name: "SQL",
    category: "hard" as const,
    confidence: 82
  }, {
    name: "Team Collaboration",
    category: "soft" as const,
    confidence: 86
  }, {
    name: "Agile Methodologies",
    category: "inferred" as const,
    confidence: 75
  }, {
    name: "API Design",
    category: "inferred" as const,
    confidence: 80
  }, {
    name: "Cloud Architecture",
    category: "inferred" as const,
    confidence: 72
  }];
  const toolsAndTechnology = [{
    name: "A/B Testing",
    years: 1
  }, {
    name: "Product Designing",
    years: 4
  }, {
    name: "Front End Design",
    years: 4
  }, {
    name: "HTML 5",
    years: 3
  }, {
    name: "CSS",
    years: 3
  }, {
    name: "JavaScript",
    years: 5
  }, {
    name: "Git",
    years: 4
  }, {
    name: "Docker",
    years: 2
  }];
  const interpersonalSkills = [{
    name: "Adaptability",
    rating: 0
  }, {
    name: "Leadership",
    rating: 5
  }, {
    name: "Critical Thinking Problem Solving",
    rating: 0
  }, {
    name: "Effective Communication",
    rating: 0
  }, {
    name: "Teamwork Collaboration",
    rating: 0
  }, {
    name: "Time Management",
    rating: 3
  }, {
    name: "Emotional Intelligence",
    rating: 0
  }];
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
  const handleDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(0);

    // Simulate download progress
    const duration = 3000; // 3 seconds
    const steps = 100;
    const stepDuration = duration / steps;
    for (let i = 0; i <= steps; i++) {
      await new Promise(resolve => setTimeout(resolve, stepDuration));
      setDownloadProgress(i);
    }

    // Show completion
    toast({
      title: "Download Complete!",
      description: "Your profile has been downloaded as PDF"
    });

    // Reset after a moment
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadProgress(0);
    }, 1000);
  };
  return <div className="min-h-screen bg-gradient-to-b from-background via-secondary/30 to-background relative">
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
      backgroundImage: `url(${gridPattern})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      opacity: 0.1
    }} />
      
      {/* Gradient glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      
      <div className="relative container mx-auto px-4 py-4 md:py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 md:mb-8 flex-wrap gap-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/dashboard")} className="rounded-2xl hover:bg-secondary hover:text-foreground">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <img src={logo} alt="SkillSense Logo" className="h-8 md:h-10 w-auto cursor-pointer" onClick={() => navigate("/")} />
          </div>

          {/* Desktop actions */}
          <div className="hidden md:flex gap-3">
            <ThemeToggle />
            {isDownloading ? <div className="flex items-center gap-3 px-4 py-2 rounded-2xl border-2 border-primary bg-primary/5 min-w-[160px]">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-primary">
                      {downloadProgress === 100 ? 'Complete!' : 'Downloading...'}
                    </span>
                    <span className="text-xs font-bold text-primary">{downloadProgress}%</span>
                  </div>
                  <Progress value={downloadProgress} className="h-1" />
                </div>
                {downloadProgress === 100 && <CheckCircle2 className="w-4 h-4 text-green-500 animate-scale-in" />}
              </div> : <Button variant="outline" className="rounded-2xl border-2 hover:bg-primary/5 hover:border-primary hover:text-foreground transition-all group" onClick={handleDownload}>
                <Download className="w-4 h-4 mr-2 group-hover:text-foreground" />
                <span className="group-hover:text-foreground">Download</span>
              </Button>}
            <PublishDialog />
            <ShareDropdown />
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu 
              showDownload 
              showShare 
              showPublish 
              onDownload={handleDownload}
            />
          </div>
        </div>

        {/* Profile Content */}
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Hero Section */}
          <GlassCard className="relative overflow-hidden animate-fade-in">
            
            <div className="relative pt-8 rounded-sm">
              <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-center md:items-start">
                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
                  <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-background shadow-lg">
                    {profileImage && <AvatarImage src={profileImage} alt="Profile" />}
                    <AvatarFallback className="text-2xl md:text-4xl font-bold gradient-primary text-white">
                      JD
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </div>

                <div className="flex-1 space-y-4 text-center md:text-left">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">John Doe</h1>
                    <p className="text-lg md:text-xl text-muted-foreground">Senior Software Engineer</p>
                  </div>

                  <div className="flex flex-wrap gap-3 md:gap-4 text-sm text-muted-foreground justify-center md:justify-start">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      <span className="hidden sm:inline">john.doe@email.com</span>
                      <span className="sm:hidden">Email</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4" />
                      <span>87% Overall Confidence</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>

          {/* AI Summary */}
          <GlassCard className="animate-fade-in" style={{
          animationDelay: "150ms"
        }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-2xl font-heading font-semibold">AI-Generated Summary</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              An accomplished software engineer with over 5 years of experience in full-stack development. 
              Demonstrates strong technical proficiency in modern web technologies including React, TypeScript, 
              and Node.js. Known for exceptional problem-solving abilities and leadership skills. Has proven 
              experience in agile methodologies and cloud architecture, with a track record of delivering 
              high-quality solutions in collaborative team environments.
            </p>
          </GlassCard>

          {/* Tools & Technology */}
          <GlassCard className="animate-fade-in" style={{
          animationDelay: "300ms"
        }}>
            <h2 className="text-2xl font-heading font-semibold mb-6">Tools & Technology</h2>
            <div className="flex flex-wrap gap-3">
              {toolsAndTechnology.map(tool => <div key={tool.name} className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-background/50 transition-smooth hover:scale-105">
                  <span className="text-sm font-medium text-foreground">{tool.name.toUpperCase()}</span>
                  <span className="text-xs text-muted-foreground">
                    {tool.years} {tool.years === 1 ? 'YEAR' : 'YEARS'}
                  </span>
                </div>)}
            </div>
          </GlassCard>

          {/* Interpersonal Skills */}
          <GlassCard className="animate-fade-in" style={{
          animationDelay: "375ms"
        }}>
            <h2 className="text-2xl font-heading font-semibold mb-6">Interpersonal Skills</h2>
            <InterpersonalSkills skills={interpersonalSkills} />
          </GlassCard>

          {/* Skills */}
          <GlassCard className="animate-fade-in" style={{
          animationDelay: "450ms"
        }}>
            <h2 className="text-2xl font-heading font-semibold mb-6">Skills Portfolio</h2>
            
            <div className="space-y-8">
              {/* Hard Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  Technical Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {allSkills.filter(s => s.category === "hard").map(skill => <SkillTag key={skill.name} skill={skill.name} category={skill.category} confidence={skill.confidence} />)}
                </div>
              </div>

              {/* Soft Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-accent" />
                  Soft Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {allSkills.filter(s => s.category === "soft").map(skill => <SkillTag key={skill.name} skill={skill.name} category={skill.category} confidence={skill.confidence} />)}
                </div>
              </div>

              {/* Inferred Skills */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                  Inferred Skills
                </h3>
                <div className="flex flex-wrap gap-3">
                  {allSkills.filter(s => s.category === "inferred").map(skill => <SkillTag key={skill.name} skill={skill.name} category={skill.category} confidence={skill.confidence} />)}
                </div>
              </div>
            </div>
          </GlassCard>

          {/* Footer */}
          <div className="text-center py-8 text-sm text-muted-foreground">
            <p>Profile generated by SkillSense AI • Last updated: {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>
    </div>;
};
export default Profile;