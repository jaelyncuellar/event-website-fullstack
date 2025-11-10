/***********************
 * THEME TOGGLE
 ***********************/
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", () => {
  document.documentElement.classList.toggle("dark-mode");
  document.body.classList.toggle("dark-mode");
});

/***********************
 * RSVP FUNCTIONALITY
 ***********************/
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


// hero section rsvp button -> scrolls to the rsvp section 
document.getElementById("rsvp-btn").addEventListener("click", () => { 
  document.querySelector(".rsvp-section").scrollIntoView({behavior:"smooth"});
});

/***********************
 * animation - modal image 
 ***********************/
function animateImage() {
  if (!modalImage) return; 
  rotateFactor = rotateFactor === 0 ? -10 : 0; 
  modalImage.style.transform = `rotate(${rotateFactor}deg)`; 
}
/***********************
 * show modal 
 ***********************/
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

/***********************
 * render RSVP list  
 ***********************/
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

/***********************
 * load RSVPs from backend 
 ***********************/
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
/***********************
 * handle form submit 
 ***********************/
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

/***********************
 * inital load  
 ***********************/
loadRsvps();