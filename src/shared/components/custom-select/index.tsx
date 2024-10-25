import { useState } from 'react';
import './index.css';
import IconArrow from '../../../assets/icon-arrow.svg?react'
import IconClose from '../../../assets/icon-close.svg?react'


interface IOptions {
    title: string;
    in_out: number | null;
}


interface ICustomSelect {
    setFilterType: (arg0: number | null) => void,
    setSortByDuration: (arg0: string | number) => void,
    setSortByTime: (arg0: string) => void,
    sortByDuration: string | number,
    sortByTime: string,
    options: IOptions[]
}

const CustomSelect = ({ options, setFilterType, sortByDuration, sortByTime, setSortByDuration, setSortByTime }: ICustomSelect) => {
  const [selected, setSelected] = useState('Все типы');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: IOptions) => {
    setSelected(option.title);
    setFilterType(option.in_out)
    setIsOpen(false);
  };

  const handleReset = () => {
    setFilterType(null)
    setSortByTime('DESC')
    setSortByDuration(0)
    setSelected('Все типы')
  }

  return (
    <div className='custom-select'>
      <div
        className={`custom-select__header ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <p className={selected !== 'Все типы' ? 'selected' : ''}>{selected}</p>
        <IconArrow className={`arrow ${isOpen ? 'up' : 'down'}`} />
      </div>
      {selected !== 'Все типы' || sortByTime !== 'DESC' || sortByDuration !== 0 ? <div className='custom-select__reset' onClick={() => handleReset()}>
        <p>Сбросить фильтры</p>
        <IconClose />
      </div> : ''}
      {isOpen && (
        <ul className='custom-select__list'>
          {options && options.map((option) => (
            <li
              key={option.title}
              className={`custom-select__option ${selected === option.title ? 'selected' : 'unselected'}`}
              onClick={() => handleSelect(option)}
            >
              {option.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;