import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import './TableCompaniesAnt.scss';
import { Company, TableCompanies, CompanyData } from '../../../Interfaces/ObjectInterfaces';
import { PagingLine } from '../../partials/PagingLine/PagingLine';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';

export const TableCompaniesAnt = ({ companiesList, deleteCompany, removeCompanyNameForUsers }: TableCompanies) => {

    const [pagingStart, setPagingStart] = useState(0);
    const [pagingEnd, setPagingEnd] = useState(companiesList.length);

    const deleteItem = (companyItem: Company): void => {
        deleteCompany(companyItem);
        removeCompanyNameForUsers(companyItem);
    };

    const dataSource: CompanyData[] = companiesList.slice(pagingStart, pagingEnd).map((companyItem: Company) => ({
        id: companyItem.id,
        name: companyItem.name,
        city: companyItem.city,
        country: companyItem.country,
        numOfUsers: companyItem.users.length,
    }))

    const columns = [
        {
            key: '1',
            title: 'NAME',
            dataIndex: 'name',
            className: 'name-col',
        },
        {
            key: '2',
            title: 'CITY',
            dataIndex: 'city',
            className: 'city-col'
        },
        {
            key: '3',
            title: 'COUNTRY',
            dataIndex: 'country',
            className: 'country-col'
        },
        {
            key: '4',
            title: 'NUM. OF USERS',
            dataIndex: 'numOfUsers',
            className: 'num-of-users-col'
        },
        {
            key: '5',
            title: '',
            className: 'btns-col',
            render: (record: Company) => {
                return (
                    <>
                        <Link to={`/companies/${record.id}`} state={{
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
                )
            }
        }
    ]

    return (
        <div>
            <Table className='ant-co-table-override ant-table-theme'
                columns={columns}
                dataSource={dataSource}
                title={() => 'Companies'}
                pagination={false}
                footer={() => <PagingLine pagingRange={companiesList.length} setPagingStart={setPagingStart} setPagingEnd={setPagingEnd} />}
            >
            </Table>
        </div>
    );
}