const { ObjectId } = require("mongodb");
const Usuario = require("../modules/usuarios");
const express = require('express')
const usuariosRouter = express.Router()
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')


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




usuariosRouter.post('/register', async(req, res, next) => {
    try{
        const obj = new Usuario()
        const { fullname, email, nickname, password } = req.body
        const usuarioCreado = await obj.userRepository({fullname, email, nickname, password})
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
        const token = jwt.sign({nickname: usuarioAutenticado.nickname, id: usuarioAutenticado._id}, process.env.SECRET_JWT_KEY,
            {
                expiresIn: '1h',
            })

        res.cookie('access_token', token,{
            secure: process.env.NODE_ENV === 'production',
            maxAge: 1000 * 60 * 60
        }).send({usuarioAutenticado, token})
    }catch(error){
        next(error)
    }
})

usuariosRouter.post('/logout', async(req, res, next) => {
    try{
        res.clearCookie('access_token')
        res.status(200).send('Sesión cerrada correctamente')
    }catch(error){
        next(error)
    }
})

usuariosRouter.post('/token', async(req, res, next) => {
    try{
        const token = req.cookies.access_token
        const decoded = jwt.verify(token, process.env.SECRET_JWT_KEY)
        req.user = decoded
        res.status(200).send({decoded, valid:true})
        
    }catch(error){
        next(error)
    }
})





module.exports = usuariosRouter