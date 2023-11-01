import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'universal-cookie';
import { JWT } from './types/Classes/JWT/JWT';
import { IJWT } from './types/Interfaces/JWT/IJWT';
import { JwtPayload2 } from './types/Interfaces/JWT/JwtPayload2';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const cookies = new Cookies();
  const jwtc = new JWT();
  jwtc.accessToken = cookies.get("token");
  if(jwtc.accessToken != undefined) {
    const jwt_token :JwtPayload2  = JSON.parse(JSON.stringify(jwtDecode<JwtPayload2>(jwtc.accessToken)));
  }
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
if(jwtc.accessToken != undefined) {
const resp = async () => {
  await fetchToken();
}
resp();
}
root.render(
    <Provider store={store}>
      <div className='bg-slate-800 h-screen'>
      <App jwts={jwtc}/>
      </div>
    </Provider>
);