import { Avatar, Dropdown, Navbar } from 'flowbite-react';
import { FooterDivider } from 'flowbite-react/lib/esm/components/Footer/FooterDivider';
import { useState } from 'react';
import Cookies from 'universal-cookie';
import { JWT } from '../../types/Classes/JWT/JWT';
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi';
import axios from 'axios';
import { IJWT } from '../../types/Interfaces/JWT/IJWT';

function logOut() {
  const cookies = new Cookies();
  cookies.remove('token');
  cookies.remove('refreshToken');
  window.location.href = '/';
}
const separator = ' / ';
const cookies = new Cookies();
const jwtc = new JWT();
jwtc.accessToken = cookies.get('token');
jwtc.refreshToken = cookies.get('refreshToken');
const fetchToken  = async () => {
try {
  const config = {
    headers: { Authorization: `Bearer ${jwtc.accessToken}` }
};
  const resp = await axios.post<IJWT>('https://46.22.247.253:5001/api/User/refresh',jwtc,config);
  cookies.set("token",resp.data.accessToken,{maxAge:2592000});
  cookies.set("refreshToken",resp.data.refreshToken,{maxAge:2592000});
  jwtc.accessToken = String(resp.data.accessToken);
  jwtc.refreshToken = String(resp.data.refreshToken);
  return await resp.data.refreshToken;
}
catch(e) {
  console.log("ERROR: ");
  console.log(e);
}
};
export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cookiesdata, setCookiesdata] = useState("")
  const resp = async () => {
    await fetchToken();
  }
  resp();
  return (
    <>
    <Navbar fluid rounded className='bg-slate-800 mx-6 text-lg'>
    <Navbar.Brand href="/" className='max-auto w-20 flex justify-center items-center'>
      <img src="/logo512.png" className="h-11 max-auto content-center" alt="Skyme logo" />
    </Navbar.Brand>
    {jwtc.accessToken &&
    <div className="flex md:order-2">
     <Dropdown
        arrowIcon={false}
        inline
        label={
          <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
        }
      >
        <Dropdown.Header>
          <span className="block text-sm">Bonnie Green</span>
          <span className="block truncate text-sm font-medium">name@flowbite.com</span>
        </Dropdown.Header>
        <Dropdown.Item>Dashboard</Dropdown.Item>
        <Dropdown.Item icon={HiLogout}>Settings</Dropdown.Item>
        <Dropdown.Item>Earnings</Dropdown.Item>
        <Dropdown.Divider />
        <Dropdown.Item icon={HiLogout} onClick={logOut}>Sign out</Dropdown.Item>
      </Dropdown>
    </div>    
    }
    {!jwtc.accessToken &&
    <div>
      <a href='/login' className='bg-rose-600 hover:bg-rose-700
      rounded-md py-2 px-4 text-slate-200'>Login</a>
      </div>
    }
  </Navbar>
    <hr className="w-full my-2 border-slate-900/40 sm:mx-auto"></hr>
  </>
  )
}
