import { JWT } from "../../../Classes/JWT/JWT";
import { IUsers } from "../../Users/IUsers";

export interface IUserState {
    users: IUsers[];
    loading: boolean;
    error: null | boolean;
}

export interface IUserStateLogin {
    jwtd: JWT;
    loading: boolean;
    error: null | boolean;
}