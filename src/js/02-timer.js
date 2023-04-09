import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

const input = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
let date;
let timerId;

const options = {
  locale: 'default',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates < Date.now()) {
      Notiflix.Report.warning(
        'Alert',
        'Please choose a date in the future',
        'Ok'
      );
    } else {
      startBtn.disabled = false;
      input.disabled = true;
      date = selectedDates;
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  if (ms <= 0) {
    input.disabled = false;
    clearInterval(timerId);
    return { day: '00', hour: '00', minute: '00', second: '00' };
  }

  const day = Math.floor(ms / (1000 * 60 * 60 * 24));
  const hour = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const minute = Math.floor((ms / (1000 * 60)) % 60);
  const second = Math.floor((ms / 1000) % 60);

  const days = document.querySelector('[data-days]');
  const hours = document.querySelector('[data-hours]');
  const minutes = document.querySelector('[data-minutes]');
  const seconds = document.querySelector('[data-seconds]');
  days.textContent = `${addLeadingZero(day)}`;
  hours.textContent = `${addLeadingZero(hour)}`;
  minutes.textContent = `${addLeadingZero(minute)}`;
  seconds.textContent = `${addLeadingZero(second)}`;

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  return { day, hour, minute, second };
}

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    convertMs(date - Date.now());
  }, 1000);
});
