import { HomeIcon, Briefcase, Package, Truck, FileText } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

export const MainItems = ({ isOpen }) => {
  
  const mainItems = [
    { icon: HomeIcon, text: "Home", link: "/home" },
    { icon: Briefcase, text: "Sales", link: "/ventas" },
    { icon: Package, text: "Products", link: "/products" },
    { icon: Truck, text: "Suppliers", link: "/suppliers" },
    { icon: FileText, text: "Reports", link: "/reports" },
  ];


  return (
    <div className="flex flex-col items-center gap-2 flex-1">
      {mainItems.map((item, index) => (
          <Link
            to={item.link}
            key={index}
            href={item.href}
            className={`flex items-center gap-2 p-2 font-semibold rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 ${
              isOpen ? "w-full" : "w-fit"
            }`}
          >
            <item.icon size={20}/>
            {isOpen && <span className="text-sm text-sidebar-accent-foreground">{item.text}</span>}
          </Link>
        ))}
      <Separator />
    </div>
  );
};