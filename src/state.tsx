import { proxy } from "valtio"
import { IJWT } from "./types/Interfaces/JWT/IJWT"
import { JWT } from "./types/Classes/JWT/JWT";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const state = proxy<IJWT>({ 
    AccessToken: cookies.get('token')
    ,RefreshToken:cookies.get('refreshToken')
});

export {state};