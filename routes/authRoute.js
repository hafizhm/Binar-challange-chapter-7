const express = require("express")
const route = express.Router()
const AuthUser = require("../controllers/authController")
const passport = require("../lib/passport")
const restrict = require("../middleware/restrict")
//const restrict = require("../middleware/restrict")

// autentikasi yang manggil halaman register dan login
// lewaat authController

//route.get('/', AuthUser.homePage) 

route.get("/register", AuthUser.userRenderRegister)

route.post("/register", AuthUser.userRegister)

route.get("/login", AuthUser.userRenderLogin)

// ketika user klik login, dia akan panggil passport dalam folder lib
// untuk di autentikasi usernya bener bisa login atau enggak
route.post("/login", passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/failed-login',
    failureFlash: true
}))

// route.post('/v1/login',  AuthUser.loginWithJWT)
// route.get('/v1/login', restrict, AuthUser.whoami2)

module.exports = route