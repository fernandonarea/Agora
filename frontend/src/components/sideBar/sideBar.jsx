import { useState } from "react";
import {
  Codesandbox,
  PanelLeft,
} from "lucide-react";
import { useUserContext } from "../../context/userContext"
import { MainItems } from "./mainItems";
import { SettingsItems } from "./settitngsItems";


const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const { user } = useUserContext()

  return (
    <div
      className={`flex flex-col gap-6 min-h-dvh bg-sidebar-accent p-4 transition-all duration-300 border-r-1 sidebar-border
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
          onClick={() => setIsOpen(!isOpen)}
        >
          <PanelLeft size={20}/>
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

        <MainItems isOpen={isOpen}/>
        <SettingsItems isOpen={isOpen} user={user}/>
      </div>
    </div>
  );
};
export default SideBar;