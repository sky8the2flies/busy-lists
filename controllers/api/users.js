const User = require('../../models/user');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET;

module.exports = {
    signup,
    login,
};

async function signup(req, res) {
    const user = new User(req.body);
    try {
        await user.save();
        const token = createJWT(user);
        return res.status(201).json({ token });
    } catch (err) {
        // Duplicate email?
        console.log(err);
        return res.status(400).json(err);
    }
}

async function login(req, res) {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(401).json({ err: 'Unknown Email' });
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (isMatch) {
                const token = createJWT(user);
                return res.status(200).json({ token });
            } else {
                return res.status(401).json({ err: 'Wrong password' });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(400).json(err);
    }
}

/*-- HELPER FUNCTIONS --*/

function createJWT(user) {
    return jwt.sign({ user }, JWT_SECRET, { expiresIn: '24h' });
}
