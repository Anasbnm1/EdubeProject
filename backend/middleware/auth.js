const jwt = require("jsonwebtoken");

function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (!authHeader || typeof authHeader !== "string") {
        return res.status(401).json({ message: "Token manquant" });
    }

    const parts = authHeader.split(" ");
    const token = parts.length === 2 ? parts[1] : parts[0];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        return next();
    } catch (err) {
        return res.status(401).json({ message: "Token invalide", error: err.message });
    }
}

module.exports = authMiddleware;
