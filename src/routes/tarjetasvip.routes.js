const { ObjectId } = require("mongodb");
const express = require('express');
const TarjetaVIP = require("../modules/tarjetasVIP");
const tarjetasVipRouter = express.Router()

tarjetasVipRouter.get('/getbyid', async (req, res, next) => {
    try {

        let obj = new TarjetaVIP

        const card = await obj.getAllVipCardsByUser({ userId: req.user.id });

        res.status(200).json({
            success: true,
            card
        });
    } catch (err) {
        next(err);
    }
})


module.exports = tarjetasVipRouter