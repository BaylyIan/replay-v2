const jwt = require('jsonwebtoken')

const secret = process.env.ACCESS_TOKEN_SECRET || 'my secret'

function generateToken(data) {
    const token = jwt.sign(data, secret, { expiresIn: "100000000000000000000000s" })

    // const token = jwt.sign(data, secret, { expiresIn: "120s" })

    return token
}
exports.generateToken = generateToken

//middleware function
function authorize(req, res, next) {
    const authHeader = req.headers.authorization
    const token = authHeader ? authHeader.split(' ')[1] : null
    // const token = authHeader;
    //console.log(token);
    if (!token) {
      console.error("no token sent to server")
      res.status(401).send({error: "no token sent to server"})
      return 
    }
  
    let decoded
    try {
      decoded = jwt.verify(token, secret);
    } catch(error) {
      console.error(error)
      res.status(403).send({error: "Invalid Token"})
      return
    }
  
    req.user = decoded
    next()
  }
  exports.authorize = authorize