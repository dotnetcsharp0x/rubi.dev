import { IJWT } from "../../JWT/IJWT";

export interface IUserAction {
    type: string;
    payload?: any;
}

export interface IUserActionLogin {
    type: string;
    payload?: any;
}