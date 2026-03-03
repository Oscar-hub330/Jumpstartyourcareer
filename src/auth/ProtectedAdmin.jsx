import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import api from "/services/api";

const ProtectedAdmin = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const verify = async () => {
      try {
        await api.get("/admin/verify");
        setAuthorized(true);
      } catch {
        localStorage.removeItem("adminToken");
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, []);

  if (loading) return <div>Checking authentication...</div>;

  return authorized ? children : <Navigate to="/admin-login" replace />;
};

export default ProtectedAdmin;