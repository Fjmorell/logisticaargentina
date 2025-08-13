import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "@/App";
import "./index.css";
import { AuthProvider } from "@/Api/AuthContext";
import { HelmetProvider } from "react-helmet-async"; // ✅ Agregado

ReactDOM.createRoot(document.getElementById("root")).render(
  <HelmetProvider> {/* ✅ Envuelve toda la app */}
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </HelmetProvider>
);
