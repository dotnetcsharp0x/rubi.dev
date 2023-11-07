export interface IStatus {
    code: number;
    message: string;
}

export interface IRespAxiosStatus {
    status:number;
    title:string;
    traceId: string;
    type: string;
}