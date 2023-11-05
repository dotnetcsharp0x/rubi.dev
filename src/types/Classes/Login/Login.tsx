import { ILogin } from "../../Interfaces/Login/ILogin";

export class Login implements ILogin{
    Email!: string;
    Password!: string;
}