import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Upload, FileText, Send } from "lucide-react";

interface ApplicationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  type: "job" | "course";
  title: string;
  company: string;
  onSuccess?: () => void;
}

export const ApplicationModal = ({ open, onOpenChange, type, title, company, onSuccess }: ApplicationModalProps) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });
  const [isProcessing, setIsProcessing] = useState(false);

  const totalSteps = 3;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setStep(4); // Success step
      onSuccess?.();
      setTimeout(() => {
        onOpenChange(false);
        setStep(1);
        // Reset form
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          coverLetter: "",
          cardNumber: "",
          expiryDate: "",
          cvv: "",
        });
      }, 2000);
    }, 2000);
  };

  const isJobApplication = type === "job";
  const coursePrice = "$49.99";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100vw-3rem)] sm:max-w-[600px] max-h-[85vh] overflow-y-auto rounded-3xl">
        <DialogHeader>
          <DialogTitle className="text-xl md:text-2xl">
            {isJobApplication ? "Quick Apply" : "Enroll Now"}
          </DialogTitle>
          <DialogDescription>
            {isJobApplication 
              ? `Applying for ${title} at ${company}`
              : `Enrolling in ${title} by ${company}`
            }
          </DialogDescription>
        </DialogHeader>

        {step < 4 && (
          <div className="space-y-4 animate-fade-in">
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Step {step} of {totalSteps}</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2 animate-scale-in" />
            </div>

            {/* Step 1: Personal Info */}
            {step === 1 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Full Name</label>
                  <Input
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-2xl"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="rounded-2xl"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Payment (for courses) or Documents (for jobs) */}
            {step === 2 && (
              <div className="space-y-4 animate-fade-in">
                {!isJobApplication ? (
                  <>
                    <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">Course Fee</p>
                          <p className="text-xs text-muted-foreground">One-time payment</p>
                        </div>
                        <p className="text-2xl font-bold gradient-primary bg-clip-text text-transparent">{coursePrice}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Card Number</label>
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\s/g, '');
                          if (value.length <= 16 && /^\d*$/.test(value)) {
                            const formatted = value.match(/.{1,4}/g)?.join(' ') || value;
                            setFormData({ ...formData, cardNumber: formatted });
                          }
                        }}
                        className="rounded-2xl"
                        maxLength={19}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Expiry Date</label>
                        <Input
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => {
                            let value = e.target.value.replace(/\D/g, '');
                            if (value.length >= 2) {
                              value = value.slice(0, 2) + '/' + value.slice(2, 4);
                            }
                            if (value.length <= 5) {
                              setFormData({ ...formData, expiryDate: value });
                            }
                          }}
                          className="rounded-2xl"
                          maxLength={5}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">CVV</label>
                        <Input
                          type="password"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => {
                            const value = e.target.value.replace(/\D/g, '');
                            if (value.length <= 3) {
                              setFormData({ ...formData, cvv: value });
                            }
                          }}
                          className="rounded-2xl"
                          maxLength={3}
                        />
                      </div>
                    </div>
                    <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                      <div className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 mt-0.5 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">Secure Payment</p>
                          <p className="text-xs text-muted-foreground">
                            Your payment information is encrypted and secure
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Resume/CV</label>
                      <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center hover:border-primary transition-smooth cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          PDF, DOC, DOCX (Max 5MB)
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Portfolio/LinkedIn (Optional)</label>
                      <Input
                        placeholder="https://linkedin.com/in/johndoe"
                        className="rounded-2xl"
                      />
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Step 3: Cover Letter/Message */}
            {step === 3 && (
              <div className="space-y-4 animate-fade-in">
                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    {isJobApplication ? "Cover Letter" : "Why do you want to take this course?"}
                  </label>
                  <Textarea
                    placeholder={
                      isJobApplication
                        ? "Tell us why you're a great fit for this role..."
                        : "Share your learning goals and what you hope to achieve..."
                    }
                    value={formData.coverLetter}
                    onChange={(e) => setFormData({ ...formData, coverLetter: e.target.value })}
                    className="rounded-2xl min-h-[150px] resize-none"
                  />
                </div>
                <div className="bg-muted/50 rounded-2xl p-4 space-y-2">
                  <div className="flex items-start gap-2">
                    <FileText className="w-4 h-4 mt-0.5 text-primary" />
                    <div>
                      <p className="text-sm font-medium">AI-Enhanced Application</p>
                      <p className="text-xs text-muted-foreground">
                        Your skills from your profile will be automatically highlighted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-3 pt-4">
              {step > 1 && (
                <Button
                  variant="outline"
                  onClick={handleBack}
                  className="flex-1 rounded-2xl"
                >
                  Back
                </Button>
              )}
              <Button
                onClick={step === totalSteps ? handleSubmit : handleNext}
                className="flex-1 rounded-2xl gradient-primary text-white transition-smooth hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]"
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing...
                  </>
                ) : step === totalSteps ? (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {isJobApplication ? "Submit Application" : `Pay ${coursePrice}`}
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Success Step */}
        {step === 4 && (
          <div className="py-8 text-center space-y-4 animate-scale-in">
            <div className="w-16 h-16 mx-auto bg-green-500/10 rounded-full flex items-center justify-center animate-scale-in">
              <CheckCircle2 className="w-8 h-8 text-green-500" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">
                {isJobApplication ? "Application Submitted!" : "Enrollment Complete!"}
              </h3>
              <p className="text-muted-foreground">
                {isJobApplication 
                  ? "We'll notify you when the employer reviews your application"
                  : "You can now access the course materials in your learning dashboard"
                }
              </p>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
