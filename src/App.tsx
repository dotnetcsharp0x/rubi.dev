import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Breadcrumb, Footer } from 'flowbite-react';
import SideBarNav from './components/Navbars/SideBarNav';
import LoginPage from './components/Login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage';
import RegisterPage from './components/Register/RegisterPage';
import { JWT } from './types/Classes/JWT/JWT';
import Cookies from 'universal-cookie';

function App() {
  const jwt = new JWT();
  const cookies = new Cookies();
  jwt.jwt = cookies.get("jwt");
  return (
    <div className="App pt-2 bg-slate-800">
      <BrowserRouter>
      <Header/>
      <div className="container-fluid grid grid-flow-col ">
             <div className="2xl:col-auto xl:col-span-1 max-sm:col-start-1 max-sm:col-end-7 sm:col-span-2">
               <SideBarNav/>
             </div>
             <div className="2xl:col-span-9 xl:col-span-8 lg:col-span-7 max-sm:col-span-1 max-sm:col-end-2 sm:col-span-12 bg-slate-800">
             <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage jwts={jwt}/>} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
        <Footer />
             </div>
             <div className="2xl:col-span-1 xl:col-span-2 lg:col-span-3 sm:col-span-0 max-lg:hidden lg:block bg-slate-800"> 
             </div>
         </div>
        
      </BrowserRouter>
    </div>
      // <div className='pt-2 bg-slate-800'>
      //   <Header/>
      //   {/* <Breadcrumbs/> */}
      //   <div className="container-fluid grid grid-flow-col ">
      //       <div className="2xl:col-auto xl:col-span-1 max-sm:col-start-1 max-sm:col-end-7 sm:col-span-2">
      //         <SideBarNav/>
      //       </div>
      //       <div className="2xl:col-span-9 xl:col-span-8 lg:col-span-7 max-sm:col-span-1 max-sm:col-end-2 sm:col-span-12 bg-slate-800">
                
      //       </div>
      //       <div className="2xl:col-span-1 xl:col-span-2 lg:col-span-3 sm:col-span-0 max-lg:hidden lg:block bg-slate-800">
                
      //       </div>
      //   </div>
      // </div>
  );
}

export default App;
