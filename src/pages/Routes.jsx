import { Routes, Route } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import AdminPortal from "./pages/AdminPortal";
import ProtectedRoute from "./components/ProtectedRoute";

<Routes>
  <Route path="/admin/login" element={<AdminLogin />} />
  <Route
    path="/admin/dashboard"
    element={
      <ProtectedRoute>
        <AdminPortal />
      </ProtectedRoute>
    }
  />
</Routes>
