import { useRef } from "react";
import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import AdminApp from "./AdminApp";

const Protected = () => {
  const location = useLocation();
  const presi = useRef(location.state);

  useEffect(() => {
    localStorage.setItem("elPresiEstaEnThaHouse", String(!!presi.current));
  }, []);

  const admin = !!localStorage.getItem("elPresiEstaEnThaHouse");
  return admin ? <AdminApp /> : <Navigate to="/login" />;
};

export default Protected;
