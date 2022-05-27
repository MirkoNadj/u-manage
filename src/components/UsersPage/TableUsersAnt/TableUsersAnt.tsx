import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import 'antd/dist/antd.css';
import './TableUsersAnt.scss';

import { Table, Button } from 'antd';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { formatDateForTable } from '../../../services/StorageRepository';
import { User, TableUsers, UserData } from '../../../Interfaces/ObjectInterfaces';

import { PagingLine } from '../../partials/PagingLine/PagingLine';

export const TableUsersAnt = ({ usersList, deleteUser, updateCompanyUsers, title }: TableUsers) => {

    const [pagingStart, setPagingStart] = useState(0);
    const [pagingEnd, setPagingEnd] = useState(usersList.length);

    const deleteItem = (userItem: User) => {
        deleteUser(userItem);
        updateCompanyUsers(userItem);
    };

    const dataSource: UserData[] = usersList.slice(pagingStart, pagingEnd).map((userItem: User) => ({
        id: userItem.id,
        fullName: userItem.firstName + ' ' + userItem.lastName,
        dOB: formatDateForTable(userItem.dOB),
        companyName: userItem.companyName,
        position: userItem.position,
    }))

    const columns = [
        {
            key: '1',
            title: 'FULL NAME',
            dataIndex: 'fullName',
            className: 'fullname-col'

        },
        {
            key: '2',
            title: 'DATE OF BIRTH',
            dataIndex: 'dOB',
            className: 'dOB-col'
        },
        {
            key: '3',
            title: 'COMPANY',
            dataIndex: 'companyName',
            className: 'company-col'
        },
        {
            key: '4',
            title: 'POSITION',
            dataIndex: 'position',
            className: 'position-col'
        },
        {
            key: '5',
            title: '',
            className: 'btn-col',
            render: (record: User) => {
                return (
                    <>
                        <Link to={`/users/${record.id}`} state={{
                            currentCompanyId: '',
                            isUserFormModal: true
                        }}>
                            <Button size={'small'}>
                                <EditOutlined />Edit
                            </Button>
                        </Link>
                        <Button size={'small'} onClick={() => { deleteItem(record) }}>
                            <DeleteOutlined />Delete
                        </Button>
                    </>
                );
            }
        }
    ];

    return (
        <div>
            <Table className='ant-table-override ant-table-theme'
                columns={columns}
                dataSource={dataSource}
                pagination={false}
                title={() => title}
                footer={() => <PagingLine pagingRange={usersList.length} setPagingStart={setPagingStart} setPagingEnd={setPagingEnd} />}
            >
            </Table>
        </div >
    );
};