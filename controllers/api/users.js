const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = { signup };

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = createJWT(user);
        res.json({ token });
    } catch (err) {
        // Duplicate email?
        res.status(400).json(err);
    }
}

/*-- HELPER FUNCTIONS --*/

function createJWT(user) {
    return jwt.sign({ user }, JWT_SECRET, { expiresIn: '24h' });
}
