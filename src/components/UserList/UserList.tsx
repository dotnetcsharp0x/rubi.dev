import { useSelector } from "react-redux"
import { useTypedSelector } from "../../hooks/useTypedSelector";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUsers } from "../../store/action-creator/user";
import { IUserAction } from "../../types/Interfaces/Actions/Users/IUserAction";

const UserList: React.FC = () => {
    const {users,error,loading} = useTypedSelector(state => state.user);
    const dispatch: any = useDispatch() 
    useEffect(() => {
        dispatch(fetchUsers());
    },[]);
    console.log(users);
    return (
        <div>
            <h2>Users</h2>
            {users.map(user =>
                <div key={user.id}>{user.firstName} - {user.email}</div>    
            )}
        </div>
    )
}

export default UserList;