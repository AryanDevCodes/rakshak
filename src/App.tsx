
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Create a new QueryClient instance
const queryClient = new QueryClient();

const App = () => {
  console.log("App rendering");
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
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
            </Route>
            
            {/* Protected routes for officers and admins only */}
            <Route element={<ProtectedRoute allowedRoles={['officer', 'admin']} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/incidents" element={<DashboardPage />} />
            </Route>
            
            {/* Protected routes for admins only */}
            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/users" element={<UsersPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/reports" element={<DashboardPage />} />
            </Route>
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
};

export default App;
