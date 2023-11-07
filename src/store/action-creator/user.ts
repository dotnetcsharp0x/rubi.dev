import { Dispatch, useState } from "react"
import { UserActionTypes } from "../../types/Interfaces/Actions/Users/IFetchUsersAction"
import { IUserAction, IUserActionLogin, IUserActionRegister } from "../../types/Interfaces/Actions/Users/IUserAction"
import axios, { AxiosError, AxiosResponse } from "axios"
import Cookies from "universal-cookie"
import { UserProps } from "../../types/Interfaces/Users/IUserProps"
import { IJWT } from "../../types/Interfaces/JWT/IJWT"
import { config } from "process"
import { Login } from "../../types/Classes/Login/Login"
import { state } from "../../state"
import { fetchToken } from "../.."
import { IRespAxiosStatus } from "../../types/Interfaces/Login/IStatus"
import { RegisterU } from "../../types/Classes/Register/Register"
//export default function Header(props: UserProps) {
    
export const fetchUsers = (props: string) => {
    
    return async (dispatch: Dispatch<IUserAction>) => {
        let status_code=0;
        try {
            const config = {
                headers: { Authorization: `Bearer ${state.AccessToken}` },
                params: {
                    "token":state.AccessToken
                }
            };

            dispatch({
                type:UserActionTypes.FETCH_USERS,
                status:status_code,
                message:'ok'
            });
            console.log(state.AccessToken);
            const resp = await axios.get('https://46.22.247.253:5007/api/User/GetUsers',config)
            dispatch({type:UserActionTypes.FETCH_USERS_SUCCESS, payload: resp.data, status: resp.status,message:'ok'})
        }
        catch (e) {
            dispatch({
                type:UserActionTypes.FETCH_USERS_ERROR, 
                payload: String(e),
                status: status_code,
                message:'ok'
            })
        }
    }
}

export const  LoginUser = (props: Login) => {
    
    return async (dispatch: Dispatch<IUserActionLogin>) => {
        
        try {
            const resp = await axios.post<IJWT>('https://46.22.247.253:5007/api/User/Login',props);
            dispatch({type: UserActionTypes.LOGIN_USER_SUCCESS,payload: resp.data, status:200,message:'ok'})
        }
        catch (error : AxiosError<AxiosResponse> | any) {
            let message='';
            if(error.response.status == 404) {
                message = "User not found";
            }
            if(error.response.status == 403) {
                message = "Incorrect password";
            }
            dispatch({
                type: UserActionTypes.LOGIN_USER_ERROR,
                payload: String(error.message),
                status: error.response.status,
                message: message,
            })
        }
    }
}

export const  RegisterUser = (props: RegisterU) => {
    return async (dispatch: Dispatch<IUserActionRegister>) => {
        
        try {
            const resp = await axios.post<IJWT>('https://46.22.247.253:5007/api/User/Register',props);
            console.log(resp);
            let message='';
            if(resp.status == 208) {
                message='User already exist';
            }
            dispatch({type: UserActionTypes.REGISTER_USER_SUCCESS,payload: resp.data, status:resp.status,message:message})
        }
        catch (error : AxiosError<AxiosResponse> | any) {
            let message='';
            if(error.response.status == 208) {
                message = "User already exist";
            }
            dispatch({
                type: UserActionTypes.REGISTER_USER_ERROR,
                payload: String(error.message),
                status: error.response.status,
                message: message,
            })
        }
    }
}