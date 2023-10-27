import { IUsers } from "../../Users/IUsers";

export interface IUserState {
    users: IUsers[];
    loading: boolean;
    error: null | boolean;
}