import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { MessageCircle, Linkedin, Twitter, Facebook } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import logo from "@/assets/skillsense-logo.png";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Onboarding = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  return <div className="h-screen overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background relative">
      {/* Gradient glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      
      {/* Check pattern overlay */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{
        backgroundImage: `repeating-conic-gradient(hsl(var(--foreground)) 0% 25%, transparent 0% 50%) 50% / 20px 20px`
      }} />
      
      <div className="relative container mx-auto px-[80px] py-8 h-full flex flex-col">
        {/* Logo & Socials */}
        <div className="flex items-center justify-between mb-8">
          <img src={logo} alt="SkillSense Logo" className="h-12 w-auto" />
          
          {/* Social Links */}
          <div className="flex items-center gap-3">
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-110 group">
              <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-110 group">
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-110 group">
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-110 group">
              <Facebook className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
            </a>
          </div>
        </div>

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto flex-1">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Skills Analysis</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-heading font-bold leading-tight">Discover your hidden skills 
with AI<span className="gradient-text">hidden skills</span> with AI
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
              SkillSense uses advanced AI to analyze your CV or LinkedIn profile, 
              uncovering valuable skills you didn't know you had and presenting 
              them in a beautiful, professional format.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" onClick={() => setShowAuthModal(true)} className="group gradient-primary text-primary-foreground rounded-2xl h-14 px-8 text-base font-semibold hover-glow transition-smooth">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-2xl h-14 px-8 text-base font-medium border-2 hover:bg-secondary">
                Learn More
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8">
              <div>
                <div className="text-3xl font-bold text-foreground">10k+</div>
                <div className="text-sm text-muted-foreground">Profiles Analyzed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">95%</div>
                <div className="text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Skill Categories</div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative animate-scale-in">
            <div className="absolute -inset-4 gradient-primary opacity-20 blur-3xl rounded-full" />
            <GlassCard className="relative overflow-hidden">
              <img src={heroImage} alt="AI Skills Discovery Illustration" className="w-full h-auto rounded-2xl" />
            </GlassCard>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end items-center gap-4 text-sm text-muted-foreground pt-4">
          <span>© SkillSense 2025</span>
          <a href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-foreground transition-colors">Terms and Conditions</a>
        </div>
      </div>

      {/* Auth Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Welcome to SkillSense</DialogTitle>
            <DialogDescription>
              Sign in to your account or create a new one to get started.
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signin-email">Email</Label>
                <Input id="signin-email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signin-password">Password</Label>
                <Input id="signin-password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={() => navigate("/upload")}>
                Sign In
              </Button>
            </TabsContent>
            
            <TabsContent value="signup" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="signup-name">Full Name</Label>
                <Input id="signup-name" type="text" placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-email">Email</Label>
                <Input id="signup-email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="signup-password">Password</Label>
                <Input id="signup-password" type="password" placeholder="••••••••" />
              </div>
              <Button className="w-full" onClick={() => navigate("/upload")}>
                Create Account
              </Button>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Onboarding;