const range = document.querySelector(".styled-slider");
const bubble = document.querySelector("#thumb-value");

const statColleagues = document.querySelector("#stat-colleagues");
const statDays = document.querySelector("#stat-days");
const statCosts = document.querySelector("#stat-cost");

// logarithmic increase
function initLogValue() {
  const startingPosition = range.value;
  const minp = range.min ? range.min : 0; // input min attribute Value => steps
  const maxp = range.max ? range.max : 100; // input max attribute Value => steps
  const minv = Math.log(10); // min Value - minEmployees
  const maxv = Math.log(100000); // max Value - maxEmployees
  const scale = (maxv - minv) / (maxp - minp);
  const value = Math.exp(minv + scale * (startingPosition - minp));
  const rounded = Math.floor(value);
  return rounded;
}

// set bubble position based on slide thumb position to be aligned with thumb and display employees number
function setBubble(range, bubble, value) {
  const val = range.value;
  const minp = range.min ? range.min : 0;
  const maxp = range.max ? range.max : 100;
  const newVal = Number(((val - minp) * 100) / (maxp - minp));
  // rendeer employees number in thumb bubble
  bubble.innerHTML = value;
  // Set bubble position - Sorta magic numbers based on size of the native UI thumb
  bubble.style.left = `calc(${newVal}% + (${36 - newVal * 0.7}px))`;
}

function updateStats() {
  const empNo = initLogValue();
  const nwc = numberWithCommas(empNo);
  const colleagues = Math.round(empNo * 0.1667);
  const days = Math.ceil(colleagues * 21.2);
  const cost = Math.round(empNo * 1300);

  statColleagues.innerHTML = numberWithCommas(colleagues);
  statDays.innerHTML = numberWithCommas(days);
  statCosts.innerHTML = numberWithCommas(`€ ${cost}`);

  setBubble(range, bubble, nwc);
}

range.addEventListener("input", () => {
  updateStats();
});

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

updateStats();

// ------ Progress fill -------------------------------

for (let e of document.querySelectorAll(
  'input[type="range"].slider-progress'
)) {
  e.style.setProperty("--value", e.value);
  e.style.setProperty("--min", e.min == "" ? "0" : e.min);
  e.style.setProperty("--max", e.max == "" ? "100" : e.max);
  e.addEventListener("input", () => e.style.setProperty("--value", e.value));
}
