// backend/middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Minimal middleware to satisfy routes
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");
        if (!token) return res.status(401).json({ message: "Accès refusé" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // this is all your routes need
        next();
    } catch (err) {
        res.status(401).json({ message: "Token invalide", error: err.message });
    }
};

// Keep your old login function unchanged
async function login(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    const payload = {
        id: user._id,
        role: user.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
}

// Export the middleware only (login function remains unchanged)
module.exports = authMiddleware;
