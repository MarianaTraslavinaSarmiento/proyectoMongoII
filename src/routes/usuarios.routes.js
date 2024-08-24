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

usuariosRouter.get('/:id', async(req, res, next) =>{
    try{
        const obj = new Usuario();
        const usuarios = await obj.showDetailsOfASpecificUser({userId: req.params.id})
        res.status(200).send(usuarios)

    }catch(error){
        next(error)
    }
})



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
        const token = jwt.sign({nickname: usuarioAutenticado.nickname}, process.env.SECRET_JWT_KEY,
            {
                expiresIn: '1h',
            }
            )

        res.status(200).

        cookie('access_token', token,{
            httpOnly: true,
            secure: procces.env.NODE_ENV == 'production',
            sameSite: 'strict',
            maxAge: 1000 * 60 * 60
        }).send(usuarioAutenticado, token)
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





module.exports = usuariosRouter