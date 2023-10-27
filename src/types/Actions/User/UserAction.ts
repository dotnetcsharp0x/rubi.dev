import { IFetchUserAction, IFetchUserErrorAction, IFetchUserSuccessAction } from "../../Interfaces/Actions/Users/IFetchUsersAction";

export type UserAction = IFetchUserAction | IFetchUserSuccessAction | IFetchUserErrorAction;