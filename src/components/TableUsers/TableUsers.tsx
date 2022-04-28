import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './TableUsers.css'
import { User } from '../../Interfaces/ObjectInterfaces';
import { convertDateString } from '../../services/StorageRepository';
import { AppDispatch, RootState } from '../../app/store';
import { deleteUser } from '../../features/usersSlice';
import { updateCompanyUsers } from '../../features/companiesSlice';
import { connect, ConnectedProps } from 'react-redux';

const TableUsers = (props: PropsFromRedux) => {
    let navigate = useNavigate();
    const { currentCompanyId } = useParams();
    const [tableList, setTableList] = useState(props.users.usersList);

    useEffect(() => {
        setTableList(props.users.usersList)
    }, [props.users.usersList])

    useEffect(() => {
        if (currentCompanyId) {
            setTableList(props.users.usersList.filter((userItem: User) => userItem.companyId === currentCompanyId));
        }
    }, [currentCompanyId, props.users.usersList]);

    const deleteItem = (userItem: User) => {
        props.deleteUser(userItem);
        props.updateCompanyUsers(userItem);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>Full name:</th>
                    <th>Date Of Birth:</th>
                    <th>Company:</th>
                    <th>Position:</th>
                </tr>
            </thead>
            <tbody>
                {tableList.map((userItem: User, key: number) => {
                    return (
                        <tr key={userItem.id}>
                            <td>{`${userItem.firstName} ${userItem.lastName}`}</td>
                            <td>{convertDateString(userItem.dOB)}</td>
                            <td>{userItem.companyName}</td>
                            <td>{userItem.position}</td>
                            <td><button className='delEditBtn' onClick={() => { navigate(`/users/${userItem.id}`) }}>Edit</button></td>
                            <td><button className='delEditBtn' onClick={() => { deleteItem(userItem) }}>Delete</button></td>
                        </tr>)
                })}
            </tbody>
        </table>
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

export default connect(mapStateToProps, mapDispatchToProps)(TableUsers);