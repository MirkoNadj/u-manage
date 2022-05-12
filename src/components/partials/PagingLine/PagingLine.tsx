import React, { useState, ChangeEvent } from 'react';
import './PagingLineStyles/PagingLine.css'

export function PagingLine({ pagingRange, setPagingStart, setPagingEnd }: any) {

    const [perPage, setPerPage] = useState(5);
    const [page, setPage] = useState(0)

    const eventHadler = (event: ChangeEvent<HTMLSelectElement>) => {
        setPerPage(parseInt(event.target.value));
        setPage(0);
    }

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
            <div className='page-btns'>
                <p>Results per page:</p>
                <select
                    id='results-range'
                    name='results-range'
                    value={perPage}
                    onChange={eventHadler}
                >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
                <button
                    disabled={!(toPageF() > perPage)}
                    onClick={() => { setPage(page - 1) }}
                >{'<'}
                </button>

                <button className='page' onClick={() => { setPage(page) }}>{page + 1}</button>

                <button
                    disabled={(toPageF() >= pagingRange)}
                    onClick={() => { setPage(page + 1) }}
                >{'>'}
                </button>
            </div>
        </div>
    )
}