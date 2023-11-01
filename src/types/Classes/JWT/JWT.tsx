import { IJWT } from "../../Interfaces/JWT/IJWT";

export class JWT implements IJWT{
    accessToken!: string;
    refreshToken!: string;
}