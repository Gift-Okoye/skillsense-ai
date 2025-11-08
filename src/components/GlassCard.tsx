import { cn } from "@/lib/utils";
import { ReactNode, CSSProperties } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  style?: CSSProperties;
}

export const GlassCard = ({ children, className, hover = false, style }: GlassCardProps) => {
  return (
    <div
      className={cn(
        "relative rounded-3xl p-8 transition-all duration-300",
        "bg-background/40 backdrop-blur-xl",
        "border border-white/10",
        "shadow-[0_8px_32px_0_rgba(0,0,0,0.12)]",
        hover && "hover:bg-background/60 hover:shadow-[0_12px_48px_0_rgba(0,0,0,0.16)] hover:-translate-y-1 cursor-pointer",
        className
      )}
      style={style}
    >
      {/* Inner glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};
