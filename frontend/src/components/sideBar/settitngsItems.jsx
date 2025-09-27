import { Moon, CircleQuestionMark, Settings } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { NavUser } from "./nav-user";

export const SettingsItems = ({ isOpen, user }) => {
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
                ? "flex items-center gap-3 p-2 font-semibold w-full hover:bg-gray-200 rounded-md"
                : "flex items-center gap-3 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md"
            }`}
          >
            <items.icon />
            {isOpen && <span>{items.text}</span>}
          </a>
        ))}

        <Separator/>

        <NavUser isOpen={isOpen} user={user}/>
      </div>
  );
};