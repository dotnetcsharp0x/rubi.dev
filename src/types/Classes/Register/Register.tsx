import { IRegister } from "../../Interfaces/Register/IRegister";

export class RegisterU implements IRegister{
    FirstName!: string;
    LastName!: string;
    Email!: string;
    Password!: string;
}