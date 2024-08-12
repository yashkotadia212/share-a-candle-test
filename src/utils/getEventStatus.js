import dayjs from 'dayjs';

export default function getEventStatus(startIn, endsIn) {
  const now = dayjs();
  
  const startTime = now.add(startIn.days, 'day')
                       .add(startIn.hours, 'hour')
                       .add(startIn.minutes, 'minute');
  
  const endTime = now.add(endsIn.days, 'day')
                     .add(endsIn.hours, 'hour')
                     .add(endsIn.minutes, 'minute');

  if (now.isBefore(startTime)) {
    return 'Upcoming';
  } else if (now.isAfter(endTime)) {
    return 'Ended';
  } else {
    return 'Ongoing';
  }
}

