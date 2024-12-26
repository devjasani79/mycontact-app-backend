const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    const authHeader = req.headers.authorization || req.headers.Authorization; // Normalize the header access
    if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "USER NOT VERIFIED" });
            }
            req.user = decoded.user; // Attach decoded user to request object
            next();
        });
    } else {
        return res.status(401).json({ message: "USER NOT AUTHORIZED or TOKEN MISSING" });
    }
});

module.exports = validateToken;
