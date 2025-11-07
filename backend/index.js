import express from "express"; // handles HTTPs reqs routing, and middleware management  
import sqlite3 from "sqlite3"; // relational based management system, self contained files 
import { open } from "sqlite"; 
import cors from "cors";
// lets use __dirname inside ES modules 
import path from "path"; 
import { fileURLToPath } from "url"; 

// creates an equiv to __dirname like in CommonJS 
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const app = express();
app.use(cors()); // enables CORS for all origins (not rec for production)
app.use(express.json()); // JSON in POST reqs

// serve all static front end files 
app.use(express.static(path.join(__dirname, "../public")));

// init db 
let db; 
(async () => {
    db = await open({
        filename: "../data.db", // file auto created
        driver: sqlite3.Database
    }); 
    // create rsvps table if not exist 
    await db.exec(`
        CREATE TABLE IF NOT EXISTS rsvps (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        name TEXT NOT NULL, 
        guests INTEGER DEFAULT 1, 
        message TEXT, 
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
    console.log("Database ready"); 
})();  

// create API routes , get all RSVPs 
app.get("/api/rsvps", async(req, res) => {
    try { 
        const rsvps = await db.all("SELECT * FROM rsvps ORDER BY timestamp DESC"); 
        res.json(rsvps); 
    } catch (err) { 
        console.error(err); 
        res.status(500).json({error: "Database error"});
    }
});

// add new rsvp 
app.post("/api/rsvps", async (req, res)=>{ 
    try { 
        const { name, guests, message } = req.body; 
        if(!name){ 
            return res.status(400).json({ success: false, error: "Name is required" }); 
        }
        const result = await db.run(
            "INSERT INTO rsvps (name, guests, message) VALUES (?, ?, ?)", 
            [name, guests || 1, message || ""]
        );
        // get inserted record
        const entry = await db.get("SELECT * FROM rsvps WHERE id = ?", result.lastID);
        res.json({success: true, entry}); 
    } catch (err) { 
        console.error("Error inserting RSVP:", err); 
        res.status(500).json({success: false, error: err.message});
    }
});

// front end route for / - fixes cannot get / 
// so when go to localhost - sends file from folder 
app.get("/", (req, res) => { 
    res.sendFile(path.join(__dirname, "../public", "index.html")); 
});

// Temporary debug route to view DB content
app.get("/debug", async (req, res) => {
  try {
    const rows = await db.all("SELECT * FROM rsvps ORDER BY timestamp DESC");
    res.json(rows);
  } catch (err) {
    console.error("Debug error:", err);
    res.status(500).json({ error: "Could not load RSVPs" });
  }
});

// start server 
const PORT = 3000; 
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});