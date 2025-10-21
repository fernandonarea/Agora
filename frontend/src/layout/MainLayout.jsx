import { Outlet } from "react-router-dom";
import SideBar from "../components/sideBar/side-bar";
import { UserProvider } from "@/context/userContext";
import { Toaster } from "@/components/ui/sonner";

export default function MainLayout() {
  return (
    <UserProvider>
      <div className="flex flex-row max-h-dvh min-h-dvh">
        <aside>
          <SideBar />
        </aside>
        <main className="flex flex-col w-full max-h-screen overflow-auto">
          <Outlet />
        </main>
      </div>
      <Toaster richColors position="top-center"/>
    </UserProvider>
  );
}
