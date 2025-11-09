import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GlassCard } from "@/components/GlassCard";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Briefcase, 
  GraduationCap, 
  ExternalLink,
  CheckCircle2,
  Clock,
  DollarSign,
  MapPin,
  Sparkles,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  salary: string;
  matchScore: number;
  postedDate: string;
  applied: boolean;
}

interface Course {
  id: string;
  title: string;
  provider: string;
  duration: string;
  level: string;
  skillMatch: string[];
  rating: number;
  enrolled?: boolean;
  completed?: boolean;
}

export const SkillsJobsLearnTabs = () => {
  const { toast } = useToast();
  const [newSkill, setNewSkill] = useState("");
  const [applyingJobId, setApplyingJobId] = useState<string | null>(null);
  const [autoApplying, setAutoApplying] = useState(false);
  const [enrollingCourseId, setEnrollingCourseId] = useState<string | null>(null);
  
  // Mock job data
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: "1",
      title: "Senior React Developer",
      company: "TechCorp",
      location: "San Francisco, CA",
      salary: "$150k - $180k",
      matchScore: 95,
      postedDate: "2 days ago",
      applied: false
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "StartupXYZ",
      location: "Remote",
      salary: "$130k - $160k",
      matchScore: 88,
      postedDate: "5 days ago",
      applied: false
    },
    {
      id: "3",
      title: "Frontend Lead",
      company: "BigTech Inc",
      location: "New York, NY",
      salary: "$170k - $200k",
      matchScore: 92,
      postedDate: "1 week ago",
      applied: false
    }
  ]);

  // Mock course data
  const [courses, setCourses] = useState<Course[]>([
    {
      id: "1",
      title: "Advanced TypeScript Patterns",
      provider: "Frontend Masters",
      duration: "6 hours",
      level: "Advanced",
      skillMatch: ["TypeScript", "React.js"],
      rating: 4.8,
      enrolled: false,
      completed: false
    },
    {
      id: "2",
      title: "System Design for Interviews",
      provider: "Educative",
      duration: "12 hours",
      level: "Intermediate",
      skillMatch: ["Cloud Architecture", "API Design"],
      rating: 4.9,
      enrolled: false,
      completed: false
    },
    {
      id: "3",
      title: "Leadership in Tech",
      provider: "Coursera",
      duration: "4 weeks",
      level: "All Levels",
      skillMatch: ["Leadership", "Team Collaboration"],
      rating: 4.7,
      enrolled: false,
      completed: false
    }
  ]);

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;

    // Auto-save skill
    toast({
      title: "Skill Added & Saved",
      description: `"${newSkill}" has been added and saved to your profile.`,
    });
    setNewSkill("");
  };

  const handleApplyJob = async (jobId: string) => {
    setApplyingJobId(jobId);
    
    // Simulate application process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, applied: true } : job
    ));
    
    setApplyingJobId(null);
    
    toast({
      title: "Application Submitted",
      description: "Your application has been sent successfully!",
    });
  };

  const handleAutoApply = async () => {
    const unappliedJobs = jobs.filter(j => !j.applied);
    
    if (unappliedJobs.length === 0) {
      toast({
        title: "No Unapplied Jobs",
        description: "You've already applied to all matching jobs.",
      });
      return;
    }
    
    setAutoApplying(true);
    
    // Simulate auto-apply process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setJobs(prev => prev.map(job => ({ ...job, applied: true })));
    setAutoApplying(false);
    
    toast({
      title: "Auto-Apply Complete",
      description: `Successfully applied to ${unappliedJobs.length} matching positions.`,
    });
  };

  const handleEnrollCourse = async (courseId: string) => {
    setEnrollingCourseId(courseId);
    
    // Simulate enrollment process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setCourses(prev => prev.map(course => 
      course.id === courseId ? { ...course, enrolled: true } : course
    ));
    
    setEnrollingCourseId(null);
    
    toast({
      title: "Enrollment Successful",
      description: "You've been enrolled in the course!",
    });
  };

  // Separate jobs into applied and unapplied
  const appliedJobs = jobs.filter(job => job.applied);
  const unappliedJobs = jobs.filter(job => !job.applied);

  // Separate courses into categories
  const enrolledCourses = courses.filter(c => c.enrolled && !c.completed);
  const completedCourses = courses.filter(c => c.completed);
  const availableCourses = courses.filter(c => !c.enrolled && !c.completed);

  return (
    <GlassCard className="animate-fade-in" style={{ animationDelay: "400ms" }}>
      <Tabs defaultValue="skills" className="w-full">
        <TabsList className="grid grid-cols-3 w-full mb-6">
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="courses">Courses</TabsTrigger>
        </TabsList>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add New Skill
            </h3>
            <div className="flex gap-2">
              <Input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddSkill()}
                placeholder="e.g., Docker, GraphQL, AWS..."
                className="rounded-2xl"
              />
              <Button
                onClick={handleAddSkill}
                className="rounded-2xl gradient-primary text-white"
              >
                Add
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Skills are automatically saved when added
            </p>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Suggested Skills to Learn
            </h3>
            {[
              { name: "GraphQL", reason: "Complements your API Design skills", demand: "High" },
              { name: "Kubernetes", reason: "Extends Cloud Architecture knowledge", demand: "Very High" },
              { name: "System Design", reason: "Essential for senior roles", demand: "High" }
            ].map((skill, idx) => (
              <div
                key={idx}
                className="bg-muted/50 rounded-2xl p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">{skill.name}</h4>
                  <Badge variant="secondary">{skill.demand} Demand</Badge>
                </div>
                <p className="text-xs text-muted-foreground">{skill.reason}</p>
                <Button size="sm" variant="outline" className="rounded-2xl w-full">
                  Explore Courses
                </Button>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* Jobs Tab */}
        <TabsContent value="jobs" className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Matching Opportunities
            </h3>
            <Button
              onClick={handleAutoApply}
              size="sm"
              disabled={autoApplying || unappliedJobs.length === 0}
              className="rounded-2xl gradient-primary text-white"
            >
              {autoApplying ? (
                <>
                  <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                  Applying...
                </>
              ) : (
                <>
                  <Sparkles className="w-3 h-3 mr-2" />
                  Auto-Apply All
                </>
              )}
            </Button>
          </div>

          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {/* Unapplied Jobs */}
              {unappliedJobs.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground">Available Positions</h4>
                  {unappliedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-muted/50 rounded-2xl p-4 space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge className="gradient-primary text-white">
                          {job.matchScore}% Match
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.postedDate}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          onClick={() => handleApplyJob(job.id)}
                          disabled={applyingJobId === job.id}
                          className="rounded-2xl flex-1 gradient-primary text-white"
                        >
                          {applyingJobId === job.id ? (
                            <>
                              <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                              Applying...
                            </>
                          ) : (
                            "Quick Apply"
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-2xl"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Applied Jobs */}
              {appliedJobs.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground">Applied Positions</h4>
                  {appliedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="bg-muted/50 rounded-2xl p-4 space-y-3 opacity-75"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold">{job.title}</h4>
                          <p className="text-sm text-muted-foreground">{job.company}</p>
                        </div>
                        <Badge className="gradient-primary text-white">
                          {job.matchScore}% Match
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {job.salary}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {job.postedDate}
                        </div>
                      </div>

                      <div className="flex gap-2 mt-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-2xl flex-1"
                          disabled
                        >
                          <CheckCircle2 className="w-3 h-3 mr-2 text-green-500" />
                          Applied
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="rounded-2xl"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ScrollArea>
        </TabsContent>

        {/* Courses Tab */}
        <TabsContent value="courses" className="space-y-4">
          <h3 className="font-semibold flex items-center gap-2">
            <GraduationCap className="w-4 h-4" />
            Recommended Courses
          </h3>

          <ScrollArea className="h-[500px] pr-4">
            <div className="space-y-6">
              {/* Currently Enrolled Courses */}
              {enrolledCourses.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground">Currently Enrolled</h4>
                  {enrolledCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-muted/50 rounded-2xl p-4 space-y-3 border-2 border-primary/20"
                    >
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.provider}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{course.level}</Badge>
                        <Badge variant="outline">{course.duration}</Badge>
                        <Badge variant="outline">⭐ {course.rating}</Badge>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Strengthens:</p>
                        <div className="flex flex-wrap gap-1">
                          {course.skillMatch.map((skill, idx) => (
                            <Badge key={idx} className="text-xs bg-accent/10 text-accent border-accent/20">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-2xl w-full mt-2"
                        disabled
                      >
                        <CheckCircle2 className="w-3 h-3 mr-2 text-green-500" />
                        Enrolled
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Completed Courses */}
              {completedCourses.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground">Completed</h4>
                  {completedCourses.map((course) => (
                    <div
                      key={course.id}
                      className="bg-muted/50 rounded-2xl p-4 space-y-3 opacity-75"
                    >
                      <div>
                        <h4 className="font-semibold">{course.title}</h4>
                        <p className="text-sm text-muted-foreground">{course.provider}</p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary">{course.level}</Badge>
                        <Badge variant="outline">{course.duration}</Badge>
                        <Badge variant="outline">⭐ {course.rating}</Badge>
                      </div>

                      <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Strengthens:</p>
                        <div className="flex flex-wrap gap-1">
                          {course.skillMatch.map((skill, idx) => (
                            <Badge key={idx} className="text-xs bg-accent/10 text-accent border-accent/20">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <Button
                        size="sm"
                        variant="outline"
                        className="rounded-2xl w-full mt-2"
                        disabled
                      >
                        <CheckCircle2 className="w-3 h-3 mr-2 text-green-500" />
                        Completed
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {/* Available Courses */}
              <div className="space-y-3">
                <h4 className="text-sm font-semibold text-muted-foreground">Available Courses</h4>
                {availableCourses.map((course) => (
                  <div
                    key={course.id}
                    className="bg-muted/50 rounded-2xl p-4 space-y-3"
                  >
                    <div>
                      <h4 className="font-semibold">{course.title}</h4>
                      <p className="text-sm text-muted-foreground">{course.provider}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{course.level}</Badge>
                      <Badge variant="outline">{course.duration}</Badge>
                      <Badge variant="outline">⭐ {course.rating}</Badge>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs text-muted-foreground">Strengthens:</p>
                      <div className="flex flex-wrap gap-1">
                        {course.skillMatch.map((skill, idx) => (
                          <Badge key={idx} className="text-xs bg-accent/10 text-accent border-accent/20">
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button
                      size="sm"
                      onClick={() => handleEnrollCourse(course.id)}
                      disabled={enrollingCourseId === course.id}
                      className="rounded-2xl w-full gradient-primary text-white mt-2"
                    >
                      {enrollingCourseId === course.id ? (
                        <>
                          <Loader2 className="w-3 h-3 mr-2 animate-spin" />
                          Enrolling...
                        </>
                      ) : (
                        <>
                          <GraduationCap className="w-3 h-3 mr-2" />
                          Enroll Now
                        </>
                      )}
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </GlassCard>
  );
};