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
        "glass rounded-3xl p-8 transition-smooth",
        hover && "hover-lift cursor-pointer",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
};
