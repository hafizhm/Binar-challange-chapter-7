const express = require("express")
const router = express.Router()

const userJSON = require('../users.json')

router.get('/', (req, res) => {
    res.status(200).render('loginPage')
})

// router.post('/', (req, res) => {
//     console.log("Ini request body ", req.body)
//     const { username, password } = req.body

//     userJSON.push({ username, password })
//     console.log(userJSON)

//     res.redirect('/')

//     //ini nanti lanjutin lagi buat bikin validasi login
//     //materi nya baru di review sampe pertemuan 6, menit 60
// })

router.post('/username', (req, res) => {
  
    //liat video rekaman 5, menit 50 an

   console.log(req.body);

    const { username, password } = req.body

    try{
        const parsedPassword = parseInt(password);

        if(typeof username !== "string") {
            throw new Error("Username is not a string!")
        } else if(typeof password !== "number") {
            throw new Error("Password is not a number!")
        }

        if(username.length > 20 || password.length !== 3) {
            throw new Error("Username / password length is not correct")
        } else {
            console.log("User logged in. data : ", userJSON)
            res.render("/", { userJSON })
        }
    }catch(err) {
        console.log(err) 
        res.status(400).send(err.message)
    }

   // res.render('home')
})

module.exports = router