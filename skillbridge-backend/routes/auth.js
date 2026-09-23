const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const router = express.Router();

const db = require("../db");


// ======================================================
// REGISTER API
// ======================================================

router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validation
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email and password are required"
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must contain at least 6 characters"
            });
        }

        // Check existing user
        const checkQuery = "SELECT id FROM users WHERE email = ?";

        db.query(checkQuery, [email], async (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            if (results.length > 0) {
                return res.status(409).json({
                    success: false,
                    message: "Email already registered"
                });
            }

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert user
            const insertQuery = `
                INSERT INTO users (name, email, password)
                VALUES (?, ?, ?)
            `;

            db.query(
                insertQuery,
                [name, email, hashedPassword],
                (err, result) => {

                    if (err) {
                        console.error(err);

                        return res.status(500).json({
                            success: false,
                            message: "Failed to register user"
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: "User registered successfully",
                        userId: result.insertId
                    });
                }
            );
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});


// ======================================================
// LOGIN API
// ======================================================

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validation
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required"
            });
        }

        // Find user by email
        const query = "SELECT * FROM users WHERE email = ?";

        db.query(query, [email], async (err, results) => {

            if (err) {
                console.error(err);

                return res.status(500).json({
                    success: false,
                    message: "Database error"
                });
            }

            // User not found
            if (results.length === 0) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }

            const user = results[0];

            // Compare password
            const passwordMatch = await bcrypt.compare(
                password,
                user.password
            );

            // Wrong password
            if (!passwordMatch) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid email or password"
                });
            }


            // ==================================================
            // CREATE JWT TOKEN
            // ==================================================

            const token = jwt.sign(
    { id, email, role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
)


            // ==================================================
            // LOGIN SUCCESS RESPONSE
            // ==================================================

            res.status(200).json({
                success: true,
                message: "Login successful",
                token: token,
                user: {
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                }
            });

        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});


// ======================================================
// EXPORT ROUTER
// ======================================================

module.exports = router;