const express = require('express')

const router = express.Router()

var { user_game_biodata } = require('../models')

// router.get('/', (req,res) => {
//     res.status(200).render('allUser')
// })

router.get('/', async (req, res) => {
    const result = await user_game_biodata.findAll({ raw: true })
    console.log(result)
    res.render("allUser", { data: result });
});

router.get('/:id', async function(req, res) {
    const result = await user_game_biodata.findAll({ raw: true })
    
    console.log(result)
    res.render("allUser", { data: result });
});

router.post('/', async (req, res) => {
   
    try {
        await user_game_biodata.create({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
            country: req.body.country,
        })
            .then(user_game_biodata => {
                res.send('User biodata baru berhasil dibuat!')
            })
        //res.render("allUser");
    } catch (error) {
        console.log(error)
        res.send('Error! Data User gagal di buat')
    }

    //res.redirect("/allUser")
    // console.log(parseInt(age))
    // console.log(typeof parseInt(age))
});

router.post('/edit', async function(req, res) {
    const { id } =  req.query

    const result = await user_game_biodata.findAll({ raw: true })
    console.log("result : ", result)

    const dataToEdit = result.find(item => item.ID_user === parseInt(id))

    console.log("Data To Edit : ", dataToEdit)
    console.log("PUT===")
    res.render("edit",{dataToEdit})
})

router.post('/delete', async function(req, res) {

        const { id } = req.query

        // edit method
        const result = await user_game_biodata.destroy({
            where: { ID_user: id }
        })
        res.redirect("/allUser")
})


module.exports = router