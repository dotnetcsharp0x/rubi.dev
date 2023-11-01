import { Dispatch } from "react"
import { UserActionTypes } from "../../types/Interfaces/Actions/Users/IFetchUsersAction"
import { IUserAction } from "../../types/Interfaces/Actions/Users/IUserAction"
import axios from "axios"
import Cookies from "universal-cookie"

export const fetchUsers = () => {
    return async (dispatch: Dispatch<IUserAction>) => {
        try {
            dispatch({
                type:UserActionTypes.FETCH_USERS
            });
            const cookies = new Cookies();
            const config = {
                headers: { Authorization: `Bearer ${cookies.get('jwt')}` }
            };
            const response = await axios.get('https://46.22.247.253:5001/api/User/GetUsers',config)
            dispatch({type:UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
        }
        catch (e) {
            dispatch({
                type:UserActionTypes.FETCH_USERS_ERROR, 
                payload: String(e)
            })
        }
    }
}