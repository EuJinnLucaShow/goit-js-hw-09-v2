function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

// document.querySelector('[data-start]').addEventListener('click', () => {
//   timerId = setInterval(() => {
//     document.querySelector('body').style.backgroundColor = getRandomHexColor();
//   }, 1000);
// });

// document.querySelector('[data-stop]').addEventListener('click', () => {
//   clearInterval(timerId);
// });

const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
stopBtn.disabled = true;
let timerId;

startBtn.addEventListener('click', () => {
  timerId = setInterval(() => {
    document.querySelector('body').style.backgroundColor = getRandomHexColor();
  }, 1000);

  startBtn.disabled = true; // Додаємо атрибут "disabled" до кнопки "Start"
  stopBtn.disabled = false;
});

stopBtn.addEventListener('click', () => {
  clearInterval(timerId);
  startBtn.disabled = false; // Забираємо атрибут "disabled" з кнопки "Start"
  stopBtn.disabled = true;
});
