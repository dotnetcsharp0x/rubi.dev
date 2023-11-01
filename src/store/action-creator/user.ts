import { Dispatch } from "react"
import { UserActionTypes } from "../../types/Interfaces/Actions/Users/IFetchUsersAction"
import { IUserAction, IUserActionLogin } from "../../types/Interfaces/Actions/Users/IUserAction"
import axios from "axios"
import Cookies from "universal-cookie"
import { UserProps } from "../../types/Interfaces/Users/IUserProps"
import { IJWT } from "../../types/Interfaces/JWT/IJWT"
import { config } from "process"
import { Login } from "../../types/Classes/Login/Login"
//export default function Header(props: UserProps) {
export const fetchUsers = (props: string) => {
    return async (dispatch: Dispatch<IUserAction>) => {
        try {
            dispatch({
                type:UserActionTypes.FETCH_USERS
            });
            const config = {
                headers: { Authorization: `Bearer ${props}` }
            };
            const resp = await axios.get('https://46.22.247.253:5001/api/User/GetUsers',config)
            dispatch({type:UserActionTypes.FETCH_USERS_SUCCESS, payload: resp.data})
        }
        catch (e) {
            dispatch({
                type:UserActionTypes.FETCH_USERS_ERROR, 
                payload: String(e)
            })
        }
    }
}

export const  LoginUser = (props: Login) => {
    return async (dispatch: Dispatch<IUserActionLogin>) => {
        try {
            const resp = await axios.post<IJWT>('https://46.22.247.253:5001/api/User/Login',props);
            console.log("dispatch");
            console.log(resp.data);
            dispatch({type: UserActionTypes.LOGIN_USER_SUCCESS,payload: resp.data})
        }
        catch (e) {
            dispatch({
                type: UserActionTypes.LOGIN_USER_ERROR,
                payload: String(e)
            })
        }
    }
}