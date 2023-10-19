class AppointmentFactory {
    Build(simpleAppointment) {

        // Extrai o dia, mês e ano da data fornecida no objeto simpleAppointment
        const day = simpleAppointment.date.getDate() + 1;
        const month = simpleAppointment.date.getMonth();
        const year = simpleAppointment.date.getFullYear();

        // Extrai a hora e os minutos da string de hora fornecida no objeto
        const hour = Number.parseInt(simpleAppointment.time.split(":")[0]);
        const minutes = Number.parseInt(simpleAppointment.time.split(":")[1]);

        // Cria um novo objeto Date com os valores extraídos
        const startDate = new Date(year, month, day, hour, minutes, 0, 0);
        startDate.setHours(startDate.getHours() - 3);

        // Cria um objeto de compromisso (appointment) com os dados processados
        const appo = {
            id: simpleAppointment.id,
            title: simpleAppointment.name + " - " + simpleAppointment.description,
            start: startDate,
            end: startDate
        }

        return appo;
    }
}

module.exports = new AppointmentFactory();