import React, { FC, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './TableUsers.css'
import { UserInterface } from '../../Interfaces/ObjectInterfaces';

export const TableUsers: FC = () => {
    let fetchedUserList = window.localStorage.getItem("storedUserList");

    if (!fetchedUserList) {
        fetchedUserList = '[]';
    }

    const parsedUserList: Array<UserInterface> = JSON.parse(fetchedUserList)

    const [tableList, setTableList] = useState(parsedUserList)

    let navigate = useNavigate();

    useEffect(() => {
        window.localStorage.setItem("storedUserList", JSON.stringify(tableList));
    }, [tableList])

    const deleteItem = (idToDelete: string | undefined): void => {
        setTableList(tableList.filter((listItem: UserInterface) => {
            return listItem.id !== idToDelete
        }));
    };

    const convertDateString = (date: string) => {
        return date.split('-').reverse().join('-');
    }

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
                {tableList.map((userItem: UserInterface) => (
                    <tr>
                        <td>{`${userItem.firstName} ${userItem.lastName}`}</td>
                        <td>{convertDateString(userItem.dOB)}</td>
                        <td>{userItem.companyName}</td>
                        <td>{userItem.position}</td>
                        <td><button className='delEditBtn' onClick={() => { navigate(`/users/${userItem.id}`) }}>Edit</button></td>
                        <td><button className='delEditBtn' onClick={() => { deleteItem(userItem.id) }}>Delete</button></td>
                    </tr>
                ))}
            </tbody>
        </table>

    )
}