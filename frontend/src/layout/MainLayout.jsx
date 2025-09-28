import {Outlet, Link} from 'react-router-dom'
import SideBar from '../components/sideBar/sideBar';

export default function MainLayout() {
  return (
    <div className='flex flex-row bg-neutral-50'>
      <aside>
        <SideBar/>
      </aside>
      <main className="flex flex-col w-full max-h-1 background">
        <Outlet />
      </main>
    </div>
  );
}