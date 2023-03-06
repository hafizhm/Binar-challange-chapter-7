const passport = require("passport")
const localStrategy = require("passport-local").Strategy
const AuthUser = require('../controllers/authController')
const userLogin = AuthUser.userLogin
const { user_game } = require("../models")
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt")
const userLoginAuthJWT = AuthUser.userLoginAuthJWT

//console.log("Masuk di passport");

// ========================================================================

// JWT LOCAL STRATEGY 

async function authenticate(username, password, done) {
    try {

        console.log("Terpanggil di Passport");
 
        // dari passport manggil userLogin yang ada di controller
        const user = await userLogin (username, password)
        //console.log(user, "===> ini response authenticate di passport, hasil panggil lewat controller");
        return done(null, user)
    } catch (error) {
        return done(null, false, { message: error.message })
    }
}


passport.use(
    new localStrategy({ usernameField: 'username', passwordField: 'password' }, authenticate)
)

passport.serializeUser(
    (user, done) => done(null, user.dataValues.User_gameId)
)

passport.deserializeUser(
    async (User_gameId, done) => done(null, await user_game.findByPk(User_gameId))
    
)

// ========================================================================

// JWT TOKEN STRATEGY 

const options = {
    // Untuk mengekstrak JWT dari request, dan mengambil token-nya dari header yang bernama Authorization
    jwtFromRequest : ExtractJwt .fromHeader ('authorization' ),
    /* Harus sama seperti dengan apa yang kita masukkan sebagai parameter kedua dari jwt.sign di User Model.
    Inilah yang kita pakai untuk memverifikasi apakah tokennya dibuat oleh sistem kita */
    secretOrKey : 'Ini rahasia ga boleh disebar-sebar' ,
}

// passport.use(new JwtStrategy (options, async (payload, done) => {
//     // payload adalah hasil terjemahan JWT, sesuai dengan apa yang kita masukkan di parameter pertama dari jwt.sign
//     User.findByPk (payload.id)
//     .then(user => done(null, user)) // ini antara user atau user_game
//     .catch(err => done(err, false))
// }))


module.exports = passport