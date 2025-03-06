
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Страница не найдена
        </p>
        <Button asChild className="px-8">
          <a href="/">Вернуться на главную</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
