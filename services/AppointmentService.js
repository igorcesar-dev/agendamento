// Importações
const appointment = require("../models/Appointment")
const mongoose = require("mongoose")
const AppointmentFactory = require("../factories/AppointmentFactory")

const Appo = mongoose.model("Appointment", appointment)

class AppointmentService {
    // Método para criar um novo appointment
    async Create(name, email, description, cpf, date, time, finished) {
        const newAppo = new Appo({
            name,
            email,
            description,
            cpf,
            date,
            time,
            finished: false
        });

        try {
            await newAppo.save();
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }

    }

    // Método para obter todos os appointments
    async GetAll(showFinished) {

        
        if (showFinished) {
            // Se "showFinished" for true, retorna todos os appointments
            return await Appo.find();
        } else {
            // Se showFinished for false, retorna apenas os appointments não finalizados
            const appos = await Appo.find({ 'finished': false });
            const appointments = [];

            // Itera pelos appointments encontrador e os transforma usando a factory (objeto para criação de outros objetos)
            appos.forEach(appointment => {
                if (appointment.date != undefined) {
                    appointments.push(AppointmentFactory.Build(appointment))
                }
            });

            return appointments;
        }
    }

    // Método para obter um appointment por ID
    async GetById(id) {
        try {
            let event = await Appo.findOne({ '_id': id });
            return event;
        } catch {
            console.log(err);
        }
    }

    // Método para finalizar um appointment por ID
    async Finish(id) {
        try {
            await Appo.findByIdAndUpdate(id, { finished: true });
            return true;
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    // Método para buscar um appointment por EMAIL ou CPF
    async Search(query) {
        try {
            let appos = Appo.find().or([{ email: query }, { cpf: query }])
            return appos;
        } catch (err) {
            console.log(err);
            return [];
        }
    }
}

module.exports = new AppointmentService();
