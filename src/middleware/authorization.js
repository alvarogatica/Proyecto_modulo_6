const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    let {authorization} = req.headers;
    if(!authorization) {
        return res.status(401).json({msg: "No autorizado"});
    }
    try {
        let [type, token] = authorization.split(" ");
        if(type === 'Token' || type === 'Bearer'){
            const openToken = jwt.verify(token, process.env.SECRET);
            req.user = openToken.user;
            next();
        } else {
            return res.status(401).json({msg: "No autorizado"});
        }
    } catch (error) {
        res.json({
            msg: "Token no valido",
            error: error.message
        });
    }
}