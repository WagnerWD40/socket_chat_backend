import jwt from 'jsonwebtoken';

import config from '../config/auth';

const generateToken = (payload) => {
    return jwt.sign(payload, config.privateKey, config.authOptions);
};

export {
    generateToken
};