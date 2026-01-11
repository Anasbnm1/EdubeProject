const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
require("dotenv").config();
const modulesData = require("./models/modules"); // ✅ Import from modules file

async function seedTestData() {
    await mongoose.connect(process.env.MONGO_URI);
    
    const db = mongoose.connection.db;
    
    console.log("🧹 Nettoyage des anciennes données de test...\n");
    
    // Find and delete old seed students
    const seedStudents = await db.collection("users").find({ 
        role: "student",
        email: { $regex: /@student\.ma$/i }
    }).toArray();
    
    if (seedStudents.length > 0) {
        const seedStudentIds = seedStudents.map(s => s._id);
        
        // Delete their grades
        const gradesResult = await db.collection("grades").deleteMany({
            student: { $in: seedStudentIds }
        });
        
        // Delete the students
        const studentsResult = await db.collection("users").deleteMany({
            _id: { $in: seedStudentIds }
        });
        
        console.log(`🗑️  ${studentsResult.deletedCount} étudiants supprimés`);
        console.log(`🗑️  ${gradesResult.deletedCount} notes supprimées\n`);
    } else {
        console.log("✅ Aucune donnée de test à nettoyer\n");
    }
    
    // ✅ Get modules from imported file
    const modules = modulesData;
    
    const groupes = ["G1", "G2", "G3", "G4"];
    
    // Hash a real password for all test students
    const hashedPassword = await bcrypt.hash("password123", 10);
    
    // Generate test students - 10 per group
    const students = [];
    const firstNames = [
        "Ahmed", "Fatima", "Youssef", "Amina", "Mehdi", "Salma", "Karim", "Nadia", "Omar", "Khadija",
        "Amine", "Leila", "Rachid", "Sofia", "Hamza", "Imane", "Adil", "Meryem", "Zakaria", "Hind",
        "Hassan", "Zineb", "Bilal", "Asmaa", "Said", "Houda", "Tarik", "Sanaa", "Anas", "Rajae",
        "Khalid", "Loubna", "Ismail", "Samira", "Driss", "Wafaa", "Yassine", "Karima", "Mouad", "Hanane"
    ];
    
    const lastNames = [
        "El Alami", "Bennani", "Tazi", "Berrada", "Idrissi", "Kabbaj", "Fassi", "Mansouri",
        "Benjelloun", "Alaoui", "Cherkaoui", "Sebti", "Hamdani", "Bennis", "Tahiri", "Lahlou",
        "Mazouz", "Kettani", "Naciri", "Ghazali", "Azizi", "Filali", "Ouazzani", "Squalli",
        "Chraibi", "Lamrani", "Fassi Fehri", "Taarji", "Benhaddou", "Zniber", "Belkadi", "Sefrioui",
        "Alami", "Berrada", "Bensouda", "Lazrak", "Hilali", "Elalamy", "Mekouar", "Guessous"
    ];
    
    let studentIndex = 0;
    groupes.forEach(groupe => {
        for (let i = 0; i < 10; i++) {
            const firstName = firstNames[studentIndex];
            const lastName = lastNames[studentIndex];
            const name = `${firstName} ${lastName}`;
            const email = `${firstName.toLowerCase()}.${lastName.toLowerCase().replace(/ /g, "")}@student.ma`;
            
            students.push({
                name: name,
                email: email,
                password: hashedPassword,
                role: "student",
                filiere: "Informatique",
                groupe: groupe
            });
            
            studentIndex++;
        }
    });
    
    // Insert students and get their IDs properly
    const insertedStudents = await db.collection("users").insertMany(students);
    console.log(`✅ ${students.length} étudiants insérés!`);
    console.log(`🔑 Mot de passe pour tous: password123`);
    
    // Get the logged-in professor (or create a test professor if needed)
    let professor = await db.collection("users").findOne({ role: "professor" });
    
    if (!professor) {
        const profHashedPassword = await bcrypt.hash("prof123", 10);
        const testProfessor = {
            name: "Dr. Mohammed Bennani",
            email: "prof@test.ma",
            password: profHashedPassword,
            role: "professor"
        };
        const result = await db.collection("users").insertOne(testProfessor);
        professor = { _id: result.insertedId, ...testProfessor };
        console.log(`✅ Professeur de test créé!`);
        console.log(`🔑 Email: prof@test.ma | Mot de passe: prof123`);
    }
    
    // ✅ Generate grades for ALL students (100% probability)
    const grades = [];
    const studentIds = Object.values(insertedStudents.insertedIds);
    
    console.log("\n📝 Génération des notes...");
    console.log(`Modules utilisés: ${modules.join(", ")}`);
    
    studentIds.forEach(studentId => {
        modules.forEach(module => {
            // ✅ CHANGED: 100% chance - all students get grades for all modules
            const test1 = Math.floor(Math.random() * 20) + 1;
            const intra = Math.floor(Math.random() * 20) + 1;
            const test2 = Math.floor(Math.random() * 20) + 1;
            const finale = Math.floor(Math.random() * 20) + 1;
            const moyenne = parseFloat(((test1 + intra + test2 + finale) / 4).toFixed(2));
            
            grades.push({
                student: new mongoose.Types.ObjectId(studentId),
                professor: new mongoose.Types.ObjectId(professor._id),
                module: module,
                test1: test1,
                intra: intra,
                test2: test2,
                finale: finale,
                moyenne: moyenne
            });
        });
    });
    
    if (grades.length > 0) {
        await db.collection("grades").insertMany(grades);
        console.log(`✅ ${grades.length} notes insérées!`);
    } else {
        console.log(`⚠️ Aucune note générée`);
    }
    
    console.log("\n📊 Résumé:");
    console.log(`   - ${students.length} étudiants (10 par groupe)`);
    console.log(`   - Filière: Informatique`);
    console.log(`   - ${modules.length} modules`);
    console.log(`   - ${grades.length} notes au total (${students.length} × ${modules.length})`);
    console.log(`   - Professeur: ${professor.name} (${professor.email})`);
    
    groupes.forEach(groupe => {
        const count = students.filter(s => s.groupe === groupe).length;
        console.log(`   - ${groupe}: ${count} étudiants`);
    });
    
    console.log("\n🔐 Identifiants de test:");
    console.log(`   - Tous les étudiants: password123`);
    console.log(`   - Professeur: prof123`);
    
    // Verify one student's grades
    const firstStudentId = studentIds[0];
    const sampleGrades = await db.collection("grades").find({ 
        student: new mongoose.Types.ObjectId(firstStudentId) 
    }).toArray();
    console.log(`\n✅ Vérification: Premier étudiant a ${sampleGrades.length} notes`);
    if (sampleGrades.length > 0) {
        console.log(`   Exemple de module: "${sampleGrades[0].module}"`);
    }
    
    mongoose.disconnect();
}

seedTestData();