const express = require("express");
const db = require("../db");

const router = express.Router();


// ======================================================
// CREATE QUESTION
// POST /api/questions
// ======================================================

router.post("/", (req, res) => {

    const {
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        explanation
    } = req.body;

    if (
        !question ||
        !option_a ||
        !option_b ||
        !option_c ||
        !option_d ||
        !correct_answer
    ) {
        return res.status(400).json({
            success: false,
            message: "Question, all options and correct answer are required"
        });
    }

    const query = `
        INSERT INTO aptitude_questions
        (question, option_a, option_b, option_c, option_d, correct_answer, explanation)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            explanation || ""
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to create aptitude question"
                });
            }

            res.status(201).json({
                success: true,
                message: "Aptitude question created successfully",
                questionId: result.insertId
            });
        }
    );
});


// ======================================================
// GET ALL QUESTIONS
// GET /api/questions
// ======================================================

router.get("/", (req, res) => {

    db.query(
        "SELECT * FROM aptitude_questions",
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch aptitude questions"
                });
            }

            res.status(200).json({
                success: true,
                message: "Aptitude questions fetched successfully",
                questions: results
            });
        }
    );
});


// ======================================================
// GET SINGLE QUESTION
// GET /api/questions/:id
// ======================================================

router.get("/:id", (req, res) => {

    const questionId = req.params.id;

    db.query(
        "SELECT * FROM aptitude_questions WHERE id = ?",
        [questionId],
        (err, results) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to fetch aptitude question"
                });
            }

            if (results.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Aptitude question not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Aptitude question fetched successfully",
                question: results[0]
            });
        }
    );
});


// ======================================================
// UPDATE QUESTION
// PUT /api/questions/:id
// ======================================================

router.put("/:id", (req, res) => {

    const questionId = req.params.id;

    const {
        question,
        option_a,
        option_b,
        option_c,
        option_d,
        correct_answer,
        explanation
    } = req.body;

    if (
        !question ||
        !option_a ||
        !option_b ||
        !option_c ||
        !option_d ||
        !correct_answer
    ) {
        return res.status(400).json({
            success: false,
            message: "Question, all options and correct answer are required"
        });
    }

    const query = `
        UPDATE aptitude_questions
        SET question = ?,
            option_a = ?,
            option_b = ?,
            option_c = ?,
            option_d = ?,
            correct_answer = ?,
            explanation = ?
        WHERE id = ?
    `;

    db.query(
        query,
        [
            question,
            option_a,
            option_b,
            option_c,
            option_d,
            correct_answer,
            explanation || "",
            questionId
        ],
        (err, result) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Failed to update aptitude question"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Aptitude question not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Aptitude question updated successfully"
            });
        }
    );
});


// ======================================================
// DELETE QUESTION
// DELETE /api/questions/:id
// ======================================================

router.delete("/:id", (req, res) => {

    const questionId = req.params.id;

    db.query(
        "DELETE FROM aptitude_questions WHERE id = ?",
        [questionId],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: "Failed to delete aptitude question"
                });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Aptitude question not found"
                });
            }

            res.status(200).json({
                success: true,
                message: "Aptitude question deleted successfully"
            });
        }
    );
});


module.exports = router;