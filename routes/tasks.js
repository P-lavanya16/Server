const express = require("express");
const router = express.Router();
const db = require("../db");

// Get all remedial tasks
router.get("/", async (req, res) => {
  try {
    const [tasks] = await db.query("SELECT id, task AS title, status FROM Interventions");
    res.json(tasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Mark task complete
router.post("/:id/complete", async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("UPDATE Interventions SET status='Completed', completed_at=NOW() WHERE id=?", [id]);
    res.json({ message: "Task marked complete" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
