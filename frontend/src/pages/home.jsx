import { Activity, BanknoteArrowUpIcon, PackageMinus } from "lucide-react";

export const Home = () => {
  return (
    <div className = "overflow-hidden flex flex-col h-dvh">
      <header className="flex p-5 border-b-1 ">
        <div className="text-2xl font-semibold">Inicio</div>
      </header>
      <div className="grid gap-2 grid-cols-3 wrap-break-word p-5 justify-between w-full">
        <div className="flex flex-col gap-5 border-1 h-fit rounded-md shadow-xs p-5 dark:bg-sidebar-accent">
          <div className="bg-violet-600 p-3 rounded-4xl w-fit text-white">
            <BanknoteArrowUpIcon/>
          </div>
          <div className="flex flex-col gap-2 ">
            <h1 className="text-muted-foreground">Ganancias del Día</h1>
            <p className="text-3xl font-bold">$100.00</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-1 h-fit rounded-md shadow-xs p-5 dark:bg-sidebar-accent">
          <div className="bg-amber-600 p-3 rounded-4xl w-fit text-white justify-end-safe">
            <Activity/>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-muted-foreground">Ventas del Día</h1>
            <p className="text-3xl font-bold">50</p>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-1 h-fit rounded-md shadow-xs p-5 dark:bg-sidebar-accent">
          <div className="bg-red-700 p-3 rounded-4xl w-fit text-white">
            <PackageMinus/>
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="text-muted-foreground">Productos con bajo Stock</h1>
            <p className="text-3xl font-bold">10</p>
          </div>
        </div>
      </div>

      <div>
        <div></div>
        <div></div>
      </div>

    </div>
  );
};