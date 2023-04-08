// Описаний в документації
import flatpickr from 'flatpickr';
// Додатковий імпорт стилів
import 'flatpickr/dist/themes/dark.css';
import Notiflix from 'notiflix';

// const input = document.getElementById('datetime-picker');

const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;
let date;

const options = {
  locale: 'default',
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Report.warning(
        'Alert',
        'Please choose a date in the future',
        'Ok'
      );
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      date = selectedDates[0];
    }
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  const dataDays = document.querySelector('[data-days]');
  const dataHours = document.querySelector('[data-hours]');
  const dataMinutes = document.querySelector('[data-minutes]');
  const dataSeconds = document.querySelector('[data-seconds]');
  dataDays.textContent = `${addLeadingZero(days)}`;
  dataHours.textContent = `${addLeadingZero(hours)}`;
  dataMinutes.textContent = `${addLeadingZero(minutes)}`;
  dataSeconds.textContent = `${addLeadingZero(seconds)}`;

  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', () => {
  setInterval(() => {
    convertMs(date - Date.now());
  }, 1000);
});
