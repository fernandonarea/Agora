// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import { Home } from "../pages/home";
import { Productos } from "../pages/productos/productos";
import { Proveedores } from "@/pages/proveedores";
import { Reportes } from "@/pages/reportes";
import { Ventas } from "@/pages/ventas";
import { ThemeProvider } from "@/provider/ThemeProvider";

export default function AppRoutes() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Routes>
        <Route index element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<MainLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/products" element={<Productos />} />
          <Route path="/suppliers" element={<Proveedores />} />
          <Route path="/reports" element={<Reportes />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/getHelp" element={<Home />} />
          <Route path="/settings" element={<Home />} />
          <Route path="/profile" element={<Home />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ThemeProvider>
  );
}
