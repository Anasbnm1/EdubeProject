const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = require("../middleware/auth");
const modules = require("../../src/config/modules");

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

        const token = jwt.sign(
            { id: newStudent._id, role: "student" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
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

        const token = jwt.sign(
            { id: newProfessor._id, role: "professor" },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );
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

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

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

// Route pour récupérer uniquement les étudiants
router.get("/students", async (req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");
        res.json({ students });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur" });
    }
});
const Grade = require("../models/Grade");

// Enregistrer les notes (professeur)
router.post("/grades", authMiddleware, async (req, res) => {
    try {
        const { studentId, module, test1, intra, test2, finale } = req.body;

        const grade = new Grade({
            student: studentId,
            professor: req.user.id,
            module : module.name,
            test1,
            intra,
            test2,
            finale,
            moyenne
        });

        await grade.save();

        // Update the document using $avg operator with updatePipeline option
        await Grade.updateOne(
            { _id: grade._id },
            [
                {
                    $set: {
                        moyenne: { $avg: ["$test1", "$intra", "$test2", "$finale"] }
                    }
                }
            ],
            { updatePipeline: true }  // ADD THIS OPTION
        );

        // Fetch the updated grade with populated fields
        const updatedGrade = await Grade.findById(grade._id)
            .populate("student", "name email filiere groupe")
            .populate("professor", "name email");

        res.status(201).json({ message: "Notes enregistrées avec succès", grade: updatedGrade });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
});

router.get("/modules", (req, res) => {
    res.json({ modules });
});


// Récupérer les notes d’un module
router.get("/grades/module/:module", authMiddleware, async (req, res) => {
    try {
        const grades = await Grade.find({ module: req.params.module })
            .populate("student", "name email groupe");
        res.json({ grades });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Mettre à jour une note
router.put("/grades/:id", authMiddleware, async (req, res) => {
    try {
        // First update the fields
        await Grade.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        // Then recalculate moyenne using $avg with updatePipeline option
        const updateResult = await Grade.updateOne(
            { _id: req.params.id },  // CHANGED: removed mongoose.Types.ObjectId()
            [
                {
                    $set: {
                        moyenne: { $avg: ["$test1", "$intra", "$test2", "$finale"] }
                    }
                }
            ],
            { updatePipeline: true }
        );

        // Fetch the updated grade
        const grade = await Grade.findById(req.params.id)
            .populate("student", "name email groupe")
            .populate("professor", "name email");

        res.json({ grade });
    } catch (err) {
        console.error("ERROR in PUT /grades/:id:", err);
        res.status(500).json({ error: err.message });
    }
});

router.get("/grades/me", authMiddleware, async (req, res) => {
    try {
        const grades = await Grade.find({ student: req.user.id })
            .populate("professor", "name email") // infos du prof
            .populate("student", "name email filiere groupe"); // infos de l’étudiant avec filière

        res.json({ grades });
    } catch (err) {
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
});

router.get("/grades/stats", authMiddleware, async (req, res) => {
    try {
        const stats = await Grade.aggregate([
            {
                $addFields: {
                    average: { $avg: ["$test1", "$intra", "$test2", "$finale"] }
                }
            },
            {
                $group: {
                    _id: "$module",
                    avgNote: { $avg: "$average" },
                    minNote: { $min: "$average" },
                    maxNote: { $max: "$average" }
                }
            }
        ]);

        res.json({ stats });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erreur serveur", details: err.message });
    }
});

module.exports = router;