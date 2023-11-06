import { IJWT } from "../../Interfaces/JWT/IJWT";

export class JWT implements IJWT{
    AccessToken!: string;
    RefreshToken!: string;
}