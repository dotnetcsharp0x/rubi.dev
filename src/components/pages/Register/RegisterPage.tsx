
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import { FormEvent, SyntheticEvent, useEffect, useRef, useState } from 'react';
import Cookies from 'universal-cookie';
import { IRegister } from '../../../types/Interfaces/Register/IRegister';
import { RegisterU } from '../../../types/Classes/Register/Register';
import axios, { AxiosRequestConfig } from 'axios';
import { IJWT } from '../../../types/Interfaces/JWT/IJWT';
import { useDispatch } from 'react-redux';
import { useTypedSelector } from '../../../hooks/useTypedSelector';
import { RegisterUser } from '../../../store/action-creator/user';



export default function RegisterPage() {
  const cookies = new Cookies();
  const {jwtd,error,loading, status,message} = useTypedSelector(state => state.user_register);
  const dispatch: any  = useDispatch();
  const reg = new RegisterU();

  const [name,setName] = useState("")
  const [remember,setRemember] = useState(false)
  const [name2,setName2] = useState("")
  const [email,setEmail] = useState("")
  const [password,setPassword] = useState("")
  const [jwt,setJwt] = useState<string>("")
  const [emailDirty, setEmailDirty] = useState(false)
  const [passwordDirty, setPasswordDirty] = useState(false)
  const [nameDirty, setNameDirty] = useState(false)
  const [name2Dirty, setName2Dirty] = useState(false)
  const [emailError, setEmailError] = useState('Email cannot be empty')
  const [passwordError, setPasswordError] = useState('Password cannot be empty')
  const [nameError, setNameError] = useState('First Name cannot be empty')
  const [name2Error, setName2Error] = useState('Last Name cannot be empty')
  const blurHandler = (e: { target: { name: string; }; }) => {
    switch (e.target.name) {
      case 'email':
        setEmailDirty(true);
        break;
        case 'password':
        setPasswordDirty(true);
        break;
        case 'name':
          setNameDirty(true);
        break;
        case 'name2':
          setName2Dirty(true);
        break;
    }
    const email_ref = document.getElementById('email') as HTMLInputElement;
    const password_ref = document.getElementById('password') as HTMLInputElement;
    const name_ref = document.getElementById('name') as HTMLInputElement;
    const name2_ref = document.getElementById('name2') as HTMLInputElement;
    emailHandler(email_ref);
    passwordHandler(password_ref);
    nameHandler(name_ref);
    name2Handler(name2_ref);

    console.log('blur' + e.target.name)
  };
  const emailHandler = (e: HTMLInputElement) => {
    setEmail(e.value);
    const resp = validateEmail(email);
    if(resp == false) {
      setEmailError('Incorrect email')
    }
    else {
      setEmailError('')
    }
  };
  const passwordHandler = (e: HTMLInputElement) => {
    setPassword(e.value);
    if(password.length < 3 || password.length > 16) {
      setPasswordError('Password must be from 3 to 16 symbols');
      if(!password) {
        setPasswordError('Password must have at least 3 symbols');
      }
    }
    else {
      setPasswordError('');
    }
  };
  const nameHandler = (e: HTMLInputElement) => {
    setName(e.value);
    if(!name) {
      setNameError('First must have at least 3 symbols');
    }
    else {
      setNameError('');
    }
  };
  const name2Handler = (e: HTMLInputElement) => {
    setName2(e.value);
    if(!name2) {
      setName2Error('Last Name must have at least 3 symbols');
    }
    else {
      setName2Error('');
    }
  };
  function validateEmail(email: string) {
    var re = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
    return re.test(email);
  }
  const [formValid, setFormValid] = useState(false)
  useEffect(() => {
    if (emailError || passwordError) {
      setFormValid(false)
    }
    else {
      setFormValid(true)
    }
  },[emailError,passwordError]);
  const onButtonClick =() => {
    reg.FirstName = name;
    reg.LastName = name2;
    reg.Email = email;
    reg.Password = password;
    Register();
  }
  const Register = () => {
    try {
      const resp = fetchToken();
    }
    catch (e) {
      alert(e)
    }
  }
  useEffect(() => {
    console.log(jwtd.AccessToken);
    if(jwtd.AccessToken) {
    if(remember) {
      cookies.set("token",jwtd.AccessToken,{maxAge:2592000});
      cookies.set("refreshToken",jwtd.RefreshToken,{maxAge:2592000});
    }
    else {
      cookies.set("token",jwtd.AccessToken);
      cookies.set("refreshToken",jwtd.RefreshToken);
    }
    setJwt(String(jwtd.AccessToken));
    window.location.href = '/';
  }
},[onButtonClick]);
const fetchToken  = () => {
  console.log(reg);
  const resp = dispatch(RegisterUser(reg));
};
const toggleRemember = () => {
  setRemember((prevState) => !prevState);
};

  return (
    <div className='grid place-items-center mt-10'>
    <form className="flex max-w-md flex-col gap-4 grid place-items-center" 
    >
      <img src="/logo512.png" className="h-28 w-28 max-auto content-center m-0 p-0" alt="Skyme logo" />
      <h1 className='m-0 p-0 text-slate-200 text-2xl'>Register in Skymey</h1>
      {message && 
        <h2 className='text-rose-600'>
          {message}
        </h2>
      }
      <div className='p-0 m-0 w-full'>
        {(nameDirty && nameError) && 
            <div className='text-rose-600'>{nameError}</div>
          }
        <div className="relative mb-1 w-full">
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        <input
          id="name"
          placeholder="First Name"
          required
          name="name"
          type="text"
          value={name}
          onBlur={blurHandler}
          className="z-0 bg-gray-700 text-slate-300 pl-12 rounded-md border-0 border-transparent focus:ring-0 w-full"
          onChange={(e)=>nameHandler(e.target)}
        />
        </div>
        </div>
        <div className='p-0 m-0 w-full'>
        {(name2Dirty && name2Error) && 
            <div className='text-rose-600'>{name2Error}</div>
          }
        <div className="relative mb-1 w-full">
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w- h-6 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
            </svg>
          </div>
        <input
          id="name2"
          placeholder="Last Name"
          required
          name="name2"
          type="text"
          value={name2}
          onBlur={blurHandler}
          className="z-0 bg-gray-700 text-slate-300 pl-12 rounded-md border-0 border-transparent focus:ring-0 w-full"
          onChange={(e)=>name2Handler(e.target)}
        />
        </div>
        </div>
        <div className='p-0 m-0 w-full'>
        {(emailDirty && emailError) && 
            <div className='text-rose-600'>{emailError}</div>
          }
        <div className="relative mb-1 w-full">
          <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
          </div>
        <input
          id="email"
          placeholder="Email"
          required
          name="email"
          type="email"
          value={email}
          onBlur={blurHandler}
          className="z-0 bg-gray-700 text-slate-300 pl-12 rounded-md border-0 border-transparent focus:ring-0 w-full"
          onChange={(e)=>emailHandler(e.target)}
        />
        </div>
        </div>
      <div className='p-0 m-0 w-full'>
      {(passwordDirty && passwordError) && 
            <div className='text-rose-600'>{passwordError}</div>
          }
      <div className="relative mb-1">
        <div className="absolute inset-y-0 left-0 z-10 flex items-center pl-3.5 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6 text-slate-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z" />
          </svg>
        </div>
        <input
          id="password"
          required
          type="password"
          name="password"
          placeholder='Password'
          value={password}
          onBlur={blurHandler}
          className='z-0 bg-gray-700 text-slate-300 pl-12 rounded-md border-0 border-transparent focus:ring-0 w-full'
          onChange={(e)=>passwordHandler(e.target)}
        />
        </div>
      </div>
      <div className='place-items-left w-full p-0 m-0'>
      <div className="flex items-center gap-2">
        <Checkbox id="remember" onClick={toggleRemember}/>
        <Label htmlFor="remember" className='text-slate-300'>
          Remember me
        </Label>
      </div>
      <div className='bg-slate-700 h-1 mt-2 border-separate rounded-md opacity-50'></div>
      </div>
      <button disabled={!formValid} type="button" onClick={onButtonClick} className='
      bg-rose-600 hover:bg-rose-700 disabled:bg-gray-600
      rounded-md py-2 px-4 text-slate-200 text-lg'>
        Register
      </button>
      <div className='flex dont-have'>
        <span className='text-slate-200 inline-block mx-2'>Already have an account?</span> <a href="/login" className='text-rose-500 bold inline-blocks hover:underline'>Login here</a>
      </div>
    </form>
    </div>
  )
}

