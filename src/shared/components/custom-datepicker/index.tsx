import { useEffect, useState } from 'react';
import './index.css';
import IconArrow from '../../../assets/icon-arrow.svg?react';
import IconCalendar from '../../../assets/icon-calendar.svg?react'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface IOptions {
    title: string;
    period: number;
}

interface ICustomDatepicker {
    changePeriod: (arg0: number, arg1: number) => void,
    changeDateRange: (arg0: Date, arg1: Date) => void,
    selectedIndex: number,
    options: IOptions[]
}

const CustomDatepicker = ({ changePeriod, changeDateRange, selectedIndex, options }: ICustomDatepicker) => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedDateFrom, setSelectedDateFrom] = useState<Date | null>(null);
    const [selectedDateTo, setSelectedDateTo] = useState<Date | null>(null);

    useEffect(() => {
        if (selectedDateFrom && selectedDateTo) changeDateRange(selectedDateFrom, selectedDateTo)

    }, [selectedDateFrom, selectedDateTo, changePeriod]);

    const handleSelect = (index: number) => {
        setIsOpen(false);
        changePeriod(options[index].period, index);
    };

    const handlePrevious = () => {
        const prevIndex = (selectedIndex - 1 + options.length) % options.length;
        handleSelect(prevIndex);
    };

    const handleNext = () => {
        const nextIndex = (selectedIndex + 1) % options.length;
        handleSelect(nextIndex);
    };

    return (
        <div className='custom-datepicker'>
            <div className='custom-datepicker__header'>
                <IconArrow className='custom-datepicker__arrow left' onClick={handlePrevious} />
                <div className='custom-datepicker__container' onClick={() => setIsOpen(!isOpen)}>
                    <IconCalendar className='custom-datepicker__calendar' />
                    <p>
                        {options[selectedIndex]?.title || 'Указать даты'}
                    </p>
                </div>
                <IconArrow className='custom-datepicker__arrow right' onClick={handleNext} />
            </div>

            {isOpen && (
                <ul className='custom-datepicker__list'>
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className={`custom-datepicker__option ${index === selectedIndex ? 'selected' : 'unselected'}`}
                            onClick={() => handleSelect(index)}
                        >
                            {option.title}
                        </li>
                    ))}

                    <div className='custom-datepicker__list-dates'>
                        <p>Указать даты</p>
                        <div className='custom-datepicker__dates'>
                            <div className='custom-datepicker__dates-container'>
                                <DatePicker
                                    selected={selectedDateFrom}
                                    onChange={(date) => setSelectedDateFrom(date)}
                                    dateFormat='dd.MM.yyyy'
                                    popperContainer={({ children }) => <div>{children}</div>}
                                    maxDate={selectedDateTo || undefined}
                                    customInput={
                                        <div className='custom-datepicker__input'>
                                            <span className='placeholder'>
                                                {selectedDateFrom ? selectedDateFrom.toLocaleDateString('ru-RU') : '__.__.____'}
                                            </span>
                                        </div>
                                    }
                                />

                                <p>-</p>
                                <DatePicker
                                    selected={selectedDateTo}
                                    onChange={(date) => setSelectedDateTo(date)}
                                    dateFormat='dd.MM.yyyy'
                                    popperPlacement='bottom-end'
                                    minDate={selectedDateFrom || undefined}
                                    customInput={
                                        <div className='custom-datepicker__input'>
                                            <span className='placeholder'>
                                                {selectedDateTo ? selectedDateTo.toLocaleDateString('ru-RU') : '__.__.____'}
                                            </span>
                                        </div>
                                    }
                                />

                            </div>
                            <IconCalendar className='custom-datepicker__input-calendar' />
                        </div>
                    </div>
                </ul>
            )}
        </div>
    )
}

export default CustomDatepicker 