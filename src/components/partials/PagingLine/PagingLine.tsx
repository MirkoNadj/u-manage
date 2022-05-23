import React, { useState } from 'react';
import './PagingLine.scss'
import { Button } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { Paging } from '../../../Interfaces/ObjectInterfaces';

export function PagingLine({ pagingRange, setPagingStart, setPagingEnd }: Paging) {

    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(0)

    const selectHadler = (value: number) => {
        setPerPage(value);
        setPage(0);
    }

    const { Option } = Select;

    const toPageF = () => {
        let toPage = 1;
        if (pagingRange >= (page + 1) * perPage) {
            toPage = (page + 1) * perPage;
        }
        if (pagingRange < (page + 1) * perPage) {
            toPage = ((page + 1) * perPage) + (pagingRange - (page + 1) * perPage);

        } return toPage;
    }

    setPagingStart(page * perPage);
    setPagingEnd(toPageF());


    return (
        <div className='paging-line'>
            <div className='page-info'>
                <p>Showing {page * perPage + 1} - {toPageF()} of {pagingRange} results</p>
            </div>
            <div className='page-btns-container'>
                <p>Results per page:</p>
                <Select
                    id='results-range'
                    defaultValue={5}
                    onChange={selectHadler}
                >
                    <Option value={5}>5</Option>
                    <Option value={10}>10</Option>
                    <Option value={20}>20</Option>
                    <Option value={50}>50</Option>
                </Select>
                <Button
                    disabled={!(toPageF() > perPage)}
                    onClick={() => { setPage(page - 1) }}
                ><LeftOutlined />
                </Button>

                <Button onClick={() => { setPage(page) }}>{page + 1}</Button>

                <Button
                    disabled={(toPageF() >= pagingRange)}
                    onClick={() => { setPage(page + 1) }}
                ><RightOutlined />
                </Button>
            </div>
        </div>
    );
};