import './style.css'

const buttons = document.querySelectorAll(".time-btn");
const cards = document.querySelectorAll(".card");

let data = [];

fetch("/src/data.json")
  .then((res) => res.json())
  .then((json) => {
    data = json;
    updateUI("weekly"); // default
  });

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const type = btn.dataset.type;
    updateUI(type);

    buttons.forEach((b) => b.classList.remove("text-white"));
    btn.classList.add("text-white");
  });
});

function updateUI(type) {
  const titles = document.querySelectorAll(".title");
  const currents = document.querySelectorAll(".current");
  const previous = document.querySelectorAll(".previous");

  data.forEach((item, i) => {
    titles[i].textContent = item.title;
    currents[i].textContent = item.timeframes[type].current + "hrs";

    let word = "";
    if (type === "daily") word = "Yesterday";
    if (type === "weekly") word = "Last Week";
    if (type === "monthly") word = "Last Month";

    previous[i].textContent =
      `${word} - ${item.timeframes[type].previous}hrs`;
  });
}
