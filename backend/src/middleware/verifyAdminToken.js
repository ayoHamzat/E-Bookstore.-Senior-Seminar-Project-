const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY || "4356bc06b8ff35971988941d36784c271a3f94a8e226dddc17669b01bfa3356edde5f19f8bd1af999912ebe7710476c0f940650b9c1c16a2887191a14d0b9d18"

const verifyAdminToken =  (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    console.log(token)

    if (!token) {
        return res.status(401).json({ message: 'Access Denied. No token provided' });
    }
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Invalid credientials' });
        }
        req.user = user;
        next();
    })

}

module.exports = verifyAdminToken;