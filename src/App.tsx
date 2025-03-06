
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import { TooltipProvider } from "@/components/ui/tooltip";

import Layout from "@/components/layout/Layout";
import Index from "@/pages/Index";
import Nutrition from "@/pages/Nutrition";
import Progress from "@/pages/Progress";
import Planner from "@/pages/Planner";
import Statistics from "@/pages/Statistics";
import Achievements from "@/pages/Achievements";
import Health from "@/pages/Health";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Recommendations from "@/pages/Recommendations";
import RecipeCalculator from "@/pages/RecipeCalculator";
import NotFound from "@/pages/NotFound";

import { Toaster } from "@/components/ui/sonner";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <LanguageProvider>
          <TooltipProvider>
            <Router>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/nutrition" element={<Nutrition />} />
                  <Route path="/progress" element={<Progress />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/planner" element={<Planner />} />
                  <Route path="/recommendations" element={<Recommendations />} />
                  <Route path="/achievements" element={<Achievements />} />
                  <Route path="/health" element={<Health />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/recipe-calculator" element={<RecipeCalculator />} />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
              <Toaster />
            </Router>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
