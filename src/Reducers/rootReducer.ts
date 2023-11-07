import { combineReducers } from "redux";
import { userReducer, userReducerLogin, userReducerRegister } from "./Users/userReducer";

export const rootReducer = combineReducers( {
    user: userReducer,
    user_login: userReducerLogin,
    user_register: userReducerRegister,
})

export type RootState = ReturnType<typeof rootReducer>