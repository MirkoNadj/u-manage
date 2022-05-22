import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './CompanyUsers.scss';
import { TableUsersAnt } from '../../UsersPage/TableUsersAnt/TableUsersAnt';
import { User } from '../../../Interfaces/ObjectInterfaces';
import { AppDispatch, RootState } from '../../../app/store';
import { deleteUser } from '../../../features/usersSlice';
import { connect, ConnectedProps } from 'react-redux';
import { updateCompanyUsers } from '../../../features/companiesSlice';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const CompanyUsers = (props: PropsFromRedux) => {
    let { currentCompanyId } = useParams();

    const usersList = props.users.usersList.filter(userItem => userItem.companyId === currentCompanyId);

    return (
        <div className='company-users-page'>
            <div className='toolbar'>
                <Link
                    to='/users/create/'
                    state={{
                        currentCompanyId: currentCompanyId,
                        isUserFormModal: true
                    }}>
                    <Button className='addUserCoBtn' title='Add New User'><PlusOutlined /></Button>
                </Link>
            </div>
            <TableUsersAnt usersList={usersList} deleteUser={props.deleteUser} updateCompanyUsers={props.updateCompanyUsers} title={'Company Users'} />
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