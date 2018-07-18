
import basicAuth from 'basic-auth';
import User from '../models/user';

const isAdmin = (req, res, next) => {
    const user = basicAuth(req);
    if (!user || !user.name || !user.pass) {
        res.status(500).json({ error: 'No User ID found in request!' });
        return;
    }
    User.findOne({ login: user.name }, (err, dbUser) => {
        if (err) {
            res.status(500).json({ error: err });
            return false;
        }
        if (dbUser.is_admin) {
            console.log(user.name + ' is admin. Authorizing...');
            next();
            return;
        }
        console.log(user.name + ' is NOT an admin. ACCESS FORBIDDEN!');
        res.status(403).send('Forbidden!');
        return false;
    });
};

export default isAdmin;