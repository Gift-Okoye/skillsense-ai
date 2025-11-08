# SkillSense Technical Architecture & Improvement Proposal

## Overview
This document outlines the technical architecture for transforming SkillSense into a scalable, AI-driven skill analysis platform with real-time intelligence, secure data management, and comprehensive API integration.

---

## 1. Real-Time AI Skill Analysis

### Architecture
```
User Input → AI Processing Pipeline → Confidence Scoring → Real-Time Updates
```

### Implementation Strategy
- **AI Model**: Fine-tuned NLP model (BERT/GPT-based) for skill extraction
- **Processing Pipeline**:
  - Document parsing (PDF/DOCX/HTML)
  - Entity recognition for skills, tools, and technologies
  - Context analysis for confidence scoring
  - Real-time WebSocket updates to frontend

### Technical Stack
```typescript
// Edge Function: ai-skill-analyzer
interface SkillAnalysisRequest {
  documentText: string;
  userCorrections?: UserFeedback[];
  context: 'cv' | 'linkedin' | 'manual';
}

interface SkillAnalysisResponse {
  skills: {
    name: string;
    category: 'hard' | 'soft' | 'inferred';
    confidence: number;
    evidence: Evidence[];
    lastUpdated: string;
  }[];
  processingTime: number;
}
```

### Database Schema
```sql
CREATE TABLE skill_analysis (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  skill_name TEXT,
  confidence_score DECIMAL(5,2),
  evidence JSONB,
  source TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

CREATE INDEX idx_user_skills ON skill_analysis(user_id, skill_name);
```

---

## 2. Data Syncing API

### LinkedIn Integration
```typescript
// Edge Function: linkedin-sync
interface LinkedInSyncConfig {
  accessToken: string;
  refreshToken: string;
  autoSync: boolean;
  syncFrequency: 'daily' | 'weekly' | 'manual';
}

// OAuth 2.0 Flow
class LinkedInSync {
  async authenticate(): Promise<OAuthTokens>
  async fetchProfile(): Promise<LinkedInProfile>
  async syncSkills(): Promise<SkillUpdate[]>
  async scheduleAutoRefresh(): Promise<void>
}
```

### Google Drive Integration
```typescript
// Edge Function: drive-sync
interface DriveWatcher {
  folderId: string;
  fileTypes: ['pdf', 'docx'];
  onChange: (file: DriveFile) => Promise<void>;
}

// Webhook-based file monitoring
async function watchCVFolder(userId: string) {
  const watcher = await googleDrive.files.watch({
    fileId: folderId,
    requestBody: {
      type: 'web_hook',
      address: `${API_URL}/webhooks/drive-update`
    }
  });
}
```

### Sync Architecture
```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│  LinkedIn   │──────▶│  Sync Queue  │──────▶│  Database   │
└─────────────┘      │  (Redis)     │      └─────────────┘
                     └──────────────┘
┌─────────────┐            │                ┌─────────────┐
│ Google Drive│────────────┘                │  AI Engine  │
└─────────────┘                             └─────────────┘
```

---

## 3. AI Explainability Layer

### Evidence Tracking
```typescript
interface SkillEvidence {
  id: string;
  skillName: string;
  source: {
    type: 'experience' | 'education' | 'project' | 'certification';
    text: string;
    dateRange?: string;
    location: {
      page?: number;
      section: string;
    };
  };
  confidenceContribution: number;
  keywords: string[];
}

// Component: SkillHoverCard
const SkillHoverCard = ({ skill }: { skill: Skill }) => {
  return (
    <HoverCard>
      <HoverCardTrigger>
        <SkillTag skill={skill} />
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold">Confidence: {skill.confidence}%</h4>
            <Progress value={skill.confidence} />
          </div>
          
          <div>
            <h5 className="text-sm font-medium mb-2">Evidence Found:</h5>
            {skill.evidence.map(e => (
              <div key={e.id} className="text-xs p-2 bg-muted rounded mb-1">
                <p className="font-medium">{e.source.section}</p>
                <p className="text-muted-foreground">{e.source.text}</p>
                <span className="text-primary">+{e.confidenceContribution}%</span>
              </div>
            ))}
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
};
```

### Confidence Calculation Algorithm
```typescript
function calculateConfidence(evidence: Evidence[]): number {
  const weights = {
    directMention: 40,
    projectUsage: 25,
    certification: 20,
    contextual: 10,
    recency: 5
  };
  
  let score = 0;
  evidence.forEach(e => {
    score += weights[e.type] * e.frequency;
    if (e.isRecent) score += weights.recency;
  });
  
  return Math.min(100, score);
}
```

---

## 4. Editable Skill Tags & Incremental Learning

### User Feedback Loop
```typescript
interface UserFeedback {
  skillId: string;
  action: 'confirm' | 'reject' | 'edit';
  newValue?: string;
  reason?: string;
}

// Edge Function: skill-feedback
async function processFeedback(feedback: UserFeedback) {
  // Update skill database
  await updateSkill(feedback);
  
  // Train AI model incrementally
  await trainModel({
    input: feedback.originalContext,
    expectedOutput: feedback.newValue,
    weight: 0.8 // Higher weight for user corrections
  });
  
  // Log for analytics
  await logFeedback(feedback);
}
```

### Editable Component
```typescript
const EditableSkillTag = ({ skill, onUpdate }: EditableSkillTagProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(skill.name);
  
  const handleSave = async () => {
    await updateSkill({ 
      id: skill.id, 
      name: value,
      userModified: true 
    });
    onUpdate(value);
    setIsEditing(false);
  };
  
  return isEditing ? (
    <Input value={value} onChange={e => setValue(e.target.value)} />
  ) : (
    <Badge onClick={() => setIsEditing(true)}>{skill.name}</Badge>
  );
};
```

---

## 5. Benchmark API Integration

### O*NET Integration
```typescript
interface ONetSkill {
  elementId: string;
  elementName: string;
  scaleId: string;
  dataValue: number;
  standardError?: number;
}

class BenchmarkService {
  async compareToMarket(userSkills: Skill[]): Promise<BenchmarkResult> {
    const industryData = await onetAPI.getOccupationSkills(occupation);
    
    return {
      userSkills: userSkills.map(skill => ({
        ...skill,
        marketDemand: this.calculateDemand(skill, industryData),
        percentile: this.calculatePercentile(skill, industryData),
        salaryImpact: this.estimateSalaryImpact(skill)
      }))
    };
  }
  
  async getSkillGaps(userId: string, targetRole: string) {
    const userSkills = await getUserSkills(userId);
    const roleRequirements = await onetAPI.getRequiredSkills(targetRole);
    
    return {
      missingSkills: this.findGaps(userSkills, roleRequirements),
      recommendations: this.generateRecommendations(userSkills, targetRole)
    };
  }
}
```

### ESCO Dataset Integration
```typescript
interface ESCOSkill {
  uri: string;
  preferredLabel: string;
  alternativeLabels: string[];
  skillType: 'skill' | 'competence' | 'knowledge';
  reuseLevel: 'cross-sectoral' | 'sector-specific' | 'occupation-specific';
}

// Map user skills to ESCO taxonomy
async function mapToESCO(userSkill: string): Promise<ESCOSkill[]> {
  const matches = await escoAPI.search({
    text: userSkill,
    type: 'skill',
    language: 'en'
  });
  
  return matches.filter(m => m.similarity > 0.75);
}
```

---

## 6. Secure User Profile Storage

### Encryption Strategy
```typescript
// User data encryption
interface EncryptedProfile {
  id: UUID;
  encryptedData: string; // AES-256-GCM encrypted
  encryptionKeyId: string; // Reference to user's key
  iv: string;
  authTag: string;
}

class ProfileEncryption {
  async encrypt(profile: UserProfile): Promise<EncryptedProfile> {
    const key = await this.getUserEncryptionKey(profile.id);
    const iv = crypto.getRandomValues(new Uint8Array(16));
    
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv, tagLength: 128 },
      key,
      new TextEncoder().encode(JSON.stringify(profile))
    );
    
    return {
      id: profile.id,
      encryptedData: Buffer.from(encrypted).toString('base64'),
      encryptionKeyId: key.id,
      iv: Buffer.from(iv).toString('base64'),
      authTag: this.extractAuthTag(encrypted)
    };
  }
}
```

### GDPR Compliance
```sql
-- Consent management table
CREATE TABLE user_consent (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  consent_type TEXT NOT NULL,
  granted BOOLEAN DEFAULT false,
  granted_at TIMESTAMP,
  revoked_at TIMESTAMP,
  ip_address INET,
  user_agent TEXT
);

-- Data retention policy
CREATE TABLE data_retention_policy (
  user_id UUID PRIMARY KEY REFERENCES users(id),
  retention_period INTERVAL DEFAULT '2 years',
  auto_delete BOOLEAN DEFAULT true,
  last_activity TIMESTAMP
);

-- Right to be forgotten
CREATE OR REPLACE FUNCTION delete_user_data(p_user_id UUID) 
RETURNS void AS $$
BEGIN
  DELETE FROM skill_analysis WHERE user_id = p_user_id;
  DELETE FROM user_documents WHERE user_id = p_user_id;
  DELETE FROM user_consent WHERE user_id = p_user_id;
  UPDATE users SET 
    email = 'deleted@deleted.com',
    name = 'DELETED',
    data = '{}'
  WHERE id = p_user_id;
END;
$$ LANGUAGE plpgsql;
```

### Row Level Security (RLS)
```sql
-- Enable RLS on all user tables
ALTER TABLE skill_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can only access their own data"
  ON skill_analysis
  FOR ALL
  USING (auth.uid() = user_id);

CREATE POLICY "Users can only update their own profile"
  ON user_profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
```

---

## 7. Performance Optimization

### Lazy Loading Strategy
```typescript
// Lazy load skill graphs
const SkillsChart = lazy(() => import('@/components/SkillsChart'));

// Progressive rendering for large datasets
const SkillsList = ({ skills }: { skills: Skill[] }) => {
  const [visibleCount, setVisibleCount] = useState(20);
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setVisibleCount(prev => prev + 20);
      }
    });
    
    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);
  
  return (
    <>
      {skills.slice(0, visibleCount).map(skill => (
        <SkillTag key={skill.id} skill={skill} />
      ))}
      <div ref={sentinelRef} />
    </>
  );
};
```

### Caching Strategy
```typescript
// Redis cache for frequently accessed data
interface CacheStrategy {
  userProfile: { ttl: 3600, invalidateOn: ['profile_update'] };
  skillAnalysis: { ttl: 7200, invalidateOn: ['skill_update', 'cv_upload'] };
  benchmarkData: { ttl: 86400, invalidateOn: ['never'] };
}

// Edge function with caching
export async function GET(request: Request) {
  const userId = getUserId(request);
  const cacheKey = `profile:${userId}`;
  
  // Try cache first
  const cached = await redis.get(cacheKey);
  if (cached) return Response.json(JSON.parse(cached));
  
  // Fetch from database
  const profile = await fetchProfile(userId);
  
  // Cache for 1 hour
  await redis.setex(cacheKey, 3600, JSON.stringify(profile));
  
  return Response.json(profile);
}
```

### Database Optimization
```sql
-- Materialized view for analytics
CREATE MATERIALIZED VIEW skill_analytics AS
SELECT 
  skill_name,
  COUNT(*) as user_count,
  AVG(confidence_score) as avg_confidence,
  COUNT(*) FILTER (WHERE confidence_score > 80) as high_confidence_count
FROM skill_analysis
GROUP BY skill_name;

CREATE INDEX idx_skill_analytics ON skill_analytics(skill_name);

-- Refresh strategy
CREATE OR REPLACE FUNCTION refresh_skill_analytics()
RETURNS void AS $$
BEGIN
  REFRESH MATERIALIZED VIEW CONCURRENTLY skill_analytics;
END;
$$ LANGUAGE plpgsql;

-- Schedule refresh (every 6 hours)
SELECT cron.schedule('refresh-analytics', '0 */6 * * *', 'SELECT refresh_skill_analytics()');
```

---

## 8. Export & Share Functions

### PDF Export
```typescript
// Edge Function: generate-pdf
import { jsPDF } from 'jspdf';
import { htmlToImage } from 'html-to-image';

interface PDFExportOptions {
  template: 'professional' | 'creative' | 'minimal';
  sections: string[];
  includeQRCode: boolean;
}

async function generatePDF(userId: string, options: PDFExportOptions) {
  const profile = await fetchProfile(userId);
  const skills = await fetchSkills(userId);
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  
  // Header
  pdf.setFontSize(24);
  pdf.text(profile.name, 20, 30);
  
  // Skills section
  pdf.setFontSize(16);
  pdf.text('Skills', 20, 50);
  
  let yPos = 60;
  skills.forEach(skill => {
    pdf.setFontSize(12);
    pdf.text(`${skill.name} - ${skill.confidence}%`, 25, yPos);
    yPos += 7;
  });
  
  // QR code for profile link
  if (options.includeQRCode) {
    const qrCode = await generateQRCode(profile.publicUrl);
    pdf.addImage(qrCode, 'PNG', 160, 20, 40, 40);
  }
  
  return pdf.output('blob');
}
```

### Public Profile Pages
```typescript
// Dynamic route: /profile/[username]
interface PublicProfile {
  username: string;
  name: string;
  bio: string;
  skills: Skill[];
  visibility: 'public' | 'unlisted' | 'private';
  customDomain?: string;
}

// Access control
function checkProfileAccess(profile: PublicProfile, viewerId?: string) {
  if (profile.visibility === 'public') return true;
  if (profile.visibility === 'unlisted') return true; // Anyone with link
  if (profile.visibility === 'private') return viewerId === profile.userId;
  return false;
}
```

### JSON Export
```typescript
// Standardized skill data format (JSON Resume compatible)
interface SkillExport {
  version: '1.0.0';
  basics: {
    name: string;
    label: string;
    email: string;
    summary: string;
  };
  skills: {
    name: string;
    level: string;
    confidence: number;
    keywords: string[];
    evidence: Evidence[];
  }[];
  meta: {
    exportedAt: string;
    source: 'skillsense';
  };
}

export async function exportToJSON(userId: string): Promise<SkillExport> {
  const data = await fetchAllUserData(userId);
  
  return {
    version: '1.0.0',
    basics: data.profile,
    skills: data.skills.map(s => ({
      name: s.name,
      level: getSkillLevel(s.confidence),
      confidence: s.confidence,
      keywords: s.keywords,
      evidence: s.evidence
    })),
    meta: {
      exportedAt: new Date().toISOString(),
      source: 'skillsense'
    }
  };
}
```

---

## 9. Analytics & Tracking

### Event Tracking Schema
```typescript
interface AnalyticsEvent {
  event: string;
  userId: string;
  timestamp: string;
  properties: Record<string, any>;
}

// Track key metrics
const trackingEvents = {
  SKILL_CONFIRMED: 'skill_confirmed',
  SKILL_REJECTED: 'skill_rejected',
  SKILL_EDITED: 'skill_edited',
  PROFILE_VIEWED: 'profile_viewed',
  EXPORT_GENERATED: 'export_generated',
  BENCHMARK_VIEWED: 'benchmark_viewed'
};

// Analytics service
class Analytics {
  async track(event: string, properties: any) {
    await supabase.from('analytics_events').insert({
      event,
      user_id: properties.userId,
      timestamp: new Date().toISOString(),
      properties
    });
  }
  
  async getSkillAccuracy(timeRange: DateRange) {
    const { data } = await supabase.rpc('calculate_skill_accuracy', {
      start_date: timeRange.start,
      end_date: timeRange.end
    });
    
    return {
      confirmationRate: data.confirmed / data.total,
      editRate: data.edited / data.total,
      rejectionRate: data.rejected / data.total
    };
  }
}
```

### Dashboard Metrics
```sql
-- Analytics dashboard query
CREATE OR REPLACE FUNCTION get_dashboard_metrics(p_user_id UUID)
RETURNS TABLE (
  total_skills INT,
  confirmed_skills INT,
  avg_confidence DECIMAL,
  profile_views INT,
  last_updated TIMESTAMP
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    COUNT(*)::INT as total_skills,
    COUNT(*) FILTER (WHERE user_confirmed = true)::INT as confirmed_skills,
    AVG(confidence_score) as avg_confidence,
    (SELECT COUNT(*) FROM profile_views WHERE user_id = p_user_id)::INT as profile_views,
    MAX(updated_at) as last_updated
  FROM skill_analysis
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql;
```

---

## 10. System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Frontend (React)                         │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐       │
│  │Dashboard │  │ Profile  │  │ Analytics│  │  Export  │       │
│  └────┬─────┘  └────┬─────┘  └────┬─────┘  └────┬─────┘       │
└───────┼─────────────┼─────────────┼─────────────┼──────────────┘
        │             │             │             │
        └─────────────┴─────────────┴─────────────┘
                      │
        ┌─────────────┴─────────────┐
        │      API Gateway           │
        │    (Edge Functions)        │
        └─────────────┬─────────────┘
                      │
        ┌─────────────┴─────────────────────────────────┐
        │                                                 │
┌───────▼────────┐  ┌──────────────┐  ┌────────────────▼───┐
│   AI Service   │  │  Supabase    │  │  External APIs     │
│                │  │              │  │                    │
│ - NLP Model    │  │ - PostgreSQL │  │ - LinkedIn         │
│ - Skill Extract│  │ - Storage    │  │ - O*NET            │
│ - Confidence   │  │ - Auth       │  │ - ESCO             │
│ - Training     │  │ - RLS        │  │ - Google Drive     │
└────────────────┘  └──────┬───────┘  └────────────────────┘
                           │
                    ┌──────▼───────┐
                    │    Redis     │
                    │    Cache     │
                    └──────────────┘
```

---

## 11. Implementation Roadmap

### Phase 1: Foundation (Weeks 1-2)
- [ ] Set up Lovable Cloud backend
- [ ] Implement user authentication
- [ ] Create database schema
- [ ] Set up RLS policies
- [ ] Implement basic skill storage

### Phase 2: AI Integration (Weeks 3-4)
- [ ] Integrate AI skill extraction
- [ ] Implement confidence scoring
- [ ] Build evidence tracking
- [ ] Create skill explainability UI

### Phase 3: External Integrations (Weeks 5-6)
- [ ] LinkedIn OAuth integration
- [ ] Google Drive sync
- [ ] O*NET API integration
- [ ] ESCO dataset integration

### Phase 4: User Features (Weeks 7-8)
- [ ] Editable skill tags
- [ ] Feedback loop implementation
- [ ] Benchmark comparisons
- [ ] Analytics dashboard

### Phase 5: Export & Sharing (Weeks 9-10)
- [ ] PDF export functionality
- [ ] Public profile pages
- [ ] JSON export
- [ ] Social sharing

### Phase 6: Optimization (Weeks 11-12)
- [ ] Performance optimization
- [ ] Caching implementation
- [ ] Security audit
- [ ] GDPR compliance verification

---

## 12. Technology Stack Summary

### Frontend
- **Framework**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: TanStack Query
- **Routing**: React Router v6
- **Forms**: React Hook Form + Zod

### Backend (Lovable Cloud)
- **Database**: PostgreSQL (Supabase)
- **Authentication**: Supabase Auth
- **Storage**: Supabase Storage
- **Edge Functions**: Supabase Edge Functions (Deno)
- **Real-time**: WebSockets via Supabase

### AI/ML
- **NLP**: OpenAI GPT-4 / Anthropic Claude
- **Training**: Incremental learning pipeline
- **Vector Search**: pgvector for similarity matching

### External Services
- **LinkedIn**: OAuth 2.0 + REST API
- **Google Drive**: Drive API v3
- **O*NET**: Web Services API
- **ESCO**: RDF/XML endpoint

### Infrastructure
- **Caching**: Redis (Upstash)
- **CDN**: Cloudflare
- **Monitoring**: Sentry + PostHog
- **CI/CD**: GitHub Actions

---

## Security Considerations

### Data Protection
- AES-256-GCM encryption for sensitive data
- TLS 1.3 for all communications
- HTTPS-only cookies with secure flags
- Content Security Policy (CSP) headers

### Authentication
- JWT-based sessions
- Refresh token rotation
- MFA support (TOTP)
- Rate limiting on auth endpoints

### Authorization
- Row Level Security (RLS) on all tables
- API key rotation policy
- Principle of least privilege
- Audit logging for sensitive operations

---

## Monitoring & Observability

### Key Metrics
- API response times (p50, p95, p99)
- AI processing duration
- Cache hit rates
- Error rates by endpoint
- User engagement metrics

### Alerting Rules
- API latency > 1000ms
- Error rate > 5%
- Database connection pool exhaustion
- Failed authentication attempts > 10/min
- Storage usage > 80%

---

## Cost Estimation (Monthly)

| Service | Usage | Estimated Cost |
|---------|-------|---------------|
| Lovable Cloud (Database) | 10GB | $25 |
| AI API Calls | 10,000 requests | $100 |
| Storage | 50GB | $10 |
| Bandwidth | 1TB | $20 |
| Redis Cache | 1GB | $10 |
| **Total** | | **$165/month** |

*Scales with usage, free tier available for early development*

---

## Next Steps

1. **Enable Lovable Cloud** - Set up backend infrastructure
2. **Create Database Schema** - Implement tables and RLS policies
3. **Implement AI Pipeline** - Build skill extraction service
4. **Develop MVP Features** - Core functionality first
5. **Test & Iterate** - User testing and refinement
6. **Scale & Optimize** - Performance tuning as needed

This architecture is designed to be **modular**, **scalable**, and **maintainable**, allowing for incremental development while maintaining high code quality and security standards.
