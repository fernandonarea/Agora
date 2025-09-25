import {Outlet, Link} from 'react-router-dom'
import SideBar from '../components/sideBar/sideBar';

export default function MainLayout({url, user}) {
  return (
    <div className='flex flex-row'>
      <aside>
        <SideBar url={url} user={user}/>
      </aside>
      <main className="flex flex-col p-4 w-full">
        <Outlet />
      </main>
    </div>
  );
}