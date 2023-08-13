/*
    Rutas de Eventos / event
    host + api/events
*/
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { getEventos, crearEvento, actualizarEvento, eliminarEventos } = require('../controllers/events');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isDate } = require('../helpers/isDate');

const router = Router();

// valida que todas las rutas tienen que pasar por la validacion del JWT
router.use( validarJWT );

// obtener eventos
router.get( '/', getEventos );

// crear eventos
router.post( 
    '/', 
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ), //custom: especifica una validacion customizada por nosotros -> helpers
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento );

// actualizar eventos
router.put( 
    '/:id', 
    [
        check('title','El título es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ), //custom: especifica una validacion customizada por nosotros -> helpers
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    actualizarEvento );

// borrar eventos
router.delete('/:id', eliminarEventos )

module.exports = router;
