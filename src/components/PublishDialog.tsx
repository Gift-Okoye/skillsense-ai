import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Check, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PublishDialogProps {
  isMobile?: boolean;
}

export const PublishDialog = ({ isMobile = false }: PublishDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [useCustomDomain, setUseCustomDomain] = useState(false);
  const [customDomain, setCustomDomain] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const { toast } = useToast();

  const defaultDomain = "john-doe.skillsense.app";

  const handlePublish = async () => {
    setIsPublishing(true);
    
    // Simulate publishing process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsPublishing(false);
    setIsPublished(true);
    
    const domain = useCustomDomain && customDomain ? customDomain : defaultDomain;
    
    toast({
      title: "Portfolio Published!",
      description: `Your portfolio is now live at ${domain}`,
    });
    
    // Reset after 2 seconds
    setTimeout(() => {
      setIsPublished(false);
      setIsOpen(false);
      setUseCustomDomain(false);
      setCustomDomain("");
    }, 2000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className={`rounded-2xl border-2 ${isMobile ? 'w-full justify-start' : ''}`}>
          <Globe className="w-4 h-4 mr-2" />
          Publish
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80%] sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Globe className="w-6 h-6" />
            Publish as Web Portfolio
          </DialogTitle>
          <DialogDescription>
            Share your professional profile with the world
          </DialogDescription>
        </DialogHeader>

        {!isPublished ? (
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="default-domain"
                  checked={!useCustomDomain}
                  onChange={() => setUseCustomDomain(false)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <Label htmlFor="default-domain" className="cursor-pointer font-medium">
                  Use default domain
                </Label>
              </div>
              <div className="ml-6 text-sm text-muted-foreground">
                {defaultDomain}
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <input
                  type="radio"
                  id="custom-domain"
                  checked={useCustomDomain}
                  onChange={() => setUseCustomDomain(true)}
                  className="w-4 h-4 accent-primary cursor-pointer"
                />
                <Label htmlFor="custom-domain" className="cursor-pointer font-medium">
                  Use custom domain
                </Label>
              </div>
              {useCustomDomain && (
                <div className="ml-6 space-y-2">
                  <Input
                    placeholder="yourdomain.com"
                    value={customDomain}
                    onChange={(e) => setCustomDomain(e.target.value)}
                    className="rounded-xl"
                  />
                  <p className="text-xs text-muted-foreground">
                    You'll need to configure DNS settings after publishing
                  </p>
                </div>
              )}
            </div>

            <Button
              onClick={handlePublish}
              disabled={isPublishing || (useCustomDomain && !customDomain)}
              className="w-full gradient-primary text-primary-foreground rounded-2xl h-12 font-semibold hover-glow"
            >
              {isPublishing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Publishing...
                </>
              ) : (
                <>
                  <Globe className="w-4 h-4 mr-2" />
                  Publish Portfolio
                </>
              )}
            </Button>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
              <Check className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Successfully Published!</h3>
              <p className="text-sm text-muted-foreground">
                Your portfolio is now live and accessible
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
