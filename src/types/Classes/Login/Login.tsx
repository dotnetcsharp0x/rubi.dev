import { ILogin } from "../../Interfaces/Login/ILogin";

export class Login implements ILogin{
    email!: string;
    password!: string;
}