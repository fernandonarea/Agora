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
      
      <Route path="/" element={<MainLayout/>}>
        <Route path="/home" element={<Home/>}/>
        <Route path="/products" element={<Productos/>}/>
        <Route path="/suppliers" element={<Home/>}/>
        <Route path="/reports" element={<Home/>}/>
        <Route path="/getHelp" element={<Home/>}/>
        <Route path="/settings" element={<Home/>}/>
        <Route path="/profile" element={<Home/>}/>
      </Route>

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
    </Routes>
  );
}
