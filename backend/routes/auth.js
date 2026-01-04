const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
// REGISTER Étudiant
router.post("/register/student", async (req, res) => {
    try {
        const { name, email, password, filiere, groupe } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newStudent = new User({
            name,
            email,
            password: hashedPassword,
            role: "student",
            filiere,
            groupe,
        });

        await newStudent.save();

        const token = jwt.sign({ id: newStudent._id, role: "student" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "Étudiant créé avec succès", token });
    } catch (err) {
        console.error("Erreur Register:", err);
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
});

// REGISTER Professeur
router.post("/register/professor", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email déjà utilisé" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const newProfessor = new User({
            name,
            email,
            password: hashedPassword,
            role: "professor",
        });

        await newProfessor.save();

        const token = jwt.sign({ id: newProfessor._id, role: "professor" }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.status(201).json({ message: "Professeur créé avec succès", token });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
});

// LOGIN
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Utilisateur non trouvé" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Mot de passe incorrect" });

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({
            message: "Connexion réussie",
            token,
            role: user.role,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                filiere: user.filiere,
                groupe: user.groupe,
            },
        });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
});

// Route pour récupérer les infos de l'utilisateur connecté
router.get("/me", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password"); // exclure le mot de passe
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }
        res.json({ user });
    } catch (err) {
        res.status(500).json({ message: "Erreur serveur", error: err.message });
    }
});


module.exports = router;