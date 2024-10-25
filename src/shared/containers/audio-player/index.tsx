import React, { useState, useRef, useEffect } from 'react';
import IconPlay from '../../../assets/icon-play.svg?react';
import IconPause from '../../../assets/icon-pause.svg?react';
import IconDownload from '../../../assets/icon-download.svg?react';
import IconClose from '../../../assets/icon-close.svg?react';
import './index.css';
import { apiService } from '../../../api/index';
import { formatTime } from '../../utils/commonUtils';

interface IAudioPlayer {
    recordId: string,
    partnershipId: string,
    setActiveRecordsId: React.Dispatch<React.SetStateAction<string[]>>
}

const AudioPlayer = ({ recordId, partnershipId, setActiveRecordsId }: IAudioPlayer) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [remainingTime, setRemainingTime] = useState('0:00');
    const [audioSrc, setAudioSrc] = useState('');
    const [loading, setLoading] = useState(false);
    const [hoverTime, setHoverTime] = useState('');
    const [hoverPosition, setHoverPosition] = useState({ left: 0, top: 0 });
    const audioRef = useRef<HTMLAudioElement>(null);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = audioSrc;
            if (isPlaying) {
                audioRef.current.play();
            }
        }
    }, [audioSrc, isPlaying]);

    const togglePlay = async () => {
        if (!audioSrc) {
            await fetchAudioRecord();
        }

        if (isPlaying) {
            audioRef.current?.pause();
        } else {
            audioRef.current?.play();
            setActiveRecordsId(prevRecords => [...prevRecords, recordId]);
        }
        setIsPlaying(!isPlaying);
    };


    const handleTimeUpdate = () => {
        const current = audioRef.current?.currentTime || 0;
        const duration = audioRef.current?.duration || 0;
        const remaining = duration - current;
        setRemainingTime(formatTime(remaining));

        if (duration) {
            setProgress((current / duration) * 100);
        }
    };

    const handleProgressClick = (event: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const clickPosition = event.clientX - rect.left;
        const clickPercentage = clickPosition / rect.width;
        const newTime = (audioRef.current?.duration || 0) * clickPercentage;

        if (audioRef.current) {
            audioRef.current.currentTime = newTime;
        }
    };

    const handleProgressMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        const progressBar = event.currentTarget;
        const rect = progressBar.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mousePercentage = mouseX / rect.width;
        const newTime = (audioRef.current?.duration || 0) * mousePercentage;

        setHoverPosition({ left: mouseX, top: -18 });
        setHoverTime(formatTime(newTime));
    };

    const handleMouseLeave = () => {
        setHoverTime('');
    };

    const fetchAudioRecord = async () => {
        try {
            setLoading(true);
            const recordData = await apiService.getCallRecord(recordId, partnershipId);
            setAudioSrc(URL.createObjectURL(recordData));
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const closePlayer = () => {
        togglePlay();
        setActiveRecordsId(prevRecords => prevRecords.filter((record) => record !== recordId));
    };

    return (
        <div className='audio-player'>
            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
            ></audio>

            <div className='audio-player__duration'>{remainingTime}</div>
            <button className='audio-player__play-pause' onClick={togglePlay} disabled={loading}>
                {isPlaying ? (
                    <IconPause onClick={() => setActiveRecordsId(prevRecords => prevRecords.filter((record) => record !== recordId))} />
                ) : (
                    <IconPlay onClick={() => setActiveRecordsId(prevRecords => [...prevRecords, recordId])} />
                )}
            </button>

            <div 
                className='audio-player__progress-container' 
                onClick={handleProgressClick} 
                onMouseMove={handleProgressMouseMove} 
                onMouseLeave={handleMouseLeave}
            >
                <div className='progress' style={{ width: `${progress}%` }}></div>
                {hoverTime && (
                    <div 
                        className='hover-time' 
                        style={{ left: hoverPosition.left, top: hoverPosition.top }}
                    >
                        {hoverTime}
                    </div>
                )}
            </div>

            {audioSrc && <a href={audioSrc} download='record.mp3'><IconDownload className='audio-player__button-download' /></a>}
            <IconClose className='audio-player__button-close' onClick={() => closePlayer()} />
        </div>
    );
};

export default AudioPlayer;
