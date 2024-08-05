import dayjs from "dayjs";

export default function calculateMinutesToTargetDate (targetDate)  {
    const now = dayjs();
    const target = dayjs(targetDate);
    const differenceInMinutes = target.diff(now, 'minute');
    return differenceInMinutes;
};