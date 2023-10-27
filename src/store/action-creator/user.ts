import { Dispatch } from "react"
import { UserActionTypes } from "../../types/Interfaces/Actions/Users/IFetchUsersAction"
import { IUserAction } from "../../types/Interfaces/Actions/Users/IUserAction"
import axios from "axios"

export const fetchUsers = () => {
    return async (dispatch: Dispatch<IUserAction>) => {
        try {
            dispatch({
                type:UserActionTypes.FETCH_USERS
            })
            const response = await axios.get('https://localhost:7168/api/User/GetUsers')
            dispatch({type:UserActionTypes.FETCH_USERS_SUCCESS, payload: response.data})
        }
        catch (e) {
            dispatch({
                type:UserActionTypes.FETCH_USERS_ERROR, 
                payload: 'Ошибка при загрузке пользователей'
            })
        }
    }
}