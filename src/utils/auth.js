import basicAuth from 'basic-auth';
import bcrypt from 'bcryptjs';
import User from '../models/user';

let auth = async (req, res, next) => {
    let user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }
    await User.findOne({ login: user.name }, (err, dbUser) => {
        if (err || !dbUser) {
            if (err) console.log(err);
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.sendStatus(401);
            return;
        }
        bcrypt.compare(user.pass, dbUser.password, (err, success) => {
            if (err || !success) {
                res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
                res.sendStatus(401);
                return;
            }
            // If success
            next();
        });
    });
}

export default auth;