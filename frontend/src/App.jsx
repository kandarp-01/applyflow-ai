import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import ResumeMatch from "./pages/ResumeMatch";

import ProtectedRoute from "./routes/ProtectedRoute";

export default function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Public Routes */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Protected Routes */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>

              <Dashboard />

            </ProtectedRoute>
          }
        />

        <Route
          path="/applications"
          element={
            <ProtectedRoute>

              <Applications />

            </ProtectedRoute>
          }
        />

        <Route
          path="/resume-match"
          element={
            <ProtectedRoute>

              <ResumeMatch />

            </ProtectedRoute>
          }
        />

        {/* Default Redirect */}

        <Route
          path="*"
          element={
            <Navigate to="/dashboard" />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}
