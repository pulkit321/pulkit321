// currently not used anywhere


const jwt= require('jsonwebtoken')
const ls= require('local-storage')

// middleware function to check the current user
function authmdw(req, res, next){
    
    if(req.headers.cookie) console.log(`jwt- cookie: ${req.headers.cookie}`)
    
    // const token= req.headers.cookie.split('=')[1]
    const token= ls.get('jwt')
    console.log(ls.get('jwt'))
    if(! token) return res.status(401).send("Access denied! Auth token not found")

    try{
        // const decodedToken= jwt.verify(token, 'secret key') 
        // req.user= decodedToken

        req.user= token
        next()
    }
    catch(err){
        res.status(400).send('invalid token !!')
    }
}

module.exports= authmdw