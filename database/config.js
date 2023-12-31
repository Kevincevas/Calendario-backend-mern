const mongoose = require('mongoose');

//conexión con la base de datos
const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.DB_CNN);
        console.log('DB online')

    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de inicializar la DB');
    }
}

module.exports = {
    dbConnection
}
