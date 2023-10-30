
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { ILogin } from '../../types/Interfaces/Login/ILogin';
import { Login } from '../../types/Classes/Login/Login';
import axios, { AxiosRequestConfig } from 'axios';
import { IJWT } from '../../types/Interfaces/JWT/IJWT';
import { UserProps } from '../../types/Interfaces/Users/IUserProps';
import { HiMail,HiKey } from 'react-icons/hi';
import { success } from 'io-ts';

export default function LoginPage(props: UserProps) {
  const cookies = new Cookies();

  const logi = new Login();

  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [jwt,setJwt] = useState<string>("")

  const onButtonClick =() => {
    logi.email = email;
    logi.password = password;
    loginUser(logi)
  }

  const fetchToken = () => {
    axios
    .post<string>('https://localhost:7168/api/User/Login',logi)
    .then((resp) => {
      const jwt_resp = resp.data;
      setJwt(jwt_resp);
    });
  };

async function loginUser(iuser:ILogin) {
  try {
    fetchToken();
    console.log(jwt);
    cookies.set("jwt",jwt,{maxAge:2678400})
  }
  catch (e) {
    alert(e)
  }
}

  return (
    <div className='grid place-items-center mt-10'>
    <form className="flex max-w-md flex-col gap-4 grid place-items-center" 
    >
      <img src="/logo512.png" className="h-20 w-20 mb-4 max-auto content-center" alt="Skyme logo" />
      <div>
        <h1>{email}</h1>
        <div className="relative mb-1">
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-slate-400">
              <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
        <input
          id="email"
          placeholder="Email"
          required
          type="email"
          value={email}
          className="z-0 bg-gray-700 text-slate-300 pl-12 rounded-md border-0 border-transparent focus:ring-0"
          onChange={(e)=>setEmail(e.target.value)}
        />
        
        </div>
      </div>
      <div className='p-0 m-0'>
      <div className="relative mb-0">
        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 text-slate-400">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        </div>
        <input
          id="password"
          required
          type="password"
          placeholder='Password'
          value={password}
          className='z-0 bg-gray-700 text-slate-300 pl-12 rounded-md border-0 border-transparent focus:ring-0'
          onChange={(e)=>setPassword(e.target.value)}
        />
        </div>
      </div>
      <div className='place-items-left w-full p-0 m-0'>
      <div className="flex items-center gap-2">
        <Checkbox id="remember"/>
        <Label htmlFor="remember" className='text-slate-300'>
          Remember me
        </Label>
      </div>
      <div className='bg-slate-700 h-1 mt-2 border-separate rounded-md opacity-50'></div>
      </div>
      <button type="button" onClick={onButtonClick} className='bg-blue-800 hover:bg-blue-700 rounded-md py-3 px-5 text-slate-300'>
        Login
      </button>
    </form>
    </div>
  )
}

