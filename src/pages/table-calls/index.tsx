import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { fetchCallsStart } from '../../store/callsSlice';
import Calls from '../../shared/components/calls';
import moment from 'moment';
import Preloader from '../../shared/components/preloader';
import { ICall } from '../../interfaces/interfaces';


const TableCalls: React.FC = () => {
  const dispatch = useDispatch();
  const { calls, isLoading, error } = useSelector((state: RootState) => state.calls);
  const [dateRange, setDateRange] = useState<{ dateStart: string, dateEnd: string }>({
    dateStart: moment().subtract(3, 'days').format('YYYY-MM-DD'),
    dateEnd: moment().format('YYYY-MM-DD'),
  });
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    dispatch(fetchCallsStart(dateRange));
  }, [dispatch, dateRange]);


  const changePeriod = (days: number, index: number) => {
    setSelectedIndex(index)
    setDateRange({
      dateStart: moment().subtract(days, 'days').format('YYYY-MM-DD'),
      dateEnd: moment().format('YYYY-MM-DD'),
    });
  };

  const changeDateRange = (start: Date, end: Date) => {
    setSelectedIndex(-1)
    setDateRange({
      dateStart: moment(start).format('YYYY-MM-DD'),
      dateEnd: moment(end).format('YYYY-MM-DD'),
    });
  };
  
  const callsTyped = calls as ICall[];

  if (isLoading) {
    return <Preloader />
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  return (
    <div>
      <Calls calls={callsTyped} changePeriod={changePeriod} changeDateRange={changeDateRange} selectedIndex={selectedIndex} />
    </div>
  );
};

export default TableCalls;