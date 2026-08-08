import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CMSLayout from "@/components/layout/CMSLayout";
import Index from "./pages/Index";
import Events from "./pages/Events";
import EventEditor from "./pages/EventEditor";
import Sites from "./pages/Sites";
import Microsites from "./pages/Microsites";
import Pages from "./pages/Pages";
import Forms from "./pages/Forms";
import CreateForm from "./pages/CreateForm";
import StallBookings from "./pages/StallBookings";
import Submissions from "./pages/Submissions";
import SubmissionDetail from "./pages/SubmissionDetail";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Wrapper component for pages that need the CMS layout
const WithLayout = ({ children }: { children: React.ReactNode }) => (
  <CMSLayout>{children}</CMSLayout>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route
            path="/events"
            element={
              <WithLayout>
                <Events />
              </WithLayout>
            }
          />
          <Route
            path="/events/:id"
            element={
              <WithLayout>
                <EventEditor />
              </WithLayout>
            }
          />
          <Route
            path="/sites"
            element={
              <WithLayout>
                <Sites />
              </WithLayout>
            }
          />
          <Route
            path="/microsites"
            element={
              <WithLayout>
                <Microsites />
              </WithLayout>
            }
          />
          <Route
            path="/pages"
            element={
              <WithLayout>
                <Pages />
              </WithLayout>
            }
          />
          <Route
            path="/forms"
            element={
              <WithLayout>
                <Forms />
              </WithLayout>
            }
          />
          <Route
            path="/forms/new"
            element={
              <WithLayout>
                <CreateForm />
              </WithLayout>
            }
          />
          <Route
            path="/stalls"
            element={
              <WithLayout>
                <StallBookings />
              </WithLayout>
            }
          />
          <Route
            path="/submissions"
            element={
              <WithLayout>
                <Submissions />
              </WithLayout>
            }
          />
          <Route
            path="/submissions/:id"
            element={
              <WithLayout>
                <SubmissionDetail />
              </WithLayout>
            }
          />
          <Route
            path="/settings"
            element={
              <WithLayout>
                <Settings />
              </WithLayout>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
