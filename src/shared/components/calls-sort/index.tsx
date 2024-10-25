import CustomDatepicker from '../custom-datepicker';
import CustomSelect from '../custom-select'
import './index.css'

interface ICallsSort {
    changePeriod: (arg0: number, arg1: number) => void,
    setFilterType: (arg0: number | null) => void,
    setSortByDuration: (arg0: string | number) => void,
    setSortByTime: (arg0: string) => void,
    changeDateRange: (arg0: Date, arg1: Date) => void,
    sortByDuration: string | number,
    sortByTime: string,
    selectedIndex: number
}

const CallsSort = ({ changePeriod, setFilterType, sortByDuration, sortByTime, setSortByDuration, setSortByTime, changeDateRange, selectedIndex }: ICallsSort) => {
    const optionsSelect = [
        { title: 'Все типы', in_out: null },
        { title: 'Входящие', in_out: 1 },
        { title: 'Исходящие', in_out: 0 }

    ];

    const optionsDatepicker = [
        { title: '3 дня', period: 3 },
        { title: 'Неделя', period: 7 },
        { title: 'Месяц', period: 30 },
        { title: 'Год', period: 365 }
    ]

    return (
        <div className='calls__sort'>
            <CustomSelect
                options={optionsSelect}
                setFilterType={setFilterType}
                sortByDuration={sortByDuration}
                sortByTime={sortByTime}
                setSortByDuration={setSortByDuration}
                setSortByTime={setSortByTime}
            />

            <CustomDatepicker changePeriod={changePeriod} changeDateRange={changeDateRange} selectedIndex={selectedIndex} options={optionsDatepicker} />
        </div>
    )
}

export default CallsSort