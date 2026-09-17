const express = require("express");

const router = express.Router();

const verifyToken = require("../middleware/authMiddleware");


// ======================================================
// PROTECTED PROFILE API
// ======================================================

router.get("/", verifyToken, (req, res) => {

    res.status(200).json({
        success: true,
        message: "Protected Profile API accessed successfully!",
        user: {
            id: req.user.id,
            email: req.user.email,
            role: req.user.role
        }
    });

});


module.exports = router;