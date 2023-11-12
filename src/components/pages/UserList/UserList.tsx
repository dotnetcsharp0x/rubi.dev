import { useSelector } from "react-redux"
import { useTypedSelector } from "../../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../../store/action-creator/user";
import { IUserAction } from "../../../types/Interfaces/Actions/Users/IUserAction";
import { UserProps } from "../../../types/Interfaces/Users/IUserProps";
import { state } from "../../../state";

export default function UserList() {
    const {users,error,loading} = useTypedSelector(state => state.user);
    const dispatch: any = useDispatch() 
    useEffect(() => {
        dispatch(fetchUsers(state.AccessToken));
    },[dispatch]);
    console.log(users);
    return (
        <div>
            {error &&
                <h2>{error}</h2>
            }
            {users.map(user =>
                <div key={user.Id}>{user.FirstName} - {user.Email}</div>    
            )}
        </div>
    )
}