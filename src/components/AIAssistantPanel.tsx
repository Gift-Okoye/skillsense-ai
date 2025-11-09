import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Send, 
  Bot,
  X,
} from "lucide-react";

interface AIAssistantPanelProps {
  onClose?: () => void;
  isMobile?: boolean;
}

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const AIAssistantPanel = ({ onClose, isMobile = false }: AIAssistantPanelProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hi! I'm your AI career assistant. I can help you analyze your skills, find relevant jobs, recommend courses, and provide personalized career advice. What would you like to do today?"
    }
  ]);
  const [input, setInput] = useState("");

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

  return (
    <div className="h-full flex flex-col bg-background/95 backdrop-blur-xl border-l border-border">
      {/* Header */}
      <div className="p-4 md:p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl gradient-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg md:text-xl font-heading font-semibold">AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Your career companion</p>
            </div>
          </div>
          {onClose && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={onClose}
              className="rounded-2xl hover:bg-secondary md:hidden"
            >
              <X className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col p-4 md:p-6">
        <ScrollArea className="flex-1 pr-2 md:pr-4 mb-4">
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
          </div>
        </ScrollArea>

        <div className="flex gap-2 pt-4 border-t border-border">
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
      </div>
    </div>
  );
};
