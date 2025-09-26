import { LayoutDashboard, Briefcase, Package, Truck, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export const MainItems = ({ isOpen }) => {
  const mainItems = [
    { icon: LayoutDashboard, text: "Inicio", link: "/home" },
    { icon: Briefcase, text: "Ventas", link: "/ventas" },
    { icon: Package, text: "Productos", link: "/products" },
    { icon: Truck, text: "Proveedores", link: "#" },
    { icon: FileText, text: "Reportes", link: "#" },
  ];

  return (
    <div className="flex flex-col gap-2 flex-1">
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
  );
};
