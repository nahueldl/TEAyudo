const express = require('express');
const router = express.Router();
const categoriaService = require('../services/categoriaService')

const ejemploCategorias = [
    {
        id: 1,
        nombre: "personas"
    }
];

router.get('/', async (req, res) => {
    const result = await categoriaService.getAll();
    if(result.state){
        res.status(200).json(result.response);
    }else{
        res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
    }
});

router.get('/:id', async (req, res) => {
    const result = await categoriaService.get(req.params.id)

    if(result.state)
        res.status(200).json(result.response);
    else
        res.status(404).json({msg: `No se encontro categoría con id=${req.params.id}`});    
});

router.post('/', async (req, res) => {
    const result = await categoriaService.insert(req.body);
    if(result.state){
        res.status(200).json({msg: "La categoria ha sido correctamente creada"});
    }else{
        res.status(500).json({msg: "Ha ocurrido un error inesperado en el servidor"});
    }
});

module.exports = router;