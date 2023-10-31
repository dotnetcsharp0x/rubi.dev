import { IJWT } from "../../Interfaces/JWT/IJWT";

export class JWT implements IJWT{
    token!: string;
    refreshToken!: string;
}