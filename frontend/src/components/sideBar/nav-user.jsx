import { useUserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronsUpDown, Laptop, LogOutIcon, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuLabel
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/provider/ThemeProvider";

export const NavUser = ({ isOpen }) => {
  const navigate = useNavigate();
  const { logout, user } = useUserContext();
  const { setTheme } = useTheme();
  

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-row w-fit p-2 gap-1.5 items-center">
        <Avatar className={`${isOpen ? "" : "hidden"}`}>
          <AvatarFallback
            className={`${
              isOpen
                ? "bg-violet-600 font-medium text-white"
                : "bg-violet-600 font-medium text-white hover:bg-violet-800"
            }`}
          >
            {user?.user_name[0] + user?.user_lastname[0]}
          </AvatarFallback>
        </Avatar>
        {isOpen && (
          <div className="flex flex-row h-full items-center cursor-pointer">
            <div className="mr-4">
              <span className="font-semibold">
                {user?.user_name.split(" ", 1)}{" "}
                {user?.user_lastname.split(" ", 1) || "Cargando.."}
              </span>
              <p className="text-xs text-muted-foreground font-semibold">
                {user?.user_email || "Cargando.."}
              </p>
            </div>
          </div>
        )}
      <DropdownMenu >
        <DropdownMenuTrigger asChild>
          <button className="p-2 border-none rounded-md hover:bg-gray-200 dark:hover:bg-gray-600">
            <ChevronsUpDown size={16}/>
          </button>
        </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>
              Theme
            </DropdownMenuLabel>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={()=>setTheme("system")}>
              <Laptop/>
              System
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setTheme("light")}>
              <Sun/>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={()=>setTheme("dark")} >
              <Moon/>
              Dark
            </DropdownMenuItem>
            <DropdownMenuSeparator/>
            <DropdownMenuItem onClick={handleLogout}>
              <LogOutIcon/>
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};
