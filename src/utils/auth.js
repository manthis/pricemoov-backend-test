import basicAuth from 'basic-auth';
import User from '../models/user';

let auth = async (req, res, next) => {
    let user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
        res.sendStatus(401);
        return;
    }
    await User.findOne({ login: user.name }, (err, foundUser) => {
        if (err || !foundUser) {
            if (err) console.log(err);
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.sendStatus(401);
            return;
        }
        if (user.pass === foundUser.password) {
            next();
        }
        else {
            res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
            res.sendStatus(401);
            return;
        }
    });
}

export default auth;