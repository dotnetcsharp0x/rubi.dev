import { JWT } from "../../../Classes/JWT/JWT";
import { IUsers } from "../../Users/IUsers";

export interface IUserState {
    users: IUsers[];
    loading: boolean;
    error: null | boolean;
    status: number;
    message: string;
}

export interface IUserStateLogin {
    jwtd: JWT;
    loading: boolean;
    error: null | boolean;
    status: number;
    message: string;
}
export interface IUserStateRegister {
    jwtd: JWT;
    loading: boolean;
    error: null | boolean;
    status: number;
    message: string;
}