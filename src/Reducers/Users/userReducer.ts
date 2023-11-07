import { UserActionTypes } from "../../types/Interfaces/Actions/Users/IFetchUsersAction";
import { IUserAction, IUserActionLogin, IUserActionRegister } from "../../types/Interfaces/Actions/Users/IUserAction";
import { IUserState, IUserStateLogin, IUserStateRegister } from "../../types/Interfaces/Reducers/User/IUserState";

const initialState: IUserState = {
    users: [],
    loading: false,
    error: null,
    status:0,
    message:''
}

const initialStateLogin: IUserStateLogin = {
    jwtd: {AccessToken:"",RefreshToken:""},
    loading: false,
    error: null,
    status:0,
    message:''
}
const initialStateRegister: IUserStateRegister = {
    jwtd: {AccessToken:"",RefreshToken:""},
    loading: false,
    error: null,
    status:0,
    message:''
}
//22:09
export const userReducer = (state = initialState,action: IUserAction): IUserState => {
    switch(action.type) {
        case UserActionTypes.FETCH_USERS:
            return {loading: true, error: null, users: [],status:0,message:''}
        case UserActionTypes.FETCH_USERS_SUCCESS:
            return {loading: false, error: null, users: action.payload,status:action.status,message:action.message}
        case UserActionTypes.FETCH_USERS_ERROR:
            return {loading: false, error: action.payload, users: [],status:action.status,message:action.message}    
        default:
            return state
    }
}
export const userReducerLogin = (state = initialStateLogin,action: IUserActionLogin): IUserStateLogin => {
    switch(action.type) {
        case UserActionTypes.LOGIN_USER:
            return {loading: true, error: null, jwtd: {AccessToken: "",RefreshToken:""},status:0,message:''}
        case UserActionTypes.LOGIN_USER_SUCCESS:
            return {loading: false, error: null, jwtd: action.payload,status:action.status,message:action.message}
        case UserActionTypes.LOGIN_USER_ERROR:
            return {loading: false, error: action.payload, jwtd: {AccessToken: "",RefreshToken:""},status:action.status,message:action.message}    
        default:
            return state
    }
}
export const userReducerRegister = (state = initialStateRegister,action: IUserActionRegister): IUserStateRegister => {
    switch(action.type) {
        case UserActionTypes.REGISTER_USER:
            return {loading: true, error: null, jwtd: {AccessToken: "",RefreshToken:""},status:0,message:''}
        case UserActionTypes.REGISTER_USER_SUCCESS:
            return {loading: false, error: null, jwtd: action.payload,status:action.status,message:action.message}
        case UserActionTypes.REGISTER_USER_ERROR:
            return {loading: false, error: action.payload, jwtd: {AccessToken: "",RefreshToken:""},status:action.status,message:action.message}    
        default:
            return state
    }
}