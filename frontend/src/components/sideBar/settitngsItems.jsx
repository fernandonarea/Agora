import { Moon, CircleQuestionMark, Settings } from "lucide-react";
import fotoPerfilExample from "@/assets/images/fotoPerfilExample.png";
import { useUserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export const SettingsItems = ({ isOpen, user }) => {
  const settingsItems = [
    { icon: Moon, text: "Modo Oscuro", href: "#" },
    { icon: CircleQuestionMark, text: "Obtener ayuda", href: "#" },
    { icon: Settings, text: "Ajustes", href: "#" },
  ];

  const { logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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

        <button
          onClick={handleLogout}
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
              <p className="font-semibold">{user?.user_name} {user?.user_lastname}</p>
              <p className="text-xs text-muted-foreground font-semibold">
                {user?.user_email}
              </p>
            </div>
          )}
        </button>
      </div>
  );
};
