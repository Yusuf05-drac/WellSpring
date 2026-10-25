import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './components/ToastProvider';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import Chatbot from './components/Chatbot';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Assessment from './pages/Assessment';
import Recommendations from './pages/Recommendations';
import WorkoutPlanner from './pages/WorkoutPlanner';
import HealthTracker from './pages/HealthTracker';
import DietPlan from './pages/DietPlan';
import Progress from './pages/Progress';
import History from './pages/History';
import About from './pages/About';
import AuthPage from './pages/Auth';

function MainAppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="auth-loading-screen">
        <div className="spinner spinner-teal" style={{ width: 40, height: 40, borderWidth: 3 }} />
        <p style={{ marginTop: 14, color: 'var(--gray-500)', fontWeight: 500 }}>
          Initializing WellSpring Intelligence…
        </p>
      </div>
    );
  }

  // Protected navigation: if not authenticated, display login/register view
  if (!isAuthenticated) {
    return <AuthPage />;
  }

  return (
    <div className="app-shell">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="main-content">
        <Topbar onMenuClick={() => setSidebarOpen(true)} />
        <main className="page-content" id="main-content" tabIndex={-1}>
          <Routes>
            <Route path="/"                element={<Dashboard />} />
            <Route path="/profile"         element={<Profile />} />
            <Route path="/assessment"      element={<Assessment />} />
            <Route path="/recommendations" element={<Recommendations />} />
            <Route path="/workout"         element={<WorkoutPlanner />} />
            <Route path="/tracker"         element={<HealthTracker />} />
            <Route path="/diet"            element={<DietPlan />} />
            <Route path="/progress"        element={<Progress />} />
            <Route path="/history"         element={<History />} />
            <Route path="/about"           element={<About />} />
            <Route path="*"                element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
      {/* Floating AI Health Assistant accessible on all application screens */}
      <Chatbot />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <ToastProvider>
            <MainAppShell />
          </ToastProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
