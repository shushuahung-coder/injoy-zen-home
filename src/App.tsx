import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "./components/ScrollToTop";
import { MobileReserveBar } from "./components/MobileReserveBar";
import Index from "./pages/Index";

// Lazy-loaded pages — only fetched when the user navigates to them
const About = lazy(() => import("./pages/About"));
const Dining = lazy(() => import("./pages/Dining"));
const Space = lazy(() => import("./pages/Space"));
const Life = lazy(() => import("./pages/Life"));
const Shop = lazy(() => import("./pages/Shop"));
const Location = lazy(() => import("./pages/Location"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ScrollToTop />
        <Suspense fallback={<div className="min-h-screen bg-background" />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/dining" element={<Dining />} />
            <Route path="/space" element={<Space />} />
            <Route path="/life" element={<Life />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/location" element={<Location />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <MobileReserveBar />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
