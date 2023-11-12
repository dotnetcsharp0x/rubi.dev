import React from 'react';
import './App.css';
import Header from './components/Header/Header';
import { Breadcrumb, Footer } from 'flowbite-react';
import SideBarNav from './components/Navbars/SideBarNav';
import LoginPage from './components/pages/Login/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './components/pages/Home/HomePage';
import RegisterPage from './components/pages/Register/RegisterPage';
import { JWT } from './types/Classes/JWT/JWT';
import Cookies from 'universal-cookie';
import UserList from './components/pages/UserList/UserList';
import axios from 'axios';
import { IJWT } from './types/Interfaces/JWT/IJWT';
import { JwtPayload, jwtDecode } from "jwt-decode";
import { JwtPayload2 } from './types/Interfaces/JWT/JwtPayload2';
import { UserProps } from './types/Interfaces/Users/IUserProps';
import { state } from './state';

export default function App() {
  return (
    <div className="App pt-2 bg-slate-800">
      <BrowserRouter>
      <Header/>
      <div className="container-fluid grid grid-flow-col ">
             <div className="2xl:col-auto xl:col-span-1 sm:col-span-2 max-sm:col-start-1 max-sm:col-end-11">
               <SideBarNav/>
             </div>
             <div className="2xl:col-span-9 xl:col-span-8 lg:col-span-7 sm:col-span-12 max-sm:col-start-1 max-sm:col-end-11 bg-slate-800">
             <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/userlist" element={<UserList/>} />
        </Routes>
        <Footer />
             </div>
             <div className="2xl:col-span-1 xl:col-span-2 lg:col-span-3 sm:col-span-0 max-lg:hidden lg:block bg-slate-800"> 
             </div>
         </div>
        
      </BrowserRouter>
    </div>
  );
}