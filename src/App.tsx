import React from 'react';
import './App.css';
import Header from './components/Header';
import { Breadcrumb } from 'flowbite-react';
import SideBarNav from './components/SideBarNav';

function App() {
  return (
      <div className='pt-2 bg-slate-800'>
        <Header/>
        {/* <Breadcrumbs/> */}
        <div className="container-fluid grid grid-flow-col ">
            <div className="2xl:col-auto xl:col-span-1 max-sm:col-start-1 max-sm:col-end-7 sm:col-span-2">
              <SideBarNav/>
            </div>
            <div className="2xl:col-span-9 xl:col-span-8 lg:col-span-7 max-sm:col-span-1 max-sm:col-end-2 sm:col-span-12 bg-slate-800">
                2
            </div>
            <div className="2xl:col-span-1 xl:col-span-2 lg:col-span-3 sm:col-span-0 max-lg:hidden lg:block bg-slate-800">
                
            </div>
        </div>
      </div>
  );
}

export default App;
