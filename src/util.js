export const formatDate = (localtime) => {
  const date = new Date(localtime);

  const formattedDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });

  return formattedDate;
};

export const convertTo24Hour = (time12h) => {
  const [time, modifier] = time12h.split(' ');
  let [hours, minutes] = time.split(':');

  if (hours === '12') {
    hours = '00';
  }

  if (modifier === 'PM' && hours !== '12') {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return `${hours.padStart(2, '0')}:${minutes}`;
};
