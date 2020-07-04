const express = require('express');
const router = express.Router();

const ejemploCategorias = [
    {
        id: 1,
        nombre: "personas"
    }
];

router.get('/', (req, res) => res.json(ejemploCategorias));

router.get('/:id', (req, res) => {
    const found = ejemploCategorias.some(categoria => categoria.id === parseInt(req.params.id));

    if(found)
        res.status(200).json(ejemploCategorias.filter(categoria => categoria.id === parseInt(req.params.id)));
    else
        res.status(404).json({msg: `No se encontro categoría con id=${req.params.id}`});    
});

module.exports = router;