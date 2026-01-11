const campaigns = [
  {
    id: 1,
    org: "We Care",
    days: 7,
    verified: true,
    category: "Environment",
    title: "GreenFund: Sustain Earth Now",
    raised: 40548,
    goal: 55000,
    desc: "Join us in planting 10,000 trees across degraded lands. Your donation helps combat climate change and empowers local farmers.",
    img: "https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=2000&auto=format&fit=crop",
  },
  {
    id: 2,
    org: "Unicef",
    days: 19,
    verified: true,
    category: "Health",
    title: "SeniorHealth: Support Campaign",
    raised: 14240,
    goal: 50000,
    desc: "Providing essential medicines and care for abandoned elderly in rural India. Give them the dignity they deserve.",
    img: "./images/img1.jpg",
  },
  {
    id: 3,
    org: "Unity Foundation",
    days: 23,
    verified: false,
    category: "Health",
    title: "DisasterCare: Urgent Support",
    raised: 21100,
    goal: 80000,
    desc: "Urgent flood relief for displaced families in Assam. Funds will provide food packets, clean water, and temporary shelter.",
    img: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
  },
  {
    id: 4,
    org: "Paw Rescuers",
    days: 12,
    verified: true,
    category: "Animal",
    title: "Shelter for Abandoned Pups",
    raised: 8500,
    goal: 25000,
    desc: "Building a winter shelter for 50+ rescued street puppies. Help us keep them warm and fed this season.",
    img: "./images/img2.jpg",
  },
  {
    id: 5,
    org: "EduForAll",
    days: 30,
    verified: true,
    category: "Education",
    title: "Books for Rural Schools",
    raised: 35000,
    goal: 60000,
    desc: "Setting up libraries in 5 village schools. Your contribution buys storybooks and textbooks for underprivileged children.",
    img: "./images/img4.jpg",
  },
  {
    id: 6,
    org: "Artisans Guild",
    days: 5,
    verified: false,
    category: "Art",
    title: "Reviving Ancient Pottery",
    raised: 12000,
    goal: 40000,
    desc: "Supporting traditional potters with modern tools and clay. Help preserve this ancient art form for future generations.",
    img: "./images/img3.jpg",
  },
];

const formatMoney = (num) => "₹" + num.toLocaleString("en-IN");

const grid = document.getElementById("campaignGrid");
const searchInput = document.getElementById("searchInput");
const catBtns = document.querySelectorAll(".cat-btn");

function render(data) {
  grid.innerHTML = "";

  if (data.length === 0) {
    grid.innerHTML =
      '<p style="grid-column:1/-1; text-align:center; color:#666;">No campaigns found.</p>';
    return;
  }

  data.forEach((c) => {
    const pct = Math.min((c.raised / c.goal) * 100, 100);
    grid.innerHTML += `
                <div class="campaign-card" onclick="openModal(${c.id})">
                    <div class="card-image-wrapper">
                        <img src="${c.img}" class="card-img-main">
                        <div class="category-badge">${c.category}</div>
                    </div>
                    
                    <div class="card-content">
                        <div class="org-info">
                            ${c.org} ${
      c.verified ? '<i class="fa-solid fa-circle-check verified-icon"></i>' : ""
    }
                        </div>
                        <h3 class="card-headline">${c.title}</h3>
                        <div class="prog-container">
                            <div class="prog-fill" style="width: ${pct}%"></div>
                        </div>
                        <div class="card-footer-row">
                            <div>
                                <div class="raised-amount">${formatMoney(
                                  c.raised
                                )}</div>
                                <div class="raised-label">raised</div>
                            </div>
                            <button class="btn-card-donate">Donate</button>
                        </div>
                    </div>
                </div>`;
  });
}

const modal = document.getElementById("detailModal");
let currentId = null;

function openModal(id) {
  currentId = id;
  const c = campaigns.find((x) => x.id === id);

  document.getElementById("m-title").innerText = c.title;
  document.getElementById("m-img").src = c.img;
  document.getElementById("m-desc").innerText = c.desc;

  updateModalStats(c);

  modal.classList.add("active");
  document.body.style.overflow = "hidden";
}

function updateModalStats(c) {
  document.getElementById("m-raised").innerText = formatMoney(c.raised);
  document.getElementById("m-goal").innerText = formatMoney(c.goal);

  const percent = Math.floor((c.raised / c.goal) * 100);
  const degree = (percent * 360) / 100;

  const circle = document.getElementById("circleProg");
  circle.style.setProperty("--p", degree + "deg");
  circle.setAttribute("data-val", percent + "%");
}

function closeModal() {
  modal.classList.remove("active");
  document.body.style.overflow = "auto";
  document.getElementById("modalAmount").value = "";
}

modal.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

function setAmount(val) {
  document.getElementById("modalAmount").value = val;
}

function processDonation() {
  const val = parseFloat(document.getElementById("modalAmount").value);
  if (!val || val <= 0) {
    alert("Please enter a valid amount");
    return;
  }

  const c = campaigns.find((x) => x.id === currentId);
  c.raised += val;

  render(campaigns);
  updateModalStats(c);

  alert(`Thank you! You donated ${formatMoney(val)} to ${c.title}.`);
  document.getElementById("modalAmount").value = "";
}

function filterCampaigns() {
  const query = searchInput.value.toLowerCase();
  const activeCat = document.querySelector(".cat-btn.active").dataset.cat;

  const filtered = campaigns.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(query) ||
      c.org.toLowerCase().includes(query);
    const matchesCat = activeCat === "All" || c.category === activeCat;
    return matchesSearch && matchesCat;
  });

  render(filtered);
}

searchInput.addEventListener("input", filterCampaigns);
catBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    catBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    filterCampaigns();
  });
});

document.querySelectorAll(".faq-question").forEach((item) => {
  item.addEventListener("click", () => {
    const parent = item.parentElement;
    parent.classList.toggle("active");
  });
});

render(campaigns);
