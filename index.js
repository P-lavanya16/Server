const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const dailyCheckinRoute = require("./routes/dailyCheckin");
const assignInterventionRoute = require("./routes/assignIntervention");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use("/daily-checkin", dailyCheckinRoute);
app.use("/assign-intervention", assignInterventionRoute);
const tasksRoute = require("./routes/tasks");
app.use("/tasks", tasksRoute);
const focusModeRoute = require("./routes/focusMode");
app.use("/focus-mode", focusModeRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
