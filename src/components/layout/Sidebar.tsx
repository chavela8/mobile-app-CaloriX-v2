
import React from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import {
  BarChart2,
  Calendar,
  ChevronLeft,
  Heart,
  Home,
  Settings,
  Trophy,
  User2,
  Apple,
  Activity,
  Lightbulb,
  Calculator
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

interface SidebarNavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
  isActive?: boolean;
}

function SidebarNavItem({ icon, label, to, isActive }: SidebarNavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors",
          isActive
            ? "bg-accent text-accent-foreground font-medium"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
        )
      }
    >
      {icon}
      <span className="text-sm">{label}</span>
    </NavLink>
  );
}

export function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const { t } = useLanguage();
  const location = useLocation();
  
  return (
    <>
      {/* Overlay for mobile devices */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full w-60 flex-col bg-background border-r transition-transform duration-300 ease-in-out",
          "shadow-lg md:shadow-none", // Shadow only for mobile version
          isOpen ? "translate-x-0" : "-translate-x-full",
          "md:translate-x-0" // Always visible on desktop
        )}
      >
        <div className="flex items-center justify-between border-b px-3 py-2.5">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <Apple className="h-5 w-5 text-primary" />
            <span className="text-lg font-bold">CaloriX</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="md:hidden"
          >
            <ChevronLeft className="h-5 w-5" />
            <span className="sr-only">{t.close}</span>
          </Button>
        </div>
        <ScrollArea className="flex-1 py-1.5">
          <nav className="space-y-0.5 px-1.5">
            <SidebarNavItem
              to="/"
              icon={<Home className="h-4 w-4" />}
              label={t.dashboard}
            />
            <SidebarNavItem
              to="/nutrition"
              icon={<Apple className="h-4 w-4" />}
              label={t.nutrition}
            />
            <SidebarNavItem
              to="/progress"
              icon={<Activity className="h-4 w-4" />}
              label={t.progress}
            />
            <SidebarNavItem
              to="/statistics"
              icon={<BarChart2 className="h-4 w-4" />}
              label={t.statistics}
            />
            <SidebarNavItem
              to="/planner"
              icon={<Calendar className="h-4 w-4" />}
              label={t.mealPlanner}
            />
            <SidebarNavItem
              to="/recipe-calculator"
              icon={<Calculator className="h-4 w-4" />}
              label={t.recipeCalculator}
            />
            <SidebarNavItem
              to="/recommendations"
              icon={<Lightbulb className="h-4 w-4" />}
              label={t.recommendations}
            />
            <SidebarNavItem
              to="/achievements"
              icon={<Trophy className="h-4 w-4" />}
              label={t.achievements}
            />
            <SidebarNavItem
              to="/health"
              icon={<Heart className="h-4 w-4" />}
              label={t.health}
            />
          </nav>
          <Separator className="my-1.5" />
          <nav className="space-y-0.5 px-1.5">
            <SidebarNavItem
              to="/profile"
              icon={<User2 className="h-4 w-4" />}
              label={t.myProfile}
            />
            <SidebarNavItem
              to="/settings"
              icon={<Settings className="h-4 w-4" />}
              label={t.settings}
            />
          </nav>
        </ScrollArea>
      </div>
    </>
  );
}
