
import { EVENT_CONFIG } from "./config.js";

/***********************
 * CONFIG INJECTED CONTENT 
 ***********************/
// HERO SECTION 
document.querySelector(".hero-image").src=EVENT_CONFIG.hero.image;
document.querySelector(".hero-image").alt=EVENT_CONFIG.hero.alt;
document.querySelector(".hero-title").textContent=EVENT_CONFIG.siteTitle; 
document.querySelector(".hero-subtitle").textContent=EVENT_CONFIG.siteSubtitle;
document.querySelector(".hero-cta").textContent=EVENT_CONFIG.hero.cta;

// NAVBAR CONFIG 
const navUl = document.querySelector(".nav-links");
navUl.innerHTML = EVENT_CONFIG.navbar.items
  .map(item => `<li><a href="${item.target}">${item.label}</a></li>`)
  .join("");

// Theme button text
document.getElementById("theme-button").textContent =
  EVENT_CONFIG.navbar.themeToggleText;

// RSVP INTRO TEXT
const rsvpInfo = document.querySelector(".rsvp-info"); 
rsvpInfo.innerHTML = `
  <p>${EVENT_CONFIG.rsvpIntro}<br><br>
  <u>${EVENT_CONFIG.rsvpDeadline}</u><p>
  `;

// THEME OVERRIDES
document.documentElement.style.setProperty("--accent", EVENT_CONFIG.theme.accent);
document.documentElement.style.setProperty("--accent-secondary", EVENT_CONFIG.theme.accentSecondary);
document.documentElement.style.setProperty("--accent-soft", EVENT_CONFIG.theme.accentSoft);

// MODAL TEXT 
window.MODAL_INTRO = EVENT_CONFIG.modalMessageIntro;
window.MODAL_OUTRO = EVENT_CONFIG.modalMessageOutro;

// MODAL IMAGE CONFIG 
const modalImg = document.querySelector(".modal-image");; 
modalImg.src = EVENT_CONFIG.modal.image.src;
modalImg.alt = EVENT_CONFIG.modal.image.alt;
modalImg.style.width = EVENT_CONFIG.modal.image.width + "px";


// WHEN DOM IS LOADED 
document.addEventListener("DOMContentLoaded", () =>{

  // WELCOME SECTION
  document.querySelector(".welcome-title").textContent =
    EVENT_CONFIG.welcome.title;
  // paragraphs
  const paragraphsContainer = document.querySelector(".welcome-paragraphs");
  paragraphsContainer.innerHTML = EVENT_CONFIG.welcome.paragraphs
    .map(p => `<p>${p}</p>`)
    .join("");
  // Padrinos title
  document.querySelector(".padrinos-title").textContent =
    EVENT_CONFIG.welcome.padrinosTitle;
  // Padrinos list
  const padrinosList = document.querySelector(".padrinos-list");
  padrinosList.innerHTML = EVENT_CONFIG.welcome.padrinosList
    .map(item => `<li><b>${item.name} -</b> <i>${item.role}</i></li>`)
    .join("");

  // SCHEDULE
  const scheduleContainer = document.querySelector(".schedule-cards");
  scheduleContainer.innerHTML = "";
  EVENT_CONFIG.schedule.forEach(item => {
    scheduleContainer.innerHTML += `
      <div class="schedule-card">
        <img src="${item.image}" alt="${item.title}">
        <div class="card-content">
          <h3>${item.title}</h3>
          <p>${item.text}</p>
        </div>
      </div>
    `;
  });

  // LINKS
  document.querySelector(".links-title").textContent = EVENT_CONFIG.linksSection.title;
  
  const linksGrid = document.querySelector(".links-grid");
  linksGrid.innerHTML = "";

  EVENT_CONFIG.linksSection.items.forEach(item => {
    if (item.type === "video") {
      linksGrid.innerHTML += `
        <a class="link-card card">
          <h4>${item.title}</h4>
          <div class="video-container">
            <iframe src="${item.link}" frameborder="0" allowfullscreen></iframe>
          </div>
        </a>
      `;
    } else {
      linksGrid.innerHTML += `
        <a class="link-card card" href="${item.link}" target="_blank">
          <h4>${item.title}</h4>
          <p>${item.text}</p>
        </a>
      `;
    }
});
});

// THEME TOGGLE 
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-mode");
  document.body.classList.toggle("dark-mode");
});
// hero section rsvp button -> scrolls to the rsvp section 
document.getElementById("rsvp-btn").addEventListener("click", () => { 
  document.querySelector(".rsvp-section").scrollIntoView({behavior:"smooth"});
});

// RSVP FUNCTIONALITY
const form = document.getElementById("rsvp-form");
const rsvpList = document.querySelector(".rsvp-attending.card"); //class
const countElement = document.getElementById("rsvp-count");
const modal = document.getElementById("modal-overlay");
const modalContent = document.querySelector(".modal-content"); // class
const modalImage = document.querySelector(".modal-image");
const modalMessage = document.querySelector(".modal-message");
const modalClose = document.getElementById("close-modal");
let rotateFactor = 0; 
let count= 0; 

// MODAL 
function animateImage() {
  if (!modalImage) return; 
  rotateFactor = rotateFactor === 0 ? -10 : 0; 
  modalImage.style.transform = `rotate(${rotateFactor}deg)`; 
}
function toggleModal(name) { 
  if (!modal || !modalContent) return; 
  // show overlay 
  modal.style.display="flex"; 
  // update message 
  modalMessage.textContent = 
    `Thanks for RSVPing, ${name}!
    We are looking forward to seeing you!`;
  const intervalId = setInterval(animateImage, 500); 
  setTimeout(() => { 
      modal.style.display = "none"; 
      clearInterval(intervalId); 
  }, 3000); 
}
// Manual close button
modalClose?.addEventListener("click", () => {
  modal.style.display = "none";
});

// RENDER RSVP LIST 
function renderRsvps(rsvps){ 
  if (!rsvpList) return; 
  rsvpList.innerHTML = ""; 
  rsvps.forEach((entry) => { 
      const p = document.createElement("p"); 
      p.textContent = `🎟️ ${entry.name} (${entry.guests} guest${entry.guests > 1 ? "s" : ""})`; 
      rsvpList.appendChild(p);
  });
  count = rsvps.length; 
  countElement.textContent = `⭐ ${count} people have RSVP'd to this event!`;
}

// LOAD RSVPS FROM BACKEND 
async function loadRsvps() { 
  try { 
      const res = await fetch("/api/rsvps");
      if (!res.ok) throw new Error("failed to fetch RSVPs"); 
      
      const data = await res.json(); 
      renderRsvps(data); 
  } catch (err) { 
      console.error("Error loading RSVPs:", err);
  }
}
// HANDLE FORM SUBMIT 
form?.addEventListener("submit", async (e) => {
  console.log("FORM FOUND?", form);
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const guests = parseInt(document.getElementById("guests").value);
  const message = document.getElementById("message").value.trim();

  if (!name) {
    alert("Please enter your name");
    return;
  }
  try {
    const res = await fetch("/api/rsvps", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, guests, message }),
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      alert("Error submitting RSVP: " + (data.error || "Unknown error"));
      return;
    }
      toggleModal(name);
      form.reset();
      loadRsvps();
  } 
  catch (err) {
  console.error("RSVP submission failed:", err);
  alert("Server error. Check the console for details.");
  }
});

// INITIAL LOAD 
loadRsvps();