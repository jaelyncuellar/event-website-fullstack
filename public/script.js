/***********************
 * THEME TOGGLE
 ***********************/
const themeButton = document.getElementById("theme-button");
themeButton.addEventListener("click", () => {
  document.documentElement.classList.toggle("light-mode");
  document.body.classList.toggle("light-mode");
  console.log("Theme toggled");
});

/***********************
 * RSVP FUNCTIONALITY
 ***********************/
const form = document.getElementById("rsvp-form");
const rsvpList = document.querySelector(".rsvp-participants");
const countElement = document.getElementById("rsvp-count");
const modal = document.getElementById("success-modal");
const modalContent = document.getElementById("modal-item");
const modalImage = document.getElementById("modal-image");

let rotateFactor = 0; 
let count= 0; 

/** animate the crown image in the modal  ***/
function animateImage() {
     rotateFactor = rotateFactor === 0 ? -10 : 0; 
     modalImage.style.transform = `rotate(${rotateFactor}deg)`; 
}
/*** show success modal w animation  */
function toggleModal(personName) { 
    modal.style.display="flex"; 
    modalContent.innerText=`Thanks for RSVPing, ${personName}! We're looking forward to seeing you at the event!`; 
    const intervalId = setInterval(animateImage, 500); 
    setTimeout(() => { 
        modal.style.display = "none"; 
        clearInterval(intervalId); 
    }, 3000); 
}
/*** update RSVP list on the page */
function renderRsvps(rsvps){ 
    rsvpList.innerHTML = ""; 
    rsvps.forEach((r) => { 
        const p = document.createElement("p"); 
        p.textContent = `🎟️ ${r.name} (${r.guests} guest${r.guests > 1 ? "s" : ""})`; 
        rsvpList.appendChild(p);
    });
    count = rsvps.length; 
    countElement.textContent = `⭐ ${count} people have RSVP'd to this event!`;
}

/*** load all rsvps from backend */
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
/*** Handle form submission ***/
form.addEventListener("submit", async (e) => {
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

    if (res.ok && data.success) {
      toggleModal(name);
      form.reset();
      loadRsvps();
    } else {
      alert("Error submitting RSVP: " + (data.error || "Unknown error"));
    }
  } catch (err) {
    console.error("RSVP submission failed:", err);
    alert("Server error. Check the console for details.");
  }
});

/*** initial load ***/
loadRsvps();