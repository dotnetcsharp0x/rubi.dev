import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from "universal-cookie";
import { state } from "../../state";
import { JWT } from "../../types/Classes/JWT/JWT";
import { IJWT } from "../../types/Interfaces/JWT/IJWT";
import { JwtPayload2 } from "../../types/Interfaces/JWT/JwtPayload2";

const fetchToken =  (jwtr : IJWT)  => {
  const cookies = new Cookies();
  const jwtc = new JWT();
  jwtc.RefreshToken = cookies.get('refreshToken');
  jwtc.AccessToken = cookies.get('token');
  console.log('refreshToken: '+ jwtc.RefreshToken);
    console.log('fetchToken');
    try {
        const config = {
            headers: { Authorization: `Bearer ${jwtc.AccessToken}` }
        };
        const resp =  fetch('https://46.22.247.253:5007/api/User/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(jwtc)
        }).then((resp) => {
          console.log(resp.json().then((json) => {
            const resp_json = json as IJWT;
            state.AccessToken = resp_json.AccessToken;
            state.RefreshToken = resp_json.RefreshToken;
            cookies.set('token',state.AccessToken);
            cookies.set('refreshToken',state.RefreshToken);
          }));
        })
        
        
    }
    catch(e) {
        console.log("ERROR: ");
        console.log(e);
    }
};

export const updateJWT = () => {
  const cookies = new Cookies();
  const jwtc = new JWT();
  jwtc.RefreshToken = cookies.get('refreshToken');
  jwtc.AccessToken = cookies.get('token');
  console.log('refreshToken: '+ jwtc.RefreshToken);
    

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
            const r = fetchToken(jwtc);
            jwtc.AccessToken = state.AccessToken;
            jwtc.RefreshToken = state.RefreshToken;
            console.log('fetchtoken end after update: ' + cookies.get("token"));
        }
        else {
            console.log('fetchtoken end not update: ' + jwtc.AccessToken);
        }
    }
    else {
        console.log('fetchtoken end zero: ' + '0');
    }
    
}