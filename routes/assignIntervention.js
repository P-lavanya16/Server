const express = require("express");
const router = express.Router();
const db = require("../db");

router.post("/", async (req, res) => {
  const { student_id, task } = req.body;

  try {
    // Check if student exists
    const [student] = await db.query("SELECT * FROM Students WHERE id = ?", [student_id]);
    if (!student.length) {
      return res.status(400).json({ error: "Student not found" });
    }

    // Insert intervention
    await db.query(
      "INSERT INTO Interventions (student_id, task, status) VALUES (?, ?, 'Assigned')",
      [student_id, task]
    );

    // Update student status
    await db.query("UPDATE Students SET status='Remedial' WHERE id=?", [student_id]);

    res.json({ message: "Task assigned and student status updated" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
