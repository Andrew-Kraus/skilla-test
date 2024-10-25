export const checkCallType = (value: number, status: string) => {
    if (value === 1 && status === 'Дозвонился') return 'incoming';
    if (value === 0 && status === 'Дозвонился') return 'outgoing';
    if (value === 1 && status === 'Не дозвонился') return 'missed';
    if (value === 0 && status === 'Не дозвонился') return 'no-answer';
}

export const randomGrade = () => {
    const grades = {
        bad: 'Плохо',
        fine: 'Хорошо',
        great: 'Отлично'
    } as const;
    const gradeKeys = Object.keys(grades) as Array<keyof typeof grades>;;
    const randomKey = gradeKeys[Math.floor(Math.random() * gradeKeys.length)];
    return { className: randomKey, text: grades[randomKey] };
}

export const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

    return `${minutes}:${formattedSeconds}`;
}

export const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
};
