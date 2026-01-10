const mongoose = require("mongoose");

const gradeSchema = new mongoose.Schema({
    student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    professor: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    module: { type: String, required: true },
    test1: { type: Number, default: 0 },
    intra: { type: Number, default: 0 },
    test2: { type: Number, default: 0 },
    finale: { type: Number, default: 0 },
});

module.exports = mongoose.model("Grade", gradeSchema);