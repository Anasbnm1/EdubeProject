const jwt = require("jsonwebtoken");

async function login(req, res) {
    const { email, password } = req.body;

    // Vérifie l'utilisateur en base
    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    // Vérifie le mot de passe (exemple simplifié)
    const isValid = await user.comparePassword(password);
    if (!isValid) {
        return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Payload avec id et role
    const payload = {
        id: user._id,
        role: user.role, // "student" ou "professor"
    };

    // Génération du token
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ token });
}
