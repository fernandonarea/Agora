import { useUserContext } from "@/context/userContext";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ChevronsUpDown } from "lucide-react";

export const NavUser = ({ isOpen }) => {
  const navigate = useNavigate();
  const { logout, user } = useUserContext();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className={`flex items-center gap-0 p-1.5 w-full rounded-md transition-all duration-300 text-left
      ${isOpen ? "gap-1 hover:bg-gray-200 dark:hover:bg-gray-600" : "justify-center bg-none "}`}
    >
      <Avatar className={`${isOpen ? "w-14 h-14 p-2" : "w-10 h-10 p-0"}`}>
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
          <ChevronsUpDown size={16}/>
        </div>
      )}
    </button>
  );
};
