import { useEffect } from "react";

interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: number;
}

interface SkillAnalyticsTrackerProps {
  userId?: string;
}

export const SkillAnalyticsTracker = ({ userId }: SkillAnalyticsTrackerProps) => {
  useEffect(() => {
    // Track page view
    trackEvent('dashboard_viewed', {
      userId,
      route: window.location.pathname,
    });

    // Track engagement time
    const startTime = Date.now();
    return () => {
      const engagementTime = Date.now() - startTime;
      trackEvent('dashboard_engagement', {
        userId,
        duration: engagementTime,
      });
    };
  }, [userId]);

  return null;
};

// Analytics tracking functions
export const trackEvent = (event: string, properties: Record<string, any> = {}) => {
  const analyticsEvent: AnalyticsEvent = {
    event,
    properties: {
      ...properties,
      url: window.location.href,
      userAgent: navigator.userAgent,
    },
    timestamp: Date.now(),
  };

  // Log to console (in production, this would send to analytics service)
  console.log('📊 Analytics Event:', analyticsEvent);

  // Store in localStorage for demo purposes (in production, send to backend)
  const events = getStoredEvents();
  events.push(analyticsEvent);
  localStorage.setItem('skillsense_analytics', JSON.stringify(events.slice(-100))); // Keep last 100 events
};

export const trackSkillInteraction = (
  action: 'view' | 'edit' | 'confirm' | 'reject',
  skillName: string,
  metadata?: Record<string, any>
) => {
  trackEvent(`skill_${action}`, {
    skillName,
    ...metadata,
  });
};

export const trackExport = (format: 'pdf' | 'json', skillCount: number) => {
  trackEvent('export_generated', {
    format,
    skillCount,
  });
};

export const trackProfileView = (viewType: 'public' | 'private') => {
  trackEvent('profile_viewed', {
    viewType,
  });
};

export const getStoredEvents = (): AnalyticsEvent[] => {
  const stored = localStorage.getItem('skillsense_analytics');
  return stored ? JSON.parse(stored) : [];
};

export const getAnalyticsMetrics = () => {
  const events = getStoredEvents();
  
  const totalEvents = events.length;
  const skillEdits = events.filter(e => e.event === 'skill_edit').length;
  const skillConfirmations = events.filter(e => e.event === 'skill_confirm').length;
  const skillRejections = events.filter(e => e.event === 'skill_reject').length;
  const exports = events.filter(e => e.event === 'export_generated').length;
  
  const confirmationRate = skillConfirmations / (skillConfirmations + skillRejections + skillEdits || 1);
  const editRate = skillEdits / (skillConfirmations + skillRejections + skillEdits || 1);
  
  return {
    totalEvents,
    skillEdits,
    skillConfirmations,
    skillRejections,
    exports,
    confirmationRate: Math.round(confirmationRate * 100),
    editRate: Math.round(editRate * 100),
  };
};
