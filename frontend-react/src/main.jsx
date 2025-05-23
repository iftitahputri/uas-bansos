import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./tailwind.css";
import App from "./App.jsx";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import DashPenerima from "./components/DashPenerima.jsx";
import DashPenyedia from "./components/DashPenyedia.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard_penerima" element={<DashPenerima />} />
        <Route path="/dashboard_penyedia" element={<DashPenyedia />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
