const express = require("express");
const router = express.Router();
const db = require("../db");

// Get focus mode status for a student
router.get("/", async (req, res) => {
  const { student_id } = req.query; // pass ?student_id=1 in Postman or frontend
  if (!student_id) return res.status(400).json({ error: "student_id is required" });

  try {
    const [rows] = await db.query("SELECT status FROM Students WHERE id=?", [student_id]);
    if (rows.length === 0) return res.status(404).json({ error: "Student not found" });

    const locked = rows[0].status !== "On Track"; // Example: only "On Track" students unlocked
    res.json({ locked });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Optional: Unlock focus mode for a student (mentor action)
router.post("/unlock", async (req, res) => {
  const { student_id } = req.body;
  if (!student_id) return res.status(400).json({ error: "student_id is required" });

  try {
    await db.query("UPDATE Students SET status='On Track' WHERE id=?", [student_id]);
    res.json({ message: "Focus mode unlocked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
