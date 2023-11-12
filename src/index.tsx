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
import { state } from './state';
import { updateJWT } from './store/UpdateJWT/updateJWT';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
const cookies = new Cookies();
  const jwtc = new JWT();
  jwtc.AccessToken = cookies.get("token");
jwtc.AccessToken = cookies.get('token');
jwtc.RefreshToken = cookies.get('refreshToken');
export const fetchToken  = async (jwtr : IJWT) => {
try {
  const config = {
    headers: { Authorization: `Bearer ${jwtc.AccessToken}` }
};
  const resp = await axios.post<IJWT>('https://46.22.247.253:5007/api/User/refresh',jwtr,config);
  cookies.set("token",resp.data.AccessToken,{maxAge:2592000});
  cookies.set("refreshToken",resp.data.RefreshToken,{maxAge:2592000});
  jwtc.AccessToken = String(resp.data.AccessToken);
  jwtc.RefreshToken = String(resp.data.RefreshToken);
  state.AccessToken = jwtc.AccessToken;
  state.RefreshToken = jwtc.RefreshToken;
  
}
catch(e) {
  console.log("ERROR: ");
  console.log(e);
}
return await state.AccessToken;
};
if(jwtc.AccessToken != undefined) {
  const jwt_token :JwtPayload2  = JSON.parse(JSON.stringify(jwtDecode<JwtPayload2>(jwtc.AccessToken)));
    let seconds = 0;
    seconds = Number(jwt_token.exp);
    seconds=seconds*1000;
    const date = new Date(seconds)
    //console.log(date.toString());
    const currentDate=new Date();
    console.log(date);
    console.log(currentDate);
    console.log(currentDate.getTime());
    console.log(date.getTime());
    const diff = date.getTime()-currentDate.getTime();
    const diff_seconds = diff/1000/60;
    console.log(diff_seconds);
    if(diff_seconds < 30) {
    const resp = async () => {
      await fetchToken(jwtc);
    }
    resp();
  }
}
axios.interceptors.request.use(request => {
  updateJWT();
  console.log("request");
  console.log(request);
  // Edit request config
  return request;
}, error => {
  console.log(error);
  return Promise.reject(error);
});

root.render(
    <Provider store={store}>
      <div className='bg-slate-800 h-screen'>
      <App/>
      </div>
    </Provider>
);