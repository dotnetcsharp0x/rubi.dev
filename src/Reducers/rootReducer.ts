import { combineReducers } from "redux";
import { userReducer, userReducerLogin } from "./Users/userReducer";

export const rootReducer = combineReducers( {
    user: userReducer,
    user_login: userReducerLogin,
})

export type RootState = ReturnType<typeof rootReducer>