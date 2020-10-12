const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

module.exports = function (req, res, next) {
    let token = req.get('Authorization') || req.query.token || req.body.token;
    if (token && token.includes('Bearer')) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, JWT_SECRET, function (err, decoded) {
            if (err) {
                next(err);
            } else {
                req.user = decoded.user;
                next();
            }
        });
    } else {
        next();
    }
};
