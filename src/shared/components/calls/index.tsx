import { useState } from 'react';
import CallsSort from '../calls-sort';
import CallsTable from '../calls-table';
import './index.css';
import { ICall } from '../../../interfaces/interfaces';

interface ICalls {
  calls: ICall[],
  changePeriod: (arg0: number, arg1: number) => void,
  changeDateRange: (arg0: Date, arg1: Date) => void,
  selectedIndex: number
}

const Calls = ({ calls, changePeriod, changeDateRange, selectedIndex }: ICalls) => {
  const [filterType, setFilterType] = useState<number | null>(null)
  const [sortByTime, setSortByTime] = useState<string>('DESC')
  const [sortByDuration, setSortByDuration] = useState<number | string>(0)

  return (
    <section className='calls'>
      <CallsSort
        changePeriod={changePeriod}
        setFilterType={setFilterType}
        sortByDuration={sortByDuration}
        sortByTime={sortByTime}
        setSortByDuration={setSortByDuration}
        setSortByTime={setSortByTime}
        changeDateRange={changeDateRange}
        selectedIndex={selectedIndex} />
      <CallsTable
        calls={calls}
        filterType={filterType}
        sortByDuration={sortByDuration}
        sortByTime={sortByTime}
        setSortByDuration={setSortByDuration}
        setSortByTime={setSortByTime} />
    </section>
  )
}

export default Calls