const goal = 55000;

let raised = parseInt(document.getElementById("raisedAmount").innerText);

const raisedEl = document.getElementById("raisedAmount");
const donateBtn = document.getElementById("donateBtn");
const customInput = document.getElementById("customAmount");
const presetButtons = document.querySelectorAll(".amounts button");

const circle = document.querySelector(".circle-fill");
const percentText = document.getElementById("circlePercent");

let selectedAmount = 0;

const radius = 40;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = circumference;
circle.style.strokeDashoffset = circumference;


presetButtons.forEach(button => {
  button.addEventListener("click", () => {
    selectedAmount = Number(button.dataset.amount);


    customInput.value = selectedAmount;


    presetButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");
  });
});



function updateUI() {
  const percent = Math.min((raised / goal) * 100, 100);

  raisedEl.innerText = raised.toLocaleString();

  const offset = circumference - (percent / 100) * circumference;
  circle.style.strokeDashoffset = offset;

  percentText.innerText = Math.round(percent) + "%";
}


donateBtn.addEventListener("click", () => {
  let amount = 0;

  if (customInput.value.trim() !== "") {
    amount = Number(customInput.value);
  } else {
    amount = selectedAmount;
  }

  if (!amount || amount <= 0) {
    alert("Select or enter a donation amount");
    return;
  }

  raised += amount;
  if (raised > goal) raised = goal;

  selectedAmount = 0;
  customInput.value = "";
  presetButtons.forEach(btn => btn.classList.remove("active"));

  updateUI();
});


updateUI();



const overlay = document.getElementById("donationOverlay");


const donateOpenButtons = document.querySelectorAll(".btn button, .btn i");


donateOpenButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    overlay.classList.add("active");
  });
});


const closeBtn = document.querySelector(".close-overlay");
if (closeBtn) {
  closeBtn.addEventListener("click", () => {
    overlay.classList.remove("active");
  });
}


overlay.addEventListener("click", (e) => {
  if (e.target === overlay) {
    overlay.classList.remove("active");
  }
});
