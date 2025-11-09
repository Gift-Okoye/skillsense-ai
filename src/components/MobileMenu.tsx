import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu, Download, Share2 } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { ShareDropdown } from "@/components/ShareDropdown";
import { PublishDialog } from "@/components/PublishDialog";

interface MobileMenuProps {
  showDownload?: boolean;
  showShare?: boolean;
  showPublish?: boolean;
  onDownload?: () => void;
}

export const MobileMenu = ({ 
  showDownload = false, 
  showShare = false,
  showPublish = false,
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
