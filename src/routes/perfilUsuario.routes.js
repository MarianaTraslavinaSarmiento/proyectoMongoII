const Usuario = require("../modules/usuarios");
const express = require('express')
const perfilRouter = express.Router()

perfilRouter.get('/', async(req, res, next) =>{
    try{
        const obj = new Usuario();
        console.log(req.user);

        const usuarios = await obj.showDetailsOfASpecificUser(req.user.id)
        
        
        res.status(200).send(usuarios)

    }catch(error){
        next(error)
    }
})

module.exports = perfilRouter;