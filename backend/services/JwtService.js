import jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || process.env.SECRET || 'keyboard cat';

const sign = (payload, expiresIn = "1h") => {
    return jwt.sign(payload, secret, { expiresIn });
}

const verify = (token, options = {}) => {
    try {
        return jwt.verify(token, secret, options);
    } catch (err) {
        throw new Error('Invalid token');
    }
}

const decode = (token) => {
    return jwt.decode(token);
}

export default {
    sign,
    verify,
    decode,
};
