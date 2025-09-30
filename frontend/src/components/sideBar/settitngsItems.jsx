import { Moon, CircleQuestionMark, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { NavUser } from "./nav-user"

export const SettingsItems = ({ isOpen }) => {
  const settingsItems = [
    { icon: Moon, text: "Modo Oscuro", href: "#" },
    { icon: CircleQuestionMark, text: "Obtener ayuda", href: "#" },
    { icon: Settings, text: "Ajustes", href: "#" },
  ];

  return (
    <div className="flex flex-col gap-2">
        {settingsItems.map((items, index) => (
          <a
            key={index}
            href={items.href}
            className={`${
              isOpen
                ? "flex items-center gap-2 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
                : "flex items-center gap-2 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
            }`}
          >
            <items.icon/>
            {isOpen && <span className="text-md text-sidebar-accent-foreground">{items.text}</span>}
          </a>
        ))}



        {/* <NavUser isOpen={isOpen}/> */}
      </div>
  );
};