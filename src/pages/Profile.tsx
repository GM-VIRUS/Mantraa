import { useState } from "react";
import {
  MapPin,
  Calendar,
  BookOpen,
  Trophy,
  Flame,
  Star,
  CheckCircle,
  Clock,
  Edit3,
  Camera,
  Award,
  TrendingUp,
  Play,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";

// ── Types ────────────────────────────────────────────────────────────────────

interface Course {
  id: number;
  title: string;
  instructor: string;
  progress: number;
  thumbnail: string;
  category: string;
  duration: string;
  completed: boolean;
}

interface Achievement {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  earned: boolean;
  date?: string;
  color: string;
}

interface ActivityItem {
  id: number;
  type: "lesson" | "achievement" | "comment" | "enrollment";
  message: string;
  time: string;
  icon: React.ReactNode;
  color: string;
}

// ── Static data ──────────────────────────────────────────────────────────────

const courses: Course[] = [
  {
    id: 1,
    title: "Complete React Developer in 2024",
    instructor: "Andrei Neagoie",
    progress: 72,
    thumbnail: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=300&h=180&fit=crop",
    category: "Web Dev",
    duration: "40h",
    completed: false,
  },
  {
    id: 2,
    title: "UI/UX Design Masterclass",
    instructor: "Sarah Johnson",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=300&h=180&fit=crop",
    category: "Design",
    duration: "28h",
    completed: true,
  },
  {
    id: 3,
    title: "TypeScript Fundamentals",
    instructor: "Matt Pocock",
    progress: 45,
    thumbnail: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=300&h=180&fit=crop",
    category: "Web Dev",
    duration: "18h",
    completed: false,
  },
  {
    id: 4,
    title: "Machine Learning A-Z",
    instructor: "Kirill Eremenko",
    progress: 100,
    thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=300&h=180&fit=crop",
    category: "AI/ML",
    duration: "44h",
    completed: true,
  },
  {
    id: 5,
    title: "Node.js: The Complete Guide",
    instructor: "Maximilian Schwarzmüller",
    progress: 18,
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=300&h=180&fit=crop",
    category: "Backend",
    duration: "36h",
    completed: false,
  },
  {
    id: 6,
    title: "Data Structures & Algorithms",
    instructor: "Colt Steele",
    progress: 88,
    thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=300&h=180&fit=crop",
    category: "CS",
    duration: "22h",
    completed: false,
  },
];

const achievements: Achievement[] = [
  {
    id: 1,
    title: "First Steps",
    description: "Completed your first lesson",
    icon: <Play className="h-6 w-6" />,
    earned: true,
    date: "Jan 15, 2024",
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 2,
    title: "Course Champion",
    description: "Completed 5 courses",
    icon: <Trophy className="h-6 w-6" />,
    earned: true,
    date: "Mar 2, 2024",
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    title: "Hot Streak",
    description: "30-day learning streak",
    icon: <Flame className="h-6 w-6" />,
    earned: true,
    date: "Apr 10, 2024",
    color: "bg-orange-100 text-orange-600",
  },
  {
    id: 4,
    title: "Star Student",
    description: "Received 10 instructor kudos",
    icon: <Star className="h-6 w-6" />,
    earned: true,
    date: "May 5, 2024",
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 5,
    title: "Speed Learner",
    description: "Finished a course in under 7 days",
    icon: <TrendingUp className="h-6 w-6" />,
    earned: false,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 6,
    title: "Perfect Score",
    description: "Scored 100% on a quiz",
    icon: <CheckCircle className="h-6 w-6" />,
    earned: false,
    color: "bg-teal-100 text-teal-600",
  },
  {
    id: 7,
    title: "Mentor",
    description: "Helped 5 fellow learners",
    icon: <MessageSquare className="h-6 w-6" />,
    earned: false,
    color: "bg-pink-100 text-pink-600",
  },
  {
    id: 8,
    title: "Grand Master",
    description: "Completed 20 courses",
    icon: <Award className="h-6 w-6" />,
    earned: false,
    color: "bg-indigo-100 text-indigo-600",
  },
];

const activityFeed: ActivityItem[] = [
  {
    id: 1,
    type: "lesson",
    message: 'Completed lesson "React Hooks Deep Dive" in React Developer course',
    time: "2 hours ago",
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 2,
    type: "achievement",
    message: 'Earned the "Hot Streak" achievement — 30 days in a row!',
    time: "Yesterday",
    icon: <Trophy className="h-4 w-4" />,
    color: "bg-yellow-100 text-yellow-600",
  },
  {
    id: 3,
    type: "enrollment",
    message: 'Enrolled in "Node.js: The Complete Guide"',
    time: "3 days ago",
    icon: <BookOpen className="h-4 w-4" />,
    color: "bg-blue-100 text-blue-600",
  },
  {
    id: 4,
    type: "lesson",
    message: 'Completed 5 lessons in "Data Structures & Algorithms"',
    time: "4 days ago",
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-green-100 text-green-600",
  },
  {
    id: 5,
    type: "comment",
    message: 'Left a review on "UI/UX Design Masterclass" — ★★★★★',
    time: "1 week ago",
    icon: <MessageSquare className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 6,
    type: "achievement",
    message: 'Earned the "Star Student" achievement',
    time: "1 week ago",
    icon: <Star className="h-4 w-4" />,
    color: "bg-purple-100 text-purple-600",
  },
  {
    id: 7,
    type: "lesson",
    message: 'Completed "Machine Learning A-Z" course — 100%!',
    time: "2 weeks ago",
    icon: <CheckCircle className="h-4 w-4" />,
    color: "bg-green-100 text-green-600",
  },
];

// ── Profile component ─────────────────────────────────────────────────────────

export default function Profile() {
  const { toast } = useToast();

  const [profileData, setProfileData] = useState({
    name: "Alex Rivera",
    username: "@alexrivera",
    bio: "Passionate software engineer and lifelong learner. Building the future one line of code at a time. 🚀",
    location: "San Francisco, CA",
    joinDate: "January 2024",
    website: "https://alexrivera.dev",
  });

  const [formData, setFormData] = useState(profileData);
  const [dialogOpen, setDialogOpen] = useState(false);

  const stats = [
    { label: "Enrolled", value: courses.length, icon: <BookOpen className="h-5 w-5" />, color: "text-blue-600 bg-blue-100" },
    { label: "Completed", value: courses.filter((c) => c.completed).length, icon: <CheckCircle className="h-5 w-5" />, color: "text-green-600 bg-green-100" },
    { label: "Achievements", value: achievements.filter((a) => a.earned).length, icon: <Trophy className="h-5 w-5" />, color: "text-yellow-600 bg-yellow-100" },
    { label: "Day Streak", value: 34, icon: <Flame className="h-5 w-5" />, color: "text-orange-600 bg-orange-100" },
  ];

  const handleSave = () => {
    setProfileData(formData);
    setDialogOpen(false);
    toast({ title: "Profile updated!", description: "Your changes have been saved." });
  };

  return (
    <div className="min-h-screen bg-mantra-background">
      {/* Cover banner */}
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-r from-mantra-primary via-[#818CF8] to-[#A78BFA] md:h-64">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wOCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0wLTZoNnY2aC02di02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-40" />
        <button
          className="absolute bottom-3 right-4 flex items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white backdrop-blur hover:bg-black/50 transition-colors"
          aria-label="Change cover photo"
        >
          <Camera className="h-3.5 w-3.5" />
          Change cover
        </button>
      </div>

      <div className="container">
        {/* Profile header card */}
        <div className="relative -mt-16 mb-6 rounded-xl border bg-white shadow-sm">
          <div className="p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              {/* Avatar + info */}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                <div className="relative -mt-20 sm:-mt-24">
                  <Avatar className="h-28 w-28 border-4 border-white shadow-md sm:h-36 sm:w-36">
                    <AvatarImage
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
                      alt={profileData.name}
                    />
                    <AvatarFallback className="bg-mantra-primary text-white text-3xl font-bold">
                      AR
                    </AvatarFallback>
                  </Avatar>
                  <button
                    className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-mantra-primary text-white shadow hover:bg-mantra-primary-hover transition-colors"
                    aria-label="Change profile photo"
                  >
                    <Camera className="h-4 w-4" />
                  </button>
                </div>

                <div className="pb-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-2xl font-bold text-mantra-dark-text">{profileData.name}</h1>
                    <Badge className="bg-mantra-light-blue text-mantra-primary border-0 text-xs">
                      Pro Learner
                    </Badge>
                  </div>
                  <p className="text-sm text-mantra-light-text">{profileData.username}</p>
                  <p className="mt-1 max-w-md text-sm text-mantra-dark-text">{profileData.bio}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-mantra-light-text">
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      {profileData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      Joined {profileData.joinDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Edit profile dialog */}
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="border-mantra-primary text-mantra-primary hover:bg-mantra-light-blue self-start sm:self-end"
                    onClick={() => setFormData(profileData)}
                  >
                    <Edit3 className="mr-2 h-4 w-4" />
                    Edit Profile
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[480px]">
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-2">
                    <div className="grid gap-1.5">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="username">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-1.5">
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={formData.location}
                          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        />
                      </div>
                      <div className="grid gap-1.5">
                        <Label htmlFor="website">Website</Label>
                        <Input
                          id="website"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button
                      className="bg-mantra-primary hover:bg-mantra-primary-hover"
                      onClick={handleSave}
                    >
                      Save Changes
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <Separator className="my-5" />

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-lg bg-gray-50 p-3"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${stat.color}`}>
                    {stat.icon}
                  </div>
                  <div>
                    <p className="text-xl font-bold text-mantra-dark-text">{stat.value}</p>
                    <p className="text-xs text-mantra-light-text">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="courses" className="pb-16">
          <TabsList className="mb-6 h-11 bg-white border shadow-sm w-full justify-start gap-1 p-1 rounded-xl">
            <TabsTrigger
              value="courses"
              className="data-[state=active]:bg-mantra-primary data-[state=active]:text-white rounded-lg px-5"
            >
              <BookOpen className="mr-2 h-4 w-4" />
              My Courses
            </TabsTrigger>
            <TabsTrigger
              value="achievements"
              className="data-[state=active]:bg-mantra-primary data-[state=active]:text-white rounded-lg px-5"
            >
              <Trophy className="mr-2 h-4 w-4" />
              Achievements
            </TabsTrigger>
            <TabsTrigger
              value="activity"
              className="data-[state=active]:bg-mantra-primary data-[state=active]:text-white rounded-lg px-5"
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Activity
            </TabsTrigger>
          </TabsList>

          {/* ── My Courses Tab ───────────────────────────────────────────── */}
          <TabsContent value="courses">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-mantra-dark-text">
                All Courses ({courses.length})
              </h2>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {courses.filter((c) => c.completed).length} completed
                </Badge>
                <Badge variant="outline" className="text-xs">
                  {courses.filter((c) => !c.completed).length} in progress
                </Badge>
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card
                  key={course.id}
                  className="overflow-hidden transition-shadow hover:shadow-md group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {course.completed && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                        <div className="flex items-center gap-1.5 rounded-full bg-green-500 px-3 py-1 text-sm font-semibold text-white">
                          <CheckCircle className="h-4 w-4" />
                          Completed
                        </div>
                      </div>
                    )}
                    <Badge className="absolute left-2 top-2 bg-mantra-primary text-white text-xs border-0">
                      {course.category}
                    </Badge>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="mb-1 line-clamp-2 font-semibold text-mantra-dark-text leading-snug">
                      {course.title}
                    </h3>
                    <p className="mb-3 text-xs text-mantra-light-text">{course.instructor}</p>

                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-mantra-light-text flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {course.duration}
                      </span>
                      <span
                        className={`font-semibold ${
                          course.completed ? "text-green-600" : "text-mantra-primary"
                        }`}
                      >
                        {course.progress}%
                      </span>
                    </div>
                    <Progress
                      value={course.progress}
                      className="h-2"
                    />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* ── Achievements Tab ─────────────────────────────────────────── */}
          <TabsContent value="achievements">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-mantra-dark-text">
                Achievements ({achievements.filter((a) => a.earned).length}/{achievements.length}{" "}
                earned)
              </h2>
              <p className="text-sm text-mantra-light-text">
                Keep learning to unlock more achievements!
              </p>
            </div>

            {/* Earned */}
            <div className="mb-8">
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-mantra-light-text">
                Earned
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {achievements
                  .filter((a) => a.earned)
                  .map((achievement) => (
                    <Card
                      key={achievement.id}
                      className="flex flex-col items-center p-5 text-center hover:shadow-md transition-shadow"
                    >
                      <div
                        className={`mb-3 flex h-14 w-14 items-center justify-center rounded-full ${achievement.color}`}
                      >
                        {achievement.icon}
                      </div>
                      <h4 className="font-semibold text-mantra-dark-text">{achievement.title}</h4>
                      <p className="mt-1 text-xs text-mantra-light-text">
                        {achievement.description}
                      </p>
                      {achievement.date && (
                        <Badge
                          variant="outline"
                          className="mt-2 text-xs text-mantra-light-text"
                        >
                          {achievement.date}
                        </Badge>
                      )}
                    </Card>
                  ))}
              </div>
            </div>

            {/* Locked */}
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-mantra-light-text">
                Locked
              </h3>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {achievements
                  .filter((a) => !a.earned)
                  .map((achievement) => (
                    <Card
                      key={achievement.id}
                      className="flex flex-col items-center p-5 text-center opacity-50 grayscale"
                    >
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-400">
                        {achievement.icon}
                      </div>
                      <h4 className="font-semibold text-gray-500">{achievement.title}</h4>
                      <p className="mt-1 text-xs text-gray-400">{achievement.description}</p>
                      <Badge variant="outline" className="mt-2 text-xs text-gray-400">
                        Locked
                      </Badge>
                    </Card>
                  ))}
              </div>
            </div>
          </TabsContent>

          {/* ── Activity Tab ─────────────────────────────────────────────── */}
          <TabsContent value="activity">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-mantra-dark-text">Recent Activity</h2>
              <p className="text-sm text-mantra-light-text">Your latest learning milestones</p>
            </div>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-base">Activity Feed</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-0">
                  {activityFeed.map((item, index) => (
                    <li key={item.id}>
                      <div className="flex gap-4 py-4">
                        <div
                          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${item.color}`}
                        >
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-mantra-dark-text">{item.message}</p>
                          <p className="mt-0.5 flex items-center gap-1 text-xs text-mantra-light-text">
                            <Clock className="h-3 w-3" />
                            {item.time}
                          </p>
                        </div>
                      </div>
                      {index < activityFeed.length - 1 && <Separator />}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
