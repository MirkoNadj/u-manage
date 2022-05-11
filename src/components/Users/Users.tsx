import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'
import './Users.css';
import { TableUsers } from '../TableUsers/TableUsers';
import { User, LocationProps } from '../../Interfaces/ObjectInterfaces';
import { AppDispatch, RootState } from '../../app/store';
import { deleteUser } from '../../features/usersSlice';
import { connect, ConnectedProps } from 'react-redux';
import { updateCompanyUsers } from '../../features/companiesSlice';
import UserFormModal from '../UsersPage/UserFormModal/UserFormModal';

export const Users = (props: PropsFromRedux) => {
    const [isModal, setIsModall] = useState(false);

    const location = useLocation() as LocationProps;

    useEffect(() => {
        if (location.state) {
            setIsModall(location.state.isUserFormModal)
        }
    }, [location.state]);

    return (
        <div className='users-page'>
            <h1>Users</h1>
            <button className='addBtn'><Link
                to='/users/create/'
                state={{
                    currentCompanyId: '',
                    isUserFormModal: true
                }}>Add
            </Link></button>
            <TableUsers usersList={props.users.usersList} deleteUser={props.deleteUser} updateCompanyUsers={props.updateCompanyUsers} />
            {isModal && <UserFormModal setIsModall={setIsModall} />}
        </div>
    );
};

let mapStateToProps = (state: RootState) => {
    return {
        users: state.users
    };
};

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        deleteUser: (user: User) => dispatch(deleteUser(user)),
        updateCompanyUsers: (user: User) => dispatch(updateCompanyUsers(user))
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export default connect(mapStateToProps, mapDispatchToProps)(Users);