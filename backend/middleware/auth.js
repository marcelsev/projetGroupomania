const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        const userId = decodedToken.userId;
        const admin = decodedToken.admin;
        console.log(userId, 'user data')
        console.log(admin, 'admin data')
        req.auth = {
            userId: userId,
            admin: admin
        };
        console.log(req.body)

        if (req.body.userId && req.body.userId === admin || userId) {
            next();

        } else {
            throw 'invalid action';

        }



    }
    catch (error) {
        res.status(400).json((error));
    }
};