# Quince RSVP Fullstack
A full-stack Quinceañera event site with a beautiful frontend and a connected RSVP system powered by Express.js and SQLite.

---

## Features
- **Elegant Event Frontend** — Responsive HTML/CSS/JS layout for your event details  
- **RSVP System** — Guests can easily submit their responses  
- **Database-Connected Backend** — Express + SQLite integration to store RSVPs  
- **Confirmation Animation** — Smooth modal popup when guests RSVP successfully  
- **Persistent Data** — RSVPs saved to a local database file (`data.db`)  

---

## Tech Stack

**Frontend:**
- HTML, CSS, JavaScript  
- Animations and custom modal UI  

**Backend:**
- Node.js + Express  
- SQLite (via `sqlite3` and `sqlite` packages)
- CORS + static file serving  

---

## ⚙️ Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/quince-rsvp-fullstack.git
cd quince-rsvp-fullstack
```
### 2. Install dependencies
``` bash
npm install
```
### 3. Run the backend server
``` bash
node backend/index.js
```
### 4. Open the event page
visit:
``` bash
http://localhost:3000
```
You’ll see the Quinceañera event page and the RSVP form working together.

--- 

## Database info 
- SQLite database is located at data.db
RSVPs are stored in the rsvps table:
id	name	guests	message	timestamp
You can open and browse data using DB Browser for SQLite.

--- 

## Project Structure 
quince-rsvp-fullstack/
├── backend/
│   ├── index.js          # Express + SQLite backend
│   └── data.db           # Local database file
├── public/
│   ├── index.html        # Frontend event page
│   ├── style.css         # Frontend styling
│   └── script.js         # Frontend logic (RSVP + animations)
├── package.json
└── README.md

--- 

## Notes: 
- RSVP data persists between sessions.
- Make sure you run the backend from the project root so it connects to the correct data.db.
- If you want to reset the database, just delete the data.db file (a new one will be created automatically).

--- 

## Credits: 
Built by Jaelyn Cuellar as a personal Quinceañera web app project.
Frontend and backend integrated for a seamless guest experience.
