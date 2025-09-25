// src/routes/AppRoutes.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import { Home } from "../pages/home";
import { Productos } from "../pages/productos";

export default function AppRoutes() {
  return (
    <Routes>
      <Route index element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      
      <Route path="/" element={<MainLayout  />}>
        <Route path="/home" element={<Home/>}></Route>
        <Route path="/products" element={<Productos/>}/>
      </Route>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
