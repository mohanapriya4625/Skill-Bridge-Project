const express = require("express");
const cors = require("cors");
const db = require("./db");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const materialsRoutes = require("./routes/materials");
const questionsRoutes = require("./routes/questions");
const progressRoutes = require("./routes/progress");
const codingRoutes = require("./routes/coding");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/materials", materialsRoutes);
app.use("/api/questions", questionsRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/coding", codingRoutes);
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "SkillBridge Backend API is running successfully!",
        version: "1.0.0"
    });
});

app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "SkillBridge REST API is working!"
    });
});

app.listen(PORT, () => {
    console.log(`🚀 SkillBridge Backend running on http://localhost:${PORT}`);
});