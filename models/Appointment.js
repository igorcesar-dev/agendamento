// Importando o módulop mongoose
const mongoose = require("mongoose");

// Definindo um novo Schema de dados
const appointment = new mongoose.Schema({
    name: String,
    email: String,
    description: String,
    cpf: String,
    date: Date,
    time: String,
    finished: Boolean,
});

module.exports = appointment;