import  { Router } from 'express'
import { emailPasswordValidator , registerValidator , loginValidator } from '../validation/auth.validator'
import { userLogin,  userRegister , getUsers, getApiKey, confirmEmail , isEmailVerified , user } from '../controllers/auth.controller'
import RequestAuthentication from '../middleware/auth'
import {generateKey} from '../middleware/keyServices'


const route = Router()

route.get("/confirm/:id", confirmEmail)

route.post('/register' , registerValidator, userRegister )

route.post("/login", loginValidator , userLogin)

route.use(RequestAuthentication)

route.get('/key', (req, res) =>{   res.send(generateKey()) })

route.get('/email/:id', isEmailVerified )

route.get('/user/:id', user )

route.get('/getkey/:id', getApiKey )

route.get("/getusers/:id", getUsers)


export default route;

