
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import ReportPage from "./pages/ReportPage";
import EmergencyPage from "./pages/EmergencyPage";
import MapPage from "./pages/MapPage";
import DashboardPage from "./pages/DashboardPage";
import UsersPage from "./pages/UsersPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import CasesPage from "./pages/CasesPage";
import IncidentsPage from "./pages/IncidentsPage";
import ReportsPage from "./pages/ReportsPage";
import AlertsPage from "./pages/AlertsPage";
import CrimeMapPage from "./pages/CrimeMapPage";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { AlertsProvider } from "./contexts/AlertsContext";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

const App = () => {
  console.log("App rendering for Safe City Portal - India");
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AlertsProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/emergency" element={<EmergencyPage />} />
              <Route path="/map" element={<MapPage />} />
              
              {/* Protected routes for authenticated users */}
              <Route element={<ProtectedRoute allowedRoles={['user', 'officer', 'admin']} />}>
                <Route path="/report" element={<ReportPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/crime-map" element={<CrimeMapPage />} />
              </Route>
              
              {/* Protected routes for officers */}
              <Route element={<ProtectedRoute allowedRoles={['officer', 'admin']} />}>
                <Route path="/officer/dashboard" element={<DashboardPage />} />
                <Route path="/officer/cases" element={<CasesPage />} />
                <Route path="/officer/incidents" element={<IncidentsPage />} />
                <Route path="/officer/reports" element={<ReportsPage />} />
                <Route path="/officer/alerts" element={<AlertsPage />} />
              </Route>
              
              {/* Protected routes for admins only */}
              <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
                <Route path="/admin/dashboard" element={<DashboardPage />} />
                <Route path="/admin/cases" element={<CasesPage />} />
                <Route path="/admin/incidents" element={<IncidentsPage />} />
                <Route path="/admin/reports" element={<ReportsPage />} />
                <Route path="/admin/users" element={<UsersPage />} />
                <Route path="/admin/analytics" element={<AnalyticsPage />} />
                <Route path="/admin/alerts" element={<AlertsPage />} />
              </Route>
              
              {/* Redirect old paths to new role-specific paths */}
              <Route path="/dashboard" element={
                <Navigate to="/admin/dashboard" replace />
              } />
              <Route path="/cases" element={
                <Navigate to="/admin/cases" replace />
              } />
              <Route path="/incidents" element={
                <Navigate to="/admin/incidents" replace />
              } />
              <Route path="/users" element={
                <Navigate to="/admin/users" replace />
              } />
              <Route path="/analytics" element={
                <Navigate to="/admin/analytics" replace />
              } />
              <Route path="/reports" element={
                <Navigate to="/admin/reports" replace />
              } />
              <Route path="/alerts" element={
                <Navigate to="/admin/alerts" replace />
              } />
              
              {/* Catch-all route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AlertsProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
