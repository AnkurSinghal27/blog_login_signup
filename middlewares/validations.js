const validator = require("validator")


const validate = (req, res, next)=>{
   
    const {name, email, password, age} = req.body
    if(!(name && email && password && age)){
        return res.status(400).send({status:"bad request", msg:"please enter all information"})
    }
    if(!validator.isEmail(email)){
        return res.status(400).send({status:"bad request", msg:"please enter a vlaid email"})
    
    }
    if(!validator.isStrongPassword(password, {
        minLength:8, minLowercase:1, minUppercase:1, minNumbers:1, minSymbols:1
    })){
        return res.status(400).send({status:"bad request", msg:"your password is not strong"})
    }
    next()
    
} 
module.exports = validate