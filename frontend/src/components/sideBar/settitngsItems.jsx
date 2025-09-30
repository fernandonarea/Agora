import { Moon, CircleQuestionMark, Settings, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/provider/ThemeProvider";

export const SettingsItems = ({ isOpen }) => {
  const { setTheme } = useTheme();
  const settingsItems = [
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
              ? "flex items-center gap-2 p-2 font-semibold w-full hover:bg-gray-200 rounded-md dark:hover:bg-gray-600"
              : "flex items-center gap-2 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md dark:hover:bg-gray-600"
          }`}
        >
          <items.icon />
          {isOpen && (
            <span className="text-md text-sidebar-accent-foreground">
              {items.text}
            </span>
          )}
        </a>
      ))}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex flex-row rounded-md w-fit hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Sun size={24} className="rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Moon size={24} className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
          
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Light
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Dark
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("system")}>
            System
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
