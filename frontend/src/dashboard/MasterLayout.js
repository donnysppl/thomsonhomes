import { Outlet } from 'react-router-dom';
import './Dashboard.css';
import Sidebar from './Sidebar';

export default function MasterLayout() {
  return (
    <>
    <section className='dashboard-bg masterlayout position-relative dashboard'>
      <div className="sidebar-left dashboard-bg-light">
        <Sidebar/>
      </div>
      <div className="main-part sidebar-right pt-5 px-5">
        <Outlet/>
      </div>
    </section>
    </>
  )
}
