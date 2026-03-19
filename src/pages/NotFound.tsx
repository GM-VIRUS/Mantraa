import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center bg-mantra-background text-center">
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-mantra-light-blue">
        <span className="text-5xl font-bold text-mantra-primary">404</span>
      </div>
      <h1 className="mb-2 text-3xl font-bold text-mantra-dark-text">Page Not Found</h1>
      <p className="mb-8 max-w-md text-mantra-light-text">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/">
        <Button className="bg-mantra-primary hover:bg-mantra-primary-hover">
          <Home className="mr-2 h-4 w-4" />
          Back to Home
        </Button>
      </Link>
    </div>
  );
}
