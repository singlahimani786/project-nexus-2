const jwt = require("jsonwebtoken")
const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers['authorization'].split(" ")[1];
        jwt.verify(token, process.env.JWT_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    message: "authentication failed",
                    success: false,
                })
            }
            else {
                req.body.id = decode.id
                next();
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "authentication failed",
            success: false,
            error
        })
    }
}
module.exports = { authMiddleware }