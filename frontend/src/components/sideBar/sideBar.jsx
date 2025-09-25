import {
  Codesandbox,
  LayoutDashboard,
  PanelLeft,
  PackageSearch,
  Truck,
  FileText,
  Moon,
  CircleQuestionMark,
  Settings,
} from "lucide-react";

import { Separator } from "@/components/ui/separator";

import { useState } from "react";
import fotoPerfilExample from "@/assets/images/fotoPerfilExample.png";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const mainItems = [
    { icon: LayoutDashboard, text: "Inicio" },
    { icon: PackageSearch, text: "Productos" },
    { icon: Truck, text: "Proveedores" },
    { icon: FileText, text: "Reportes" },
  ];

    const settingsItems = [
    { icon: LayoutDashboard, text: "Inicio" },
    { icon: PackageSearch, text: "Productos" },
    { icon: Truck, text: "Proveedores" },
    { icon: FileText, text: "Reportes" },
  ];

  return (
    <div
      className={`flex flex-col gap-6 min-h-dvh bg-gray-100 p-4 transition-all duration-300 
        ${isOpen ? "w-64" : "w-18"}`}
    >
      <header className="flex flex-row items-center justify-between">
        <div className={`flex items-center gap-3 ${!isOpen && "hidden"}`}>
          <div className="bg-gray-800 p-1.5 rounded-md">
            <Codesandbox size={32} color="white" />
          </div>
          <div className="font-bold text-2xl">Inventory</div>
        </div>

        <button
          className="text-muted-foreground hover:bg-gray-300 p-1 rounded-md"
          onClick={() => setIsOpen(!isOpen)} // alterna el estado
        >
          <PanelLeft size={20} />
        </button>
      </header>

      <div className="flex flex-col gap-2 flex-1">
        <p
          className={`text-muted-foreground text-xs font-bold ${
            !isOpen && "hidden"
          }`}
        >
          Menu
        </p>

        <div
          className={`${
            isOpen
              ? "flex items-center gap-3 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
              : "flex items-center gap-3 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
          }`}
        >
          <LayoutDashboard />
          {isOpen && <a href="">Inicio</a>}
        </div>

        <div
          className={`${
            isOpen
              ? "flex items-center gap-3 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
              : "flex items-center gap-3 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
          }`}
        >
          <PackageSearch />
          {isOpen && <a href="/productos">Productos</a>}
        </div>

        <div
          className={`${
            isOpen
              ? "flex items-center gap-3 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
              : "flex items-center gap-3 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
          }`}
        >
          <Truck />
          {isOpen && <a href="">Proveedores</a>}
        </div>

        <div
          className={`${
            isOpen
              ? "flex items-center gap-3 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
              : "flex items-center gap-3 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
          }`}
        >
          <FileText />
          {isOpen && <a href="">Reportes</a>}
        </div>
        <Separator />
      </div>

      <div className="flex flex-col gap-2">
        <div
          className={`${
            isOpen
              ? "flex items-center gap-3 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
              : "flex items-center gap-3 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
          }`}
        >
          <Moon />
          {isOpen && <a href="">Modo Oscuro</a>}
        </div>

        <div
          className={`${
            isOpen
              ? "flex items-center gap-3 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
              : "flex items-center gap-3 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
          }`}
        >
          <CircleQuestionMark size={20} />
          {isOpen && <a href="">Centro de ayuda</a>}
        </div>

        <div
          className={`${
            isOpen
              ? "flex items-center gap-3 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
              : "flex items-center gap-3 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
          }`}
        >
          <Settings />
          {isOpen && <a href="">Ajustes</a>}
        </div>

        <button
          className={`flex items-center gap-2 bg-white rounded-md mt-4 transition-all duration-300 text-left
            ${isOpen ? "gap-2" : "justify-center"} hover:bg-gray-200`}
        >
          <img
            src={fotoPerfilExample}
            alt="perfil"
            className={`${
              isOpen ? "w-15 h-15 p-2 rounded-xl" : "w-10 h-10 rounded-md"
            }`}
          />

          {isOpen && (
            <div>
              <p className="font-semibold">Fernando</p>
              <p className="text-xs text-muted-foreground">
                fernandonarea@gmail.com
              </p>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};
export default SideBar;
