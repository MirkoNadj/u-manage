import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom'
import './Users.scss';
import { TableUsersAnt } from '../TableUsersAnt/TableUsersAnt';
import { User, LocationProps } from '../../../Interfaces/ObjectInterfaces';
import { AppDispatch, RootState } from '../../../app/store';
import { deleteUser } from '../../../features/usersSlice';
import { connect, ConnectedProps } from 'react-redux';
import { updateCompanyUsers } from '../../../features/companiesSlice';
import UserFormModal from '../UserFormModal/UserFormModal';
import { PlusOutlined } from '@ant-design/icons';
import { Button } from 'antd';

export const Users = (props: PropsFromRedux) => {
    const [isModal, setIsModal] = useState(false);

    const location = useLocation() as LocationProps;

    useEffect(() => {
        if (location.state) {
            setIsModal(location.state.isUserFormModal)
        }
    }, [location.state]);

    return (
        <div className='users-page'>
            <div className='toolbar'>

                <Link
                    to='/users/create/'
                    state={{
                        currentCompanyId: '',
                        isUserFormModal: true
                    }}>
                    <Button type="primary" size='large' title='Add New User'>
                        <PlusOutlined />
                    </Button>
                </Link>

            </div>
            <TableUsersAnt usersList={props.users.usersList} deleteUser={props.deleteUser} updateCompanyUsers={props.updateCompanyUsers} title={'Users'} />
            {isModal && <UserFormModal setIsModal={setIsModal} />}
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