import { UserActionTypes } from "../../types/Interfaces/Actions/Users/IFetchUsersAction";
import { IUserAction, IUserActionLogin } from "../../types/Interfaces/Actions/Users/IUserAction";
import { IUserState, IUserStateLogin } from "../../types/Interfaces/Reducers/User/IUserState";

const initialState: IUserState = {
    users: [],
    loading: false,
    error: null
}

const initialStateLogin: IUserStateLogin = {
    jwtd: {accessToken:"",refreshToken:""},
    loading: false,
    error: null
}
//22:09
export const userReducer = (state = initialState,action: IUserAction): IUserState => {
    switch(action.type) {
        case UserActionTypes.FETCH_USERS:
            return {loading: true, error: null, users: []}
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {loading: false, error: null, users: action.payload}
        case UserActionTypes.FETCH_USERS_ERROR:
            return {loading: false, error: action.payload, users: []}    
        default:
            return state
    }
}
export const userReducerLogin = (state = initialStateLogin,action: IUserActionLogin): IUserStateLogin => {
    switch(action.type) {
        case UserActionTypes.LOGIN_USER:
            return {loading: true, error: null, jwtd: {accessToken: "",refreshToken:""}}
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return {loading: false, error: null, jwtd: action.payload}
        case UserActionTypes.LOGIN_USER_ERROR:
            return {loading: false, error: action.payload, jwtd: {accessToken: "",refreshToken:""}}    
        default:
            return state
    }
}