import { CircleQuestionMark, Settings, Sun } from "lucide-react";

export const SettingsItems = ({ isOpen }) => {
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
    </div>
  );
};
