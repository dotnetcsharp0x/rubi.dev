import { IJWT } from "../../JWT/IJWT";

export interface IUserAction {
    type: string;
    payload?: any;
    status: number;
    message: string;
}

export interface IUserActionLogin {
    type: string;
    payload?: any;
    status: number;
    message: string;
}

export interface IUserActionRegister {
    type: string;
    payload?: any;
    status: number;
    message: string;
}