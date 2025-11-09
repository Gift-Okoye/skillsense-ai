import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/GlassCard";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { MessageCircle, Linkedin, Twitter, Github, Mail } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import logo from "@/assets/skillsense-logo.png";
import gridPattern from "@/assets/grid-pattern-onboarding.png";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/ThemeToggle";
import { MobileMenu } from "@/components/MobileMenu";
const Onboarding = () => {
  const navigate = useNavigate();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showHowItWorks, setShowHowItWorks] = useState(false);
  return <div className="h-screen overflow-hidden bg-gradient-to-b from-background via-secondary/30 to-background relative">
      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url(${gridPattern})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.1
        }}
      />
      
      {/* Gradient glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/0.15),transparent_70%)] pointer-events-none" />
      
      <div className="relative container mx-auto px-6 md:px-8 lg:px-[80px] py-6 md:py-8 h-full flex flex-col">
        {/* Logo & Socials */}
        <div className="flex items-center justify-between mb-8 md:mb-8">
          <a href="/" className="flex items-center">
            <img src={logo} alt="SkillSense Logo" className="h-10 md:h-12 w-auto hover:opacity-80 transition-opacity" />
          </a>
          
          {/* Social Links - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-110 group">
              <MessageCircle className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-110 group">
              <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-110 group">
              <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-110 group">
              <Github className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-smooth" />
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileMenu showSocials />
          </div>
        </div>

        {/* Hero Section */}
        <div className="flex items-center justify-center flex-1 max-w-7xl mx-auto w-full">
          {/* Centered Content */}
          <div className="space-y-6 md:space-y-8 animate-fade-in text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">AI-Powered Skills Analysis</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-normal leading-tight">
              Discover your<br />
              <span className="text-primary">Hidden <span className="font-playfair italic">Skills</span></span><br />
              With AI
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              SkillSense uses advanced AI to analyze your CV or LinkedIn profile, 
              uncovering valuable skills you didn't know you had and presenting 
              them in a beautiful, professional format.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
              <Button size="lg" onClick={() => setShowAuthModal(true)} className="group gradient-primary text-primary-foreground rounded-2xl h-12 md:h-14 px-6 md:px-8 text-base font-semibold hover-glow transition-smooth">
                Get Started
                <ArrowRight className="ml-2 w-5 h-5 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowHowItWorks(true)} className="rounded-2xl h-12 md:h-14 px-6 md:px-8 text-base font-medium border-2 hover:bg-secondary hover:text-foreground">
                Learn More
              </Button>
            </div>

            {/* Stats - Hidden on Mobile */}
            <div className="hidden md:flex flex-wrap gap-8 pt-8 justify-center">
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
        </div>

        {/* Footer */}
        <div className="flex justify-center md:justify-end items-center gap-4 text-xs md:text-sm text-muted-foreground pt-6">
          <span>© SkillSense 2025</span>
          <a href="/privacy" className="hover:text-foreground transition-colors hidden sm:inline">Privacy Policy</a>
          <a href="/terms" className="hover:text-foreground transition-colors hidden sm:inline">Terms and Conditions</a>
        </div>
      </div>

      {/* Auth Modal */}
      <Dialog open={showAuthModal} onOpenChange={setShowAuthModal}>
        <DialogContent className="sm:max-w-[425px] mx-6 rounded-3xl">
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
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full h-11 gap-2" onClick={() => navigate("/upload")}>
                  <Mail className="w-5 h-5" />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full h-11 gap-2" onClick={() => navigate("/upload")}>
                  <Linkedin className="w-5 h-5" />
                  Continue with LinkedIn
                </Button>
              </div>
              
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  Or continue with email
                </span>
              </div>
              
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
              <div className="flex flex-col gap-3">
                <Button variant="outline" className="w-full h-11 gap-2" onClick={() => navigate("/upload")}>
                  <Mail className="w-5 h-5" />
                  Continue with Google
                </Button>
                <Button variant="outline" className="w-full h-11 gap-2" onClick={() => navigate("/upload")}>
                  <Linkedin className="w-5 h-5" />
                  Continue with LinkedIn
                </Button>
              </div>
              
              <div className="relative">
                <Separator />
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-xs text-muted-foreground">
                  Or continue with email
                </span>
              </div>
              
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

      {/* How It Works Modal */}
      <Dialog open={showHowItWorks} onOpenChange={setShowHowItWorks}>
        <DialogContent className="sm:max-w-[800px] mx-6 rounded-3xl">
          <DialogHeader>
            <DialogTitle>How SkillSense Works</DialogTitle>
            <DialogDescription>
              Watch this quick demo to see how our AI analyzes your profile
            </DialogDescription>
          </DialogHeader>
          
          <div className="aspect-video w-full rounded-lg overflow-hidden bg-secondary">
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="SkillSense Demo"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
          
          <div className="space-y-4 pt-4">
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                1
              </div>
              <div>
                <h3 className="font-semibold mb-1">Upload Your Profile</h3>
                <p className="text-sm text-muted-foreground">Upload your CV or connect your LinkedIn profile</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                2
              </div>
              <div>
                <h3 className="font-semibold mb-1">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">Our AI analyzes your experience and extracts hidden skills</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                3
              </div>
              <div>
                <h3 className="font-semibold mb-1">Get Your Results</h3>
                <p className="text-sm text-muted-foreground">View your skills in a beautiful, shareable format</p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default Onboarding;