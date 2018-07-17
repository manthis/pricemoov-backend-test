import basicAuth from 'basic-auth';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config/config';

const basic_auth = (req, res, callback) => {
    const user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        callback(false);
        return;
    }
    User.findOne({ login: user.name }, (err, dbUser) => {
        if (err || !dbUser) {
            if (err) console.log(err);
            callback(false);
            return;
        }
        callback(bcrypt.compareSync(user.pass, dbUser.password));
    });
}

const jwt_auth = (req) => {
    try {
        const access_token = req.headers['x-access-token'];
        if (!access_token) {
            console.log('No JWT access token provided in headers!');
            return false;
        }
        return jwt.verify(access_token, config.JWT_SECRET);
    }
    catch (err) {
        /* We do not throw the error if jwt isn't specified to be able to use basic auth */
        if (err.message !== 'jwt must be provided') {
            console.log('Error during JWT auth: ' + err.message);
            throw err;
        }
        return false;
    }
}

const auth = (req, res, next) => {
    try {
        // If the client successfully auth with JWT
        if (jwt_auth(req)) {
            console.log('Successfully authenticated using JWT!');
            next();
            return;
        }   
        // If JWT auth is unsuccessful we try with basic auth
        basic_auth(req, res, (is_authenticated) => {
            if (is_authenticated === true) {
                console.log('Successfully authenticated using Basic Auth!');
                next();
            } 
            else {
                // Otherwise we request the user to authenticate
                console.log('Authentication Failure!');
                res.set('WWW-Authenticate', 'Authorization Required');
                res.sendStatus(401);  
            }
        });      
    }
    catch (err) {
        console.log(err.message);
    }
}

export default auth;