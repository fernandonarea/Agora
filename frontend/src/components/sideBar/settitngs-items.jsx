import { CircleQuestionMark, Settings, Sun } from "lucide-react";

export const SettingsItems = ({ isOpen }) => {
  const settingsItems = [
    { icon: CircleQuestionMark, text: "Get Help", href: "#" },
    { icon: Settings, text: "Settings", href: "#" },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      {settingsItems.map((items, index) => (
        <a
          key={index}
          href={items.href}
          className={`${
            isOpen
              ? "flex  gap-2 p-2 font-semibold w-full hover:bg-gray-200 rounded-md dark:hover:bg-gray-600"
              : "flex  gap-2 p-2 font-semibold w-fit hover:bg-gray-200 rounded-md dark:hover:bg-gray-600"
          }`}
        >
          <items.icon size={20}/>
          {isOpen && (
            <span className="text-sm text-sidebar-accent-foreground">
              {items.text}
            </span>
          )}
        </a>
      ))}
    </div>
  );
};
