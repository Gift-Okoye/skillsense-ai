import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Download, Share2, MessageCircle, Linkedin, Twitter, Github } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShareDropdown } from "@/components/ShareDropdown";
import { PublishDialog } from "@/components/PublishDialog";

interface MobileMenuProps {
  showDownload?: boolean;
  showShare?: boolean;
  showPublish?: boolean;
  showSocials?: boolean;
  onDownload?: () => void;
}

export const MobileMenu = ({ 
  showDownload = false, 
  showShare = false,
  showPublish = false,
  showSocials = false,
  onDownload 
}: MobileMenuProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-2xl hover:bg-secondary">
          <Menu className="w-5 h-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px] sm:w-[320px]">
        <div className="flex flex-col gap-6 mt-8">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-muted-foreground">Theme</span>
              <ThemeToggle />
            </div>
            
            {showDownload && onDownload && (
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-2xl border-2"
                onClick={onDownload}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            )}

            {showPublish && (
              <div className="w-full">
                <PublishDialog isMobile />
              </div>
            )}
            
            {showShare && (
              <div className="w-full">
                <ShareDropdown isMobile />
              </div>
            )}
          </div>

          {showSocials && (
            <div className="pt-6 border-t border-border">
              <p className="text-sm font-medium text-muted-foreground mb-3">Connect with us</p>
              <div className="flex gap-3">
                <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="flex-1 h-11 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-105">
                  <MessageCircle className="w-5 h-5 text-muted-foreground" />
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex-1 h-11 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-105">
                  <Linkedin className="w-5 h-5 text-muted-foreground" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="flex-1 h-11 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-105">
                  <Twitter className="w-5 h-5 text-muted-foreground" />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="flex-1 h-11 rounded-xl bg-secondary hover:bg-primary/10 flex items-center justify-center transition-smooth hover:scale-105">
                  <Github className="w-5 h-5 text-muted-foreground" />
                </a>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-border">
            <p className="text-xs text-muted-foreground text-center">
              SkillSense AI © 2025
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
