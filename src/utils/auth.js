import basicAuth from 'basic-auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config/config';

const basic_auth = async (req, res) => {
    const user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        return false;
    }
    await User.findOne({ login: user.name }, (err, dbUser) => {
        if (err || !dbUser) {
            if (err) console.log(err);
            return false;
        }
        bcrypt.compare(user.pass, dbUser.password, (err, success) => {
            if (err || !success) {
                return false;
            }
            return true;
        });
    });
}

const jwt_auth = (req) => {
    try {
        const access_token = req.headers['x-access-token'];
        return jwt.verify(access_token, config.JWT_SECRET);
    }
    catch (err) {
        /* We do not throw the error if jwt isn't specified to be able to use basic auth */
        if (!(err.message === 'jwt must be provided')) {
            console.log('Error during JWT auth: ' + err.message);
            throw err;
        }
    }
}

const auth = (req, res, next) => {
    try {
        // If the client successfully auth with JWT
        if (jwt_auth(req)) {
            next();
            return;
        }
        // If JWT auth is unsuccessful we try with basic auth
        if (basic_auth(req, res)) {
            next();
            return;
        }         
        // Otherwise we request the user to authenticate
        res.set('WWW-Authenticate', 'Authorization Required');
        res.sendStatus(401);        
    }
    catch (err) {
        res.json({ error: err });
    }
}

export default auth;