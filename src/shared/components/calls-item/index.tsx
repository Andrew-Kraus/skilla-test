import './index.css'
import IconCall from '../../../assets/icon-call.svg?react';
import IconAvatar from '../../../assets/icon-avatar.svg?react';
import AudioPlayer from '../../containers/audio-player';
import { useState } from 'react';
import { checkCallType, formatDuration, randomGrade } from '../../utils/commonUtils';

interface ICallsItem {
    type: number,
    time: string,
    employeeImg: string,
    source: string,
    duration: number,
    status: string,
    phoneToNumber: string,
    phoneFromNumber: string,
    recordId: string,
    errors: string[],
    partnershipId: string,
    contactName: string,
    contactCompany: string
}


const CallsItem = ({ type, time, employeeImg, source, duration, status, phoneFromNumber, phoneToNumber, recordId, errors, partnershipId, contactName, contactCompany }: ICallsItem) => {
    const [activeRecordsId, setActiveRecordsId] = useState<string[]>([])
    const grade = randomGrade();

    return (
        <tr>
            <td><IconCall className={`calls__icon-call ${checkCallType(type, status)}`} /></td>
            <td>{time.split(' ')[1].slice(0, 5)}</td>
            <td>{employeeImg ? <img className='calls__avatar' src={employeeImg} alt='Работник' /> : <div className='calls__avatar-absent'><IconAvatar /></div>}</td>
            <td>
                <div className='calls__contact'>
                    {contactName && <p className='calls__contact-name'>{contactName}</p>}
                    {contactCompany ? <p className={`calls__contact-number ${contactName && 'low-visible'}`}>{contactCompany}</p> : type === 0 ? <p className={`calls__contact-number ${contactName && 'low-visible'}`}>{phoneToNumber}</p> : <p>{phoneFromNumber}</p>}
                </div>
            </td>
            <td className='calls__source'>{source}</td>
            <td>{errors.length !== 0 ? <p className='calls__error-text'>{errors[0]}</p> : <div className={`calls__grade ${grade.className}`}>{grade.text}</div>}</td>
            <td>
                <p className={`calls__duration-text ${recordId && 'hide'} ${activeRecordsId.includes(recordId) && 'active'}`}>{duration === 0 ? '' : formatDuration(duration)}</p>
                <div className={`calls__duration ${recordId && 'show'} ${activeRecordsId.includes(recordId) && 'active'}`}>
                    <AudioPlayer recordId={recordId} partnershipId={partnershipId} setActiveRecordsId={setActiveRecordsId} />
                </div>
            </td>
        </tr>
    )
}

export default CallsItem