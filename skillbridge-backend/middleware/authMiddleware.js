const jwt = require("jsonwebtoken");


// ======================================================
// JWT AUTHENTICATION MIDDLEWARE
// ======================================================

const verifyToken = (req, res, next) => {

    try {

        // Get Authorization Header
        const authHeader = req.headers.authorization;

        // Check whether token exists
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided."
            });
        }

        // Expected format:
        // Bearer YOUR_TOKEN

        const token = authHeader.split(" ")[1];

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Invalid token format."
            });
        }

        // Verify JWT Token
        const decoded = jwt.verify(
            token,
            "skillbridge_secret_key"
        );

        // Store decoded user information
        req.user = decoded;

        // Continue to protected API
        next();

    } catch (error) {

        console.error("JWT Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token."
        });
    }
};


module.exports = verifyToken;