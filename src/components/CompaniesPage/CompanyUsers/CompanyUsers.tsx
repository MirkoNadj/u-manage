import React from 'react';
import { useParams, Link } from 'react-router-dom';
import '../../UsersPage/Users/UsersStyles/Users.css';
import { TableUsers } from '../../UsersPage/TableUsers/TableUsers';
import { User } from '../../../Interfaces/ObjectInterfaces';
import { AppDispatch, RootState } from '../../../app/store';
import { deleteUser } from '../../../features/usersSlice';
import { connect, ConnectedProps } from 'react-redux';
import { updateCompanyUsers } from '../../../features/companiesSlice';
import { PlusOutlined } from '@ant-design/icons';

export const CompanyUsers = (props: PropsFromRedux) => {
    let { currentCompanyId } = useParams();

    const usersList = props.users.usersList.filter(userItem => userItem.companyId === currentCompanyId);

    return (
        <div className='users-co-page'>
            <div className='toolbar'>
                <h2>Company Users:</h2>
                <Link
                    to='/users/create/'
                    state={{
                        currentCompanyId: currentCompanyId,
                        isUserFormModal: true
                    }}>
                    <button className='addUserCoBtn' title='Add New User'><PlusOutlined /></button>
                </Link>
            </div>
            <TableUsers usersList={usersList} deleteUser={props.deleteUser} updateCompanyUsers={props.updateCompanyUsers} />
        </div>
    )
}

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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyUsers);