const jwt = require("jsonwebtoken");

function auth(req, res, next) {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "Accès refusé, token manquant" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // contient { id, role }
        next();
    } catch (err) {
        res.status(400).json({ message: "Token invalide" });
    }
}

module.exports = auth;