const express = require('express')
const app = express()
require('dotenv').config()
const session = require('express-session')
const flash = require('express-flash')
const port = +process.env.PORT
const restrict = require('./middleware/restrict')
//const routes = require("./routes")

// Router
const gameRouter = require('./routes/gameRoute')
//const loginRouter = require('./routes/loginRoute') --> ini sementara gak di pake
const user = require('./routes/userRoute')
const allUser = require('./routes/allUserRoute')
const registerUser = require('./routes/authRoute')

app.use(express.urlencoded({ extended: false }))

app.use(session({
    secret: 'Buat ini jadi rahasia',
    resave: false,
    saveUninitialized: false
}))
  
const passport = require('./lib/passport')
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

app.use(registerUser)


// JSON
const userJSON = require('./users.json')
const AuthUser = require('./controllers/authController')
//console.log(userJSON)

app.use(express.json())

// setting ejs
app.set('view engine', 'ejs')

app.use(express.static('public'))

// app.get('/', (req,res) => {
//     res.render('home')
//     //res.send('HomePage')
// })

app.get('/', restrict, AuthUser.whoami)

app.get('/failed-login', (req,res) => {
    res.send("Gagal Login")
})

app.use('/game', gameRouter)

app.use('/user', user)

app.use('/allUser', allUser)

app.use('/register', registerUser)


// app.use('/login', loginRouter)
app.use(express.static('public'))

app.get('*', (req,res) => {
    res.status(404).send('404 NOT FOUND')
})

app.listen(port, () => {
    console.log("Jalan di Port : " + port)
})