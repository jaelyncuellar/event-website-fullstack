# Event Website Template 
A fully customizable event website template built with HTML, CSS, JavaScript, Node.js, Express, and SQLite. This project allows you to create event websites for any occasion (birthday, wedding, graduation, baby shower, etc.) with zero modifications to the HTML - everything is driven through a single configuration file.

This README includes:
- A walkthrough of the generic blank template (no event configured)
- A walkthrough of how to apply the configuration for a real event (Quinceañera example)
- Full setup instructions for both frontend and backend
- Deployment notes

## 0. Template States: Before & After Configuration 
This project can run in two states: 
### A. BEFORE adding config.js (blank template) 
- The website loads with empty titles, empty text, and no cards.
- The structure is visible, but no event content appears.
- Useful for users who want to design from scratch.

<div>
    <a href="https://www.loom.com/share/2cf8e440aca7429aa7c37e09bd16f130">
    </a>
    <a href="https://www.loom.com/share/2cf8e440aca7429aa7c37e09bd16f130">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/2cf8e440aca7429aa7c37e09bd16f130-e38a3822464257ff-full-play.gif#t=0.1">
    </a>
</div>


### B. AFTER adding your custom `config.js` (configured event website) 
- All hero text, images, links, schedule items, hosts, and colors automatically populate.
- No changes to HTML are required.
- Example provided in this README shows how the template outputs a Quinceañera event site.

<div>
    <a href="https://www.loom.com/share/86e691ace003452584894c1adbcb828e">
    </a>
    <a href="https://www.loom.com/share/86e691ace003452584894c1adbcb828e">
      <img style="max-width:300px;" src="https://cdn.loom.com/sessions/thumbnails/86e691ace003452584894c1adbcb828e-2d95298acd0e8f5f-full-play.gif#t=0.1">
    </a>
</div>

## 1. Tech Stack

#### Frontend
- **Languages:** HTML5, CSS3, JavaScript
- **Styling & UI:** Responsive design, light/dark mode, animations, grid & flexbox, reusable components 
- **Architecture:** Dynamic rendering via `config.js`, DOM manipulation, smooth scrolling, modals 

#### Backend
- **Server:** Node.js, Express.js
- **Database:** SQLite (swapable to MySQL/Postgres)
- **API:** RESTful, JSON-based, with error handling & validation 

#### Tools & Workflow: 
NPM, Git, local development server. 

## 2. Features 
### Frontend Features
- Dynamic hero banner (image, title, subtitle, button text)
- Welcome section with configurable paragraphs
- Hosts section
- Event schedule cards
- Learn More / Links section (video + article support)
- Smooth modal confirmation on RSVP
- Light/Dark mode toggle
- Responsive design
- Fully themeable with CSS variables

### Backend Features
- Node.js + Express server
- SQLite database for storing RSVPs
- API routes:
  - GET /api/rsvps — return all RSVPs
  - POST /api/rsvps — submit a new RSVP
- Automatic database file creation (data.db) on startup - RSVPs are saved to `data.db`

### Fully Generic Configuration System 
All event-specific content is stored in:
`public/config.js`
Users can customize:
- Event name
- Hero image + text
- Theme colors
- Welcome section text
- Hosts list
- Schedule cards
- Learn More links
- Modal messages

---
## 3. Getting Started 
Clone the project 
`git clone <your-repo-link>`
`cd <project-folder>`

Install dependencies
`npm install`

Start the backend server 
`node backend/index.js`

Open the website 
visit
`http://localhost:3000`

## 4. Project Structure 
```
root/
│
├── backend/
│ └── index.js # Express server + SQLite logic
│
├── public/
│ ├── index.html # Main HTML (generic/empty shell)
│ ├── style.css # Styling (light + dark mode)
│ ├── script.js # Frontend logic + config injection
│ ├── config.js # All customizable text + images
│ └── img/ # Images folder
│
└── data.db # SQLite database (auto-created)
```

## 5. How the Generic Template Works 
The project is built to run in "template mode" until you fill the config. 

### index.html contains empty placeholders only 
all sections include empty containers: 
- `.welcome-title`
- `.schedule-cards`
- `.links-grid`

etc.

### script.js populates everything dynamically 
the script loads: 
`import {EVENT_CONFIG} from "./config.js"; `
and fills all HTML nodes based on config 
### config.js controls ALL content 
users only edit this. 

example (blank): 
```
export const EVENT_CONFIG = {
  hero: {
    image: "",
    alt: "",
    title: "",
    subtitle: "",
    ctaText: ""
  },
  welcome: {
    title: "",
    paragraphs: [],
    padrinosTitle: "",
    padrinosList: []
  },
  schedule: [],
    linksSection: {
    title: "",
    items: []
  },
  modal: {
    image: { src: "", alt: "", width: 150 }
  },
};
```

## 6. Walkthrough: Using the Blank Template 
### Starting from scratch. 
1. Open `public/config.js`
clear all values so they resember the blank template above
2. Add your own content gradually
### for example:
- add a title:
```
hero: {
  title: "My Event",
  subtitle: "A Night to Remember",
  ctaText: "RSVP"
}
```
- add schedule:
```
schedule: [
{ image: "./img/dinner.png", title: "Dinner", text: "Enjoy a great meal." }
]
```
the template updates itself automatically

## 7. Walkthrough: How this Template Generated a Quinceañera Website 
Now the Quince version is created simply by filling config.js 
### example hero: 
```
hero: {
  image: "https://example/quince-hero.png",
  alt: "Quince Hero",
  title: "Aaliyah's Quinceañera",
  subtitle: "Princess to Queen",
  ctaText: "RSVP!"
}
```
### example welcome: 
```
welcome: {
  title: "Welcome",
  paragraphs: [
  "You're invited to celebrate...",
  "A royal transformation...",
  "Join us as we honor..."
  ],
  padrinosTitle: "Aaliyah's Padrinos y Madrinos",
  padrinosList: [
  { name: "Jeremy Zecker", role: "Venue" },
  { name: "Martha Canvas", role: "Food" }
  ]
}
```
### example links section: 
```
linksSection: {
  title: "Learn More",
  items: [
  { type: "video", title: "What is a Quinceañera?", link: "https://..." },
  { type: "article", title: "Dress Code", text: "What to wear?", link: "https://..." }
  ]
}
```

## 8. Backend: How to Connect Your Database 
### Default: SQLite (already integrated) 
Nothing required. The file data.db is created automatically. SQLite database is located at data.db. You can open and browse data using DB Browser for SQLite. 

### Clearing the database 
delete the file: 
` rm data.db ` 
restart the server 

### Switching to MySQL or PostgreSQL 
Users may replace the SQLite connection in backend/index.js with their own database driver.
Examples for MySQL/Postgres are included in the Deployment section.

## 9. API Routes 

### GET /api/rsvps
Returns JSON array of all RSVP entries. 
### POST /api/rsvps 
Body: 
```
{
  "name": "Melissa",
  "guests": 2,
  "message": "Can't wait!"
}
```

returns:
```
{
  "success": true,
  "entry": { ... }
}
```

## 10. Deployment Notes 
### Deploy Backend on Render/Railway 
- Upload repository.
- Set start command:
` node backend/index.js `
- Ensure public/static files are exposed.
### Deploy Frontend to Netlify/Vercel 
If using frontend-only mode, API must point to a remote backend.

## 11. Credits 
Template made for generic event creation. 
Fully customization through config.js. 
Created by Jaelyn Cuellar. 

## 12. License 
This project is licensed under the MIT License. See the [LICENSE](https://github.com/jaelyncuellar/event-website-fullstack/blob/main/LICENSE%20) file for details.
