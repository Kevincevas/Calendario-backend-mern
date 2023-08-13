
const { Schema, model } = require('mongoose');

const EventoSchema = Schema({
    title: {
        type: String,
        required: true,
    },
    notes: {
        type: String,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: Date,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,  //para especificar a mongoose que es una referencia
        ref: 'Usuario',
        required: true,
    }
});

//cammbiar el nombre de las propiedades de json
EventoSchema.method('toJSON', function() {
    //retirando a __v del json
    const { __v, _id, ...object } = this.toObject();
    //cambiando el nombre de _id a id
    object.id = _id;
    return object;

})

module.exports = model( 'Evento', EventoSchema );
