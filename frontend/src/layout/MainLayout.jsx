import {Outlet, Link} from 'react-router-dom'
import SideBar from '../components/sideBar/sideBar';

export default function MainLayout() {
  return (
    <div className='flex flex-row max-h-dvh min-h-dvh'>
      <aside>
        <SideBar/>
      </aside>
      <main className="flex flex-col w-full max-h-screen overflow-y-scroll">
        <Outlet />
      </main>
    </div>
  );
}