import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../Reducers/rootReducer";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector