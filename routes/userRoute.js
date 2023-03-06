const express = require('express')

const router = express.Router()

var { user_game } = require('../models');

router.get('/', (req,res) => {
    res.status(200).render('user')
})

router.post('/', async (req, res) => {
   
    try {
        await user_game.create({
            username: req.body.username,
            password: req.body.password,
        })
        .then(user_game => {
            res.send('User baru berhasil dibuat!')
        })
        res.render("user");
    } catch (error) {
        console.log(error)
    }
    // console.log(parseInt(age))
    // console.log(typeof parseInt(age))

});


module.exports = router