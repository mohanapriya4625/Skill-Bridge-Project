const express = require("express");
const db = require("../db");

const router = express.Router();


// ======================================================
// CREATE / SAVE PROGRESS
// POST /api/progress
// ======================================================

router.post("/", (req, res) => {

    const {
        user_id,
        category,
        completed,
        score
    } = req.body;

    if (!user_id || !category) {
        return res.status(400).json({
            success: false,
            message: "User ID and category are required"
        });
    }

    const query = `
        INSERT INTO progress
        (user_id, category, completed, score)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            user_id,
            category,
            completed || 0,
            score || 0
        ],
        (err, result) => {

            if (err) {
                console.error("Database Error:", err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to save progress"
                });
            }

            res.status(201).json({
                success: true,
                message: "Progress saved successfully",
                progressId: result.insertId
            });
        }
    );
});


// ======================================================
// GET USER PROGRESS
// GET /api/progress/:user_id
// ======================================================

router.get("/:user_id", (req, res) => {

    const userId = req.params.user_id;

    const query = `
        SELECT * FROM progress
        WHERE user_id = ?
        ORDER BY updated_at DESC
    `;

    db.query(query, [userId], (err, results) => {

        if (err) {
            console.error("Database Error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to fetch progress"
            });
        }

        res.status(200).json({
            success: true,
            message: "Progress fetched successfully",
            progress: results
        });
    });
});


module.exports = router;