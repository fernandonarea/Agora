import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Codesandbox,
  LayoutDashboard,
  Briefcase,
  PanelLeft,
  PackageSearch,
  Truck,
  FileText,
  Moon,
  CircleQuestionMark,
  Settings,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import fotoPerfilExample from "@/assets/images/fotoPerfilExample.png";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const mainItems = [
    { icon: LayoutDashboard, text: "Inicio", link: "/home" },
    { icon: Briefcase, text: "Ventas", link: "/ventas"},
    { icon: PackageSearch, text: "Productos", link: "/products" },
    { icon: Truck, text: "Proveedores", link: Link },
    { icon: FileText, text: "Reportes", link: Link },
  ];

  const settingsItems = [
    { icon: Moon, text: "Modo Oscuro", href: "#" },
    { icon: CircleQuestionMark, text: "Obtener ayuda", href: "#" },
    { icon: Settings, text: "Ajustes", href: "#" },
  ];

  

  return (
    <div
      className={`flex flex-col gap-6 min-h-dvh bg-gray-100 p-4 transition-all duration-300 border-1 border-gray-300
        ${isOpen ? "w-64" : "w-18"}`}
    >
      <header className="flex flex-row items-center justify-between">
        <div className={`flex items-center gap-3 ${!isOpen && "hidden"}`}>
          <div className="bg-violet-800 p-1.5 rounded-md">
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

      <div className="flex flex-col gap-2 flex-1" id="sbMainItems">
        <p
          className={`text-muted-foreground text-xs font-bold ${
            !isOpen && "hidden"
          }`}
        >
          Menu
        </p>

        {mainItems.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            href={item.href}
            className={`flex items-center gap-3 p-2 font-semibold rounded-md hover:bg-gray-200 ${
              isOpen ? "w-full" : "w-fit"
            }`}
          >
            <item.icon />
            {isOpen && <span>{item.text}</span>}
          </Link>
        ))}
        <Separator />
      </div>

      <div className="flex flex-col gap-2">
        {settingsItems.map((items, index) => (
          <a
            key={index}
            href={items.href}
            className={`${
              isOpen
                ? "flex items-center gap-3 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
                : "flex items-center gap-3 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
            }`}
          >
            <items.icon />
            {isOpen && <span>{items.text}</span>}
          </a>
        ))}

        <button
          className={`flex items-center gap-0 bg-white rounded-md mt-4 transition-all duration-300 text-left
            ${isOpen ? "gap-1" : "justify-center"} hover:bg-gray-200`}
        >
          <img
            src={fotoPerfilExample}
            alt="perfil"
            className={`
              ${isOpen ? "w-15 h-15 p-2 rounded-xl" : "w-10 h-10 rounded-md"}`}
          />

          {isOpen && (
            <div>
              <p className="font-semibold">Fernando</p>
              <p className="text-xs text-muted-foreground font-semibold">
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
