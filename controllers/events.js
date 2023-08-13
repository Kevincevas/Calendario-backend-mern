const { response } = require('express');
const { generarJWT } = require('../helpers/jwt')
const Evento = require('../models/Evento');



const getEventos = async( req, res=response ) => {

    const eventos = await Evento.find()
                                .populate('user','name');//especificando que solo devuelva el name del usuario

    res.status(200).json({
        ok: true,
        eventos
    })
}


const crearEvento = async(req, res=response) => {
    
    const evento = new Evento( req.body );

    try {

        //asginando el id del usuario al evento
        evento.user = req.uid;

        const eventoGuardado = await evento.save();

        res.json({
            ok: true,
            evento: eventoGuardado,
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        });
    }


}

const actualizarEvento = async(req, res=response) => {

    //obteniendo el id del usuario
    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {

        const evento = await Evento.findById( eventoId );
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id',
            });
        }

        //codigo 401: no autorizado
        if (evento.user.toString() !== uid) {
            return res.status(401).json({ 
                ok: false,
                msg:'No tiene privilegio de editar este evento',
            })
        }

        const nuevoEvento = {
            ...req.body,
            user: uid
        }

        //actualizando
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } ); //new:true, devuelve los datos actualizados ya insertados en postman

        res.json({
            ok: true,
            evento: eventoActualizado,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        });
    }

}

const eliminarEventos = async(req, res=response) => {
    
    //obteniendo el id del usuario
    const eventoId = req.params.id;
    const uid = req.uid;
    
    try {

        const evento = await Evento.findById( eventoId );
        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no existe por ese id',
            });
        }

        //codigo 401: no autorizado
        if (evento.user.toString() !== uid) {
            return res.status(401).json({ 
                ok: false,
                msg:'No tiene privilegio de eliminar este evento',
            })
        }

        //eliminando
        await Evento.findByIdAndDelete( eventoId );

        res.json({
            ok: true,
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'Hable con el admin',
        });
    }
}


module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEventos,
}