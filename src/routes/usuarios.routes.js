const { ObjectId } = require("mongodb");
const Usuario = require("../modules/usuarios");
const express = require('express')
const usuariosRouter = express.Router()


usuariosRouter.get('/', async (req, res, next) => {
    try {
        const obj = new Usuario();
        const { userId, tipo } = req.query;

        const usuarios = await obj.getAllUsersAndFilterByRole({ userId, tipo });
        res.status(200).json(usuarios);

    } catch (error) {
        next(error);
    }
});

usuariosRouter.get('/:id', async(req, res, next) =>{
    try{
        const obj = new Usuario();
        const usuarios = await obj.showDetailsOfASpecificUser({userId: req.params.id})
        res.status(200).send(usuarios)

    }catch(error){
        next(error)
    }
})


// usuariosRouter.post('/crear', async(req, res, next) => {

//     try{
//         const obj = new Usuario();
//         const {nombre, email, telefono, tipo, nick} = req.body
//         const usuariosCreados = await obj.createUsers({nombre, email, telefono, tipo, nick})
//         res.status(200).send(usuariosCreados)
//     }catch(error){
//         next(error)
//     }

// })

usuariosRouter.post('/register', async(req, res, next) => {
    try{
        const obj = new Usuario()
        const { nickname, password } = req.body
        const usuarioCreado = await obj.userRepository({nickname, password})
        res.status(200).send(usuarioCreado)
    }catch(error){
        next(error)
    }
})

usuariosRouter.post('/login', async(req, res, next) =>{
    try{
        const obj = new Usuario()
        const {nickname, password} = req.body
        const usuarioAutenticado = await obj.login({nickname, password})
        res.status(200).send(usuarioAutenticado)
    }catch(error){
        next(error)
    }
})

usuariosRouter.put('/nuevo_rol', async(req, res, next) => {

    try{
        const obj = new Usuario();
        const {id, tipo} = req.body
        const usuariosActualizados = await obj.updateRoleOfUsers({id: req.body.id, tipo: req.body.tipo})
        res.status(200).send(usuariosActualizados)
    }catch(error){
        next(error)
    }

})



module.exports = usuariosRouter