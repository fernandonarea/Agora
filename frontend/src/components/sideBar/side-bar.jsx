import { useState } from "react";
import { Codesandbox, PanelLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
// import { useUserContext } from "../../context/userContext"
import { MainItems } from "./main-items";
import { SettingsItems } from "./settitngs-items";
import { NavUser } from "./nav-user";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`flex flex-col gap-6 min-h-dvh bg-sidebar-accent p-4 transition-normal duration-300 border-r-1 sidebar-border
        ${isOpen ? "w-64" : "w-18"}`}
    >
      <header className="flex flex-row items-center justify-between">
        <div className={`flex items-center gap-3 ${!isOpen && "hidden"}`}>
          <div className="bg-violet-800 p-1.5 rounded-md">
            <Codesandbox size={32} color="white" />
          </div>
          <div className="font-semibold text-2xl">Inventory</div>
        </div>

        <button
          className="text-muted-foreground hover:bg-gray-300 p-1 rounded-md dark:hover:bg-gray-600"
          onClick={() => setIsOpen(!isOpen)}
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

        <MainItems isOpen={isOpen} />
        <SettingsItems isOpen={isOpen} />
        <Separator />
        <NavUser isOpen={isOpen} />
      </div>
    </div>
  );
};
export default SideBar;
