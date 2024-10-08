import { useState, useMemo } from 'react';
import Button from 'react-bootstrap/Button';

const weekDays = { nl: ['Ma', 'Di', 'Wo', 'Do', 'Vr', 'Za', 'Zo'] };

const MyCalendar = ({ selectedDate, onChange }) => {
  const [showDate, setShowDate] = useState(new Date(selectedDate));

  // first day of the month, CAREFULL: object will change by for loop!
  const firstDayThisMonth = new Date(
    showDate.getFullYear(),
    showDate.getMonth(),
    1,
  );
  // getDay sunday=0 and we monday=0
  const dayOfWeek = (firstDayThisMonth.getDay() + 6) % 7;
  // first day of next month
  const firstDayNextMonth = new Date(
    showDate.value.getFullYear(),
    showDate.getMonth() + 1,
    1,
  );

  // loop whole month and keep in memo to save 1ms per time
  const month = useMemo(() => {
    const m = [];
    for (
      let d = firstDayThisMonth;
      d < firstDayNextMonth;
      d.setDate(d.getDate() + 1)
    ) {
      m.push(new Date(d));
    }
    return m;
  }, [showDate]);

  return (
    <div className='hl-followus'>
      <div className='hl-month d-flex flex-wrap flex-row align-items-baseline justify-content-between px-3 pt-3 bg-primary text-light'>
        {selectedDate.getFullYear()}
      </div>
      <div className='hl-month d-flex flex-wrap flex-row align-items-baseline justify-content-between px-3 pb-3 bg-primary text-white h2'>
        {selectedDate.toLocaleString('nl-nl', {
          weekday: 'short',
          day: 'numeric',
          month: 'long',
        })}
      </div>
      <div className='hl-month d-flex flex-wrap flex-row align-items-baseline justify-content-between px-2 py-2'>
        <Button
          onClick={() =>
            setShowDate(new Date(showDate.setMonth(showDate.getMonth() - 1)))
          }
          className={`hl-day-button rounded-circle p-0 hl-bc1 border-white'}`}
          variant='light'
        >
          <i className='fas fa-chevron-left' />
        </Button>
        <div className='h5'>
          {showDate.toLocaleString('nl-nl', { month: 'long', year: 'numeric' })}
        </div>
        <Button
          onClick={() =>
            setShowDate(new Date(showDate.setMonth(showDate.getMonth() + 1)))
          }
          className='hl-day-button rounded-circle p-0 hl-bc0 border-0'
          variant='light'
        >
          <i className='fas fa-chevron-right' />
        </Button>
      </div>
      <div className='hl-month d-flex flex-wrap flex-row'>
        {weekDays.nl.map(weekDay => (
          <div key={weekDay} className='hl-day  d-flex justify-content-center'>
            <small>{weekDay}</small>
          </div>
        ))}
      </div>
      <div className='hl-month d-flex flex-wrap flex-row  '>
        <div style={{ width: `${dayOfWeek * 14.28}%` }} />
        {month.map(day => {
          const highlightSelectedDate =
            selectedDate &&
            selectedDate.getDate() === day.getDate() &&
            selectedDate.getMonth() === day.getMonth() &&
            selectedDate.getYear() === day.getYear();
          return (
            <div key={day} className='hl-day d-flex justify-content-center'>
              <Button
                onClick={() => onChange(day)}
                className={`hl-day-button rounded-circle p-0 ${
                  !highlightSelectedDate && 'hl-bc0 border-0'
                }`}
                variant={highlightSelectedDate ? 'primary' : 'light'}
              >
                {day.getDate()}
              </Button>
            </div>
          );
        })}
      </div>
      <style jsx>
        {`
          .hl-month {
            width: 350px;
          }
          .hl-day {
            flex: 0 0 14.28%;
          }
          .hl-followus :global(.hl-day-button) {
            width: 36px;
            height: 36px;
          }
        `}
      </style>
    </div>
  );
};

export default MyCalendar;
