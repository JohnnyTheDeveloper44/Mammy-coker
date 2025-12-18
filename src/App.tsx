import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Landing from "./pages/Landing";
import Auth from "./pages/Auth";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ProfessionalOnboarding from "./pages/ProfessionalOnboarding";
import EmployerOnboarding from "./pages/EmployerOnboarding";
import ProfessionalDashboard from "./pages/ProfessionalDashboard";
import ProfessionalSettings from "./pages/ProfessionalSettings";
import ProfessionalProfileEdit from "./pages/ProfessionalProfileEdit";
import ProfessionalCertificates from "./pages/ProfessionalCertificates";
import ProfessionalInvitations from "./pages/ProfessionalInvitations";
import ProfessionalApplications from "./pages/ProfessionalApplications";
import EmployerDashboard from "./pages/EmployerDashboard";
import EmployerSettings from "./pages/EmployerSettings";
import CreateJob from "./pages/CreateJob";
import EditJob from "./pages/EditJob";
import EmployerJobs from "./pages/EmployerJobs";
import SavedProfessionals from "./pages/SavedProfessionals";
import SavedJobs from "./pages/SavedJobs";
import JobApplicants from "./pages/JobApplicants";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";
import Professionals from "./pages/Professionals";
import ProfessionalProfile from "./pages/ProfessionalProfile";
import CompanyProfile from "./pages/CompanyProfile";
import Messages from "./pages/Messages";
import AdminDashboard from "./pages/AdminDashboard";
import NotificationSettings from "./pages/NotificationSettings";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/professionals" element={<Professionals />} />
              <Route path="/professionals/:id" element={<ProfessionalProfile />} />
              <Route path="/companies/:id" element={<CompanyProfile />} />
              
              {/* Notification Settings - Protected */}
              <Route path="/notifications/settings" element={
                <ProtectedRoute>
                  <NotificationSettings />
                </ProtectedRoute>
              } />
              
              {/* Professional Routes - Protected */}
              <Route path="/onboarding/professional" element={<ProfessionalOnboarding />} />
              <Route path="/dashboard/professional" element={
                <ProtectedRoute allowedRoles={['professional']}>
                  <ProfessionalDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/professional/settings" element={
                <ProtectedRoute allowedRoles={['professional']}>
                  <ProfessionalSettings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/professional/profile" element={
                <ProtectedRoute allowedRoles={['professional']}>
                  <ProfessionalProfileEdit />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/professional/certificates" element={
                <ProtectedRoute allowedRoles={['professional']}>
                  <ProfessionalCertificates />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/professional/invitations" element={
                <ProtectedRoute allowedRoles={['professional']}>
                  <ProfessionalInvitations />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/professional/applications" element={
                <ProtectedRoute allowedRoles={['professional']}>
                  <ProfessionalApplications />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/professional/saved-jobs" element={
                <ProtectedRoute allowedRoles={['professional']}>
                  <SavedJobs />
                </ProtectedRoute>
              } />

              {/* Employer Routes - Protected */}
              <Route path="/onboarding/employer" element={<EmployerOnboarding />} />
              <Route path="/dashboard/employer" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerDashboard />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/employer/settings" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerSettings />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/employer/create-job" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <CreateJob />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/employer/jobs/:id/edit" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EditJob />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/employer/jobs" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <EmployerJobs />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/employer/saved" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <SavedProfessionals />
                </ProtectedRoute>
              } />
              <Route path="/dashboard/employer/jobs/:id/applicants" element={
                <ProtectedRoute allowedRoles={['employer']}>
                  <JobApplicants />
                </ProtectedRoute>
              } />

              {/* Admin Routes - Protected */}
              <Route path="/dashboard/admin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />

              {/* Messages - Protected */}
              <Route path="/messages" element={
                <ProtectedRoute>
                  <Messages />
                </ProtectedRoute>
              } />

              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
