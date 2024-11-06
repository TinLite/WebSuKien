import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UserModel from '../../models/UserModel';

/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 * @returns 
 */
async function postLogin(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({
            message: "Missing email or password",
            code: 'LOGIN_MISSING_EMAIL_OR_PASSWORD'
        });
    }
    const [data] = await UserModel.findOneByEmail(email);
    if (data.length === 0) {
        return res.status(400).send({
            message: "Invalid email or password",
            code: 'LOGIN_INVALID_EMAIL_OR_PASSWORD'
        });
    }
    const user = data[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).send({
            message: "Invalid email or password",
            code: 'LOGIN_INVALID_EMAIL_OR_PASSWORD'
        });
    }
    req.session.user = {
        id: user.id,
    }
    return res.send("Login successful");
};

export default {
    postLogin
};