import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'
import './TableUsers.css'
import { User } from '../../Interfaces/ObjectInterfaces';
import { convertDateString, updateCompanyUsers } from '../../services/StorageRepository';
//import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { deleteUser } from '../../features/usersSlice';
import { connect, ConnectedProps } from 'react-redux';

const TableUsers = (props: PropsFromRedux) => {
    let navigate = useNavigate();
    const { currentCompanyId } = useParams();
    //const users = useSelector((state: RootState) => state.users.value);
    //const dispatch = useDispatch();
    const [tableList, setTableList] = useState(props.users.value)

    useEffect(() => {
        if (currentCompanyId) {
            setTableList(props.users.value.filter((userItem: User) => userItem.companyId === currentCompanyId));
        }
    }, [currentCompanyId, props.users.value]);

    useEffect(() => {
        setTableList(props.users.value)
    }, [props.users.value])

    const deleteItem = (userItem: User) => {
        props.deleteU(userItem)
        updateCompanyUsers(userItem)
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
    }
}

let mapDispatchToProps = (dispatch: AppDispatch) => {
    return {
        deleteU: (x: User) => dispatch(deleteUser(x))
    }
}

const connector = connect(mapStateToProps, mapDispatchToProps)
type PropsFromRedux = ConnectedProps<typeof connector>

export default connect(mapStateToProps, mapDispatchToProps)(TableUsers)