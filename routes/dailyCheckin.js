// routes/dailyCheckin.js
const express = require("express");
const router = express.Router();
const db = require("../db");

// POST /daily-checkin
router.post("/", async (req, res) => {
  const { name, quiz_score = 0, focus_minutes = 0 } = req.body;

  try {
    console.log("Finding student:", name);

    const [students] = await db.query(
      "SELECT id FROM Students WHERE name = ?",
      [name]
    );

    if (students.length === 0) {
      return res.status(404).json({ error: "Student not found" });
    }

    const student_id = students[0].id;

    console.log("Inserting daily log...");
    await db.query(
      "INSERT INTO Daily_Logs (student_id, quiz_score, focus_minutes) VALUES (?, ?, ?)",
      [student_id, quiz_score, focus_minutes]
    );

    let status = "On Track";
    if (quiz_score <= 7 || focus_minutes <= 60) {
      status = "Needs Intervention";
      console.log("Updating student status to:", status);
      await db.query("UPDATE Students SET status=? WHERE id=?", [
        status,
        student_id,
      ]);
    }

    res.json({ message: "Check-in successful", status, student_id });
  } catch (err) {
    console.error("DB Error in /daily-checkin:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
