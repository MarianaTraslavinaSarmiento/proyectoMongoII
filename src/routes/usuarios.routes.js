const { ObjectId } = require("mongodb");
const Usuario = require("../modules/usuarios");
const express = require('express')
const usuariosRouter = express.Router()


usuariosRouter.get('/:id', async(req, res, next) =>{
    try{
        const obj = new Usuario();
        const usuarios = await obj.showDetailsOfASpecificUser({userId: req.params.id})
        res.status(200).send(usuarios)

    }catch(error){
        next(error)
    }
})


usuariosRouter.post('/crear', async(req, res, next) => {

    try{
        const obj = new Usuario();
        const {nombre, email, telefono, tipo, nick} = req.body
        const usuariosCreados = await obj.createUsers({nombre, email, telefono, tipo, nick})
        res.status(200).send(usuariosCreados)
    }catch(error){
        next(error)
    }
})



module.exports = usuariosRouter