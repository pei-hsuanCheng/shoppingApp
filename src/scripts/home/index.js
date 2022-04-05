import 'css/home/index.css';
import '../_common';

function checkNumber(num) {
  let newNum = num;
  let newStrNum = num;
  if (num < 10) newStrNum = '0' + num;
  if (num < 0) {
    newNum = 59;
    newStrNum = newNum;
  }

  return { newNum, newStrNum };
}

$(document).ready(()=> {
  let countdownS = 59;
  let countdownM = 59;
  const counterItems = $('.jCountdown').children();
  setInterval(() => {
    let newCountS = countdownS - 1;
    if (newCountS < 0) $(counterItems).eq(1).text(countdownM - 1);
    const { newNum, newStrNum } = checkNumber(newCountS);
    countdownS = newNum;
    $(counterItems).eq(2).text(newStrNum);
  }, 1000);
});
