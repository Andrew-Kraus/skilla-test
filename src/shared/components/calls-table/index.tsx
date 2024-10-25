import CallsItem from '../calls-item'
import IconArrow from '../../../assets/icon-arrow.svg?react'
import './index.css'
import React from 'react';
import { ICall } from '../../../interfaces/interfaces';

interface ICallsTable {
    setSortByDuration: (arg0: string | number) => void,
    setSortByTime: (arg0: string) => void,
    sortByDuration: string | number,
    sortByTime: string,
    calls: ICall[],
    filterType: number | null
}

const CallsTable = ({ calls, filterType, setSortByDuration, setSortByTime, sortByTime, sortByDuration }: ICallsTable) => {
    let previousDate = '';
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    const callsPerDay = calls.reduce((acc: { [key: string]: number }, call: ICall) => {
        const callDate = call.date.split(' ')[0];
        acc[callDate] = (acc[callDate] || 0) + 1;
        return acc;
    }, {});

    const sortTime = (a: ICall, b: ICall) => {
        return sortByTime === 'ASC' ? new Date(a.date).getTime() - new Date(b.date).getTime() : new Date(b.date).getTime() - new Date(a.date).getTime()
    }

    const handleSortTime = () => {
        sortByTime === 'ASC' ? setSortByTime('DESC') : setSortByTime('ASC')
    }

    const handleSortDuration = () => {
        if (sortByDuration === 'DESC') setSortByDuration('ASC')
        if (sortByDuration === 'ASC') setSortByDuration(0)
        if (sortByDuration === 0) setSortByDuration('DESC')
    }


    const sortDuration = (a: ICall, b: ICall) => {
        if (sortByDuration === 'DESC') return a.time - b.time;
        if (sortByDuration === 'ASC') return b.time - a.time;
        return 0;
    }


    return (
        <div className='table-background'>
            <table className='calls__table'>
                <thead>
                    <tr>
                        <th>Тип</th>
                        <th onClick={() => handleSortTime()}><div className='calls__th-container'><p>Время</p><IconArrow className={sortByTime !== 'DESC' ? 'active' : ''} /></div></th>
                        <th>Сотрудник</th>
                        <th>Звонок</th>
                        <th>Источник</th>
                        <th>Оценка</th>
                        <th onClick={() => handleSortDuration()}><div className='calls__th-container'><p>Длительность</p><IconArrow className={sortByDuration !== 0 ? 'active' : ''} /></div></th>
                    </tr>
                </thead>
                <tbody>
                    {calls.filter((call) => call.in_out !== filterType).sort((a, b) => sortTime(a, b)).sort((a, b) => sortDuration(a, b)).map((call) => {
                        const callDate = call.date_notime
                        const isNewDay = callDate !== previousDate;
                        previousDate = callDate;
                        const callCount = callsPerDay[callDate];


                        return (
                            <React.Fragment key={call.id}>
                                {isNewDay && callDate !== today && (
                                    <tr className='calls__date-row'>
                                        <td colSpan={7} className='calls__date-header'>
                                            {callDate === today
                                                ? ''
                                                : callDate === yesterday
                                                    ? <p>Вчера <span>{callCount}</span></p>
                                                    : <p>{callDate} <span>{callCount}</span></p>}
                                        </td>
                                    </tr>
                                )}
                                <CallsItem
                                    key={call.id}
                                    type={call.in_out}
                                    time={call.date}
                                    employeeImg={call.person_avatar}
                                    phoneToNumber={call.to_number}
                                    phoneFromNumber={call.from_number}
                                    status={call.status}
                                    source={call.source}
                                    duration={call.time}
                                    recordId={call.record ?? ''}
                                    errors={call.errors ?? []}
                                    partnershipId={call.partnership_id ?? ''} 
                                    contactName={call.contact_name ?? ''}
                                    contactCompany={call.contact_company ?? ''}
                                />
                            </React.Fragment>
                        );
                    })}
                </tbody>
            </table>
        </div>

    )
}

export default CallsTable