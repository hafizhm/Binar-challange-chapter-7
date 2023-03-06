const { user_game } = require("../models")
require('dotenv').config()

const bcrypt = require('bcrypt')
const saltRoundsEnv = process.env.SALTROUNDS_BCRYPT;
const saltRounds = +saltRoundsEnv
const jwt = require('jsonwebtoken')

// nama setelah process.env. (boleh random)

class AuthUser {

    // static homePage(req, res) {
    //     res.render("home")
    // }

    static userRenderRegister(req, res) {
        res.render("registerPage")
    }

    static async userRegister(req, res) {
        try {
            const { username, password } = req.body
            console.log(saltRounds, "==> Ini ENV");
            const salt = bcrypt.genSaltSync(saltRounds)
            const hash = bcrypt.hashSync(password, salt)


            let inputUser = {
                username,
                password: hash
            }
            
            //console.log(inputUser,"==> Ini input User")
            
            const responseInputUser = await user_game.create(inputUser)

            // console.log(responseInputUser)
            //res.status(201).json({ message: "Success Create New User" })
            res.redirect("/login")
            
        } catch (error) {
            console.log(error)
        }
    }

    static userRenderLogin(req, res) {
        res.render("LoginPage")
    }

    static async userLogin(username, password) {
        try {
             console.log(username, password)
            // const { username, password } = req.body

            // console.log(username, password)

            const userDataBase = await user_game.findOne({
                where: {
                    username
                }
            })

            console.log(userDataBase, "==> Cek Data User di DB waktu Login")

            if(!userDataBase) {
                return Promise.reject('user not found')        
            }else{
                const checkPassword = bcrypt.compareSync(password, userDataBase.password)
                // console.log(userDataBase.password, "--> Password DB");
                // console.log(password, "--> Password Input");
                // console.log(checkPassword);

                if(checkPassword) {
                    console.log("Password Bener! Check di Auth Controller --> Check Password")
                    return Promise.resolve(userDataBase)
                    
                } else{
                    console.log("Password Salah!  Check di Auth Controller --> Check Password")
                    return Promise.reject('Password salah --> checking di non JWT')
                    
                }
             
            }
           
            // console.log(userDataBase)
        } catch (error) {
            console.log(error);
        }
    }

    // who am i local
   static whoami(req, res){
        /* req.user adalah instance dari User Model, hasil autentikasi dari passport. */
        console.log("masuk ke whoami");
        res.render('home', req.user.dataValues)
    }


    // ============= JWT STRATEGY =============


    // static generateToken(id, username) {
    //     const payload = {
    //         id,
    //         username
    //     }

    //     const rahasia = 'Rahasia buat di log token'
    //     const token = jwt.sign(payload, rahasia)
    //     //console.log(token, "==> Ini token JWT")
    //     return token
    // }

    // static async userLoginAuthJWT(username, password) {
    //     try {
    //         const userDataBase = await user_game.findOne({
    //             where: {
    //                 username
    //             }
    //         })

    //         if(!userDataBase) {
    //             return promise.reject("Username is not found")
    //         }

    //         const checkPassword = bcrypt.compareSync(password, userDataBase.password)

    //         // password benar -> checking JWT
    //         if(checkPassword) {
    //             console.log("Password Bener! Pengecekan userLoginAuth di Auth Controller --> Check Password")
    //             return Promise.resolve(userDataBase)
    //         // password salah -> checking JWT 
    //         } else{
    //             console.log("Password Salah! Pengecekan userLoginAuth di Auth Controller --> Check Password")
    //             return Promise.reject('Password salah --> checking di JWT (AuthController')
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    // static async loginWithJWT(req, res) {
    //     try {
    //         const {username, password} = req.body
    //         //console.log(username, password, "Ini masuk login With JWT di authController")
    //         const cekLoginAuthJWT = await AuthUser.userLoginAuthJWT(username, password)
    //         //console.log(cekLoginAuthJWT, "==> Ini function terakhir Auth JWT - loginWithJWT")
    //         //console.log(cekLoginAuthJWT.dataValues.User_gameId, "==> loginWithJWT - CHECK ID")
    //         ///console.log(cekLoginAuthJWT.dataValues.username, "==> loginWithJWT - CHECK USERNAME")
        
    //         let idUser = cekLoginAuthJWT.dataValues.User_gameId
    //         let userNameUser = cekLoginAuthJWT.dataValues.username
    //         let generateTokenManipulate = AuthUser.generateToken(idUser, userNameUser)
    //         //console.log(generateTokenManipulate, "==> Ini generate token manipulate di authController")
        
    //         res.status(200).json({"access_token": generateTokenManipulate})
    //     } catch (error) {
    //         console.log(error); 
    //     }
    // }

    // static whoami2(req,res) {
    //     const currentUser = req.user
    //     res.json(currentUser)
    //     //res.render('home', req.currentUser)
    // }
}

module.exports = AuthUser