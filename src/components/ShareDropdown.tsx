import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Share2, Twitter, Linkedin, Facebook, Link2, Check } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ShareDropdownProps {
  isMobile?: boolean;
}

export const ShareDropdown = ({ isMobile = false }: ShareDropdownProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();
  const profileUrl = "https://john-doe.skillsense.app";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(profileUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Profile link has been copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSocialShare = (platform: string) => {
    const text = "Check out my professional portfolio on SkillSense!";
    let url = "";

    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(profileUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(profileUrl)}`;
        break;
      case "facebook":
        url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(profileUrl)}`;
        break;
    }

    if (url) {
      window.open(url, "_blank", "width=600,height=400");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={`gradient-primary text-primary-foreground rounded-2xl hover-glow ${isMobile ? 'w-full justify-start' : ''}`}>
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56 bg-background border-border z-50">
        <DropdownMenuItem onClick={handleCopyLink} className="cursor-pointer py-3">
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-3 text-primary" />
              <span>Link copied!</span>
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4 mr-3" />
              <span>Copy link</span>
            </>
          )}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSocialShare("linkedin")} className="cursor-pointer py-3">
          <Linkedin className="w-4 h-4 mr-3" />
          <span>Share on LinkedIn</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSocialShare("twitter")} className="cursor-pointer py-3">
          <Twitter className="w-4 h-4 mr-3" />
          <span>Share on Twitter</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleSocialShare("facebook")} className="cursor-pointer py-3">
          <Facebook className="w-4 h-4 mr-3" />
          <span>Share on Facebook</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
