import { Link } from "react-router-dom";
import { GraduationCap, BookOpen, Trophy, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Index() {
  return (
    <div className="min-h-screen bg-mantra-background">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-mantra-primary to-[#4F46E5] py-24 text-white">
        <div className="container relative z-10 text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <GraduationCap className="h-9 w-9 text-white" />
          </div>
          <h1 className="mb-4 text-5xl font-bold tracking-tight">
            Welcome to <span className="text-indigo-200">Mantraa</span>
          </h1>
          <p className="mx-auto mb-8 max-w-xl text-lg text-indigo-100">
            Your gateway to world-class online learning. Explore thousands of courses, earn
            achievements, and advance your career.
          </p>
          <Link to="/profile">
            <Button size="lg" className="bg-white text-mantra-primary hover:bg-indigo-50 font-semibold">
              View Your Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0wLTZoNnY2aC02di02eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      </section>

      {/* Stats */}
      <section className="py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: BookOpen, label: "Courses", value: "10,000+" },
              { icon: Users, label: "Learners", value: "500K+" },
              { icon: Trophy, label: "Certificates", value: "250K+" },
              { icon: GraduationCap, label: "Instructors", value: "2,000+" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="rounded-xl border bg-white p-6 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-mantra-light-blue">
                  <Icon className="h-6 w-6 text-mantra-primary" />
                </div>
                <p className="text-2xl font-bold text-mantra-dark-text">{value}</p>
                <p className="text-sm text-mantra-light-text">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-mantra-light-purple">
        <div className="container text-center">
          <h2 className="mb-4 text-3xl font-bold text-mantra-dark-text">
            Ready to start learning?
          </h2>
          <p className="mb-8 text-mantra-light-text">
            Join millions of learners already on Mantraa.
          </p>
          <Link to="/profile">
            <Button className="bg-mantra-primary hover:bg-mantra-primary-hover">
              Go to Profile <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
