import React from "react";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../Pages/AuthPage";
import HomePage from "../Pages/HomePage";
import Layout from "../Pages/Layout";
import Syllabus from "../Pages/Syllabus";
import StudyPlan from "../Pages/StudyPlan";
import Progress from "../Pages/Progress";
import Quizes from "../Pages/Quizes";
import PrefrenceForm from "../Components/StudyPlan/PrefrenceForm";
import MentorChat from "../Components/mentorchat/MentorChat";
import AIBot from "../Pages/AIBot";
import Profile from "../Pages/Profile";
import { useAuth } from "../context/authcontext";
import { Navigate } from "react-router-dom";
export default function AppRoutes() {
  const { user, loading } = useAuth();

  const ProtectedRoute = ({ children }) => {
    if (loading) return null;
    return user ? children : <Navigate to="/" />;
  };

  const RestrictedRoute = ({ children }) => {
    return user ? <Navigate to="/home" /> : children;
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <RestrictedRoute>
              <AuthPage />
            </RestrictedRoute>
          }
        />
        <Route element={<Layout />}>
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/syllabus"
            element={
              <ProtectedRoute>
                <Syllabus />
              </ProtectedRoute>
            }
          />
          <Route
            path="/studyplan"
            element={
              <ProtectedRoute>
                <StudyPlan />
              </ProtectedRoute>
            }
          />
          <Route
            path="/progress"
            element={
              <ProtectedRoute>
                <Progress />
              </ProtectedRoute>
            }
          />
          <Route
            path="/quizes"
            element={
              <ProtectedRoute>
                <Quizes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/generatePlan"
            element={
              <ProtectedRoute>
                <PrefrenceForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/aibot"
            element={
              <ProtectedRoute>
                <AIBot />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </div>
  );
}
