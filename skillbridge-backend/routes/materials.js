const express = require("express");
const db = require("../db");

const router = express.Router();


// ======================================================
// CREATE STUDY MATERIAL
// POST /api/materials
// ======================================================

router.post("/", (req, res) => {

    const { title, category, description, content } = req.body;

    if (!title || !category) {
        return res.status(400).json({
            success: false,
            message: "Title and category are required"
        });
    }

    const query = `
        INSERT INTO study_materials
        (title, category, description, content)
        VALUES (?, ?, ?, ?)
    `;

    db.query(
        query,
        [title, category, description || "", content || ""],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to create study material"
                });
            }

            res.status(201).json({
                success: true,
                message: "Study material created successfully",
                materialId: result.insertId
            });
        }
    );
});


// ======================================================
// GET ALL STUDY MATERIALS
// GET /api/materials
// ======================================================

router.get("/", (req, res) => {

    const query = "SELECT * FROM study_materials";

    db.query(query, (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch materials"
            });
        }

        res.status(200).json({
            success: true,
            message: "Study materials fetched successfully",
            materials: results
        });
    });
});


// ======================================================
// GET SINGLE STUDY MATERIAL
// GET /api/materials/:id
// ======================================================

router.get("/:id", (req, res) => {

    const materialId = req.params.id;

    const query = "SELECT * FROM study_materials WHERE id = ?";

    db.query(query, [materialId], (err, results) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: "Failed to fetch study material"
            });
        }

        if (results.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Study material not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Study material fetched successfully",
            material: results[0]
        });
    });
});


// ======================================================
// UPDATE STUDY MATERIAL
// PUT /api/materials/:id
// ======================================================

router.put("/:id", (req, res) => {

    const materialId = req.params.id;

    const {
        title,
        category,
        description,
        content
    } = req.body;

    if (!title || !category) {
        return res.status(400).json({
            success: false,
            message: "Title and category are required"
        });
    }

    const query = `
        UPDATE study_materials
        SET title = ?,
            category = ?,
            description = ?,
            content = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [
            title,
            category,
            description || "",
            content || "",
            materialId
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to update study material"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Study material not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Study material updated successfully"
            });
        }
    );
});

// ======================================================
// DELETE STUDY MATERIAL
// DELETE /api/materials/:id
// ======================================================

router.delete("/:id", (req, res) => {

    const materialId = req.params.id;

    const query = "DELETE FROM study_materials WHERE id = ?";

    db.query(query, [materialId], (err, result) => {

        if (err) {
            console.error("Database Error:", err);

            return res.status(500).json({
                success: false,
                message: "Failed to delete study material"
            });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({
                success: false,
                message: "Study material not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Study material deleted successfully"
        });

    });

});
module.exports = router;