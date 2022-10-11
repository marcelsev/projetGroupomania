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
            
        };
        if (admin) {
            console.log('admin?');
            next();
        }

        if (req.body.userId && req.body.userId !== userId || admin ) {
            throw 'invalid';

        } else {
            next();
        }

    }
    catch (error) {
        res.status(400).json((error));
    }
};