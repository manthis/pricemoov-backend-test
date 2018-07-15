
import User from '../models/user';

class UserController {

    static async getAll(req, res) {
        try {
            await User.find().sort('-dateAdded').exec((err, users) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ users });
            });
        }
        catch(err) {
            res.send(err);
        }
    }

    static async getUser(req, res) {
        try {
            User.findById(req.params.id, (err, user) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ user });
            });
        }
        catch (err) {
            res.send(err);
        }
    }

    static async addUser(req, res) {
        try {    
            const user = new User(req.body);    
            user.save((err, saved) => {
                if (err) {
                    res.status(500).send(err);
                }
                res.json({ user: saved });
            });
        }
        catch (err) {
            res.send(err);
        }
    }

    static async updateUser(req, res) {
        try {
            User.findByIdAndUpdate(
                req.params.id, 
                req.body, // We can directly pass the request body 
                {new: true}, // Will pass the updated user and not the old one
                (err, updated_user) => {
                    if (err) {
                        res.status(500).send(err);
                    }
                    res.json({ updated_user });
                }
            );
        }
        catch (err) {
            res.send(err);
        }
    }

    static async deleteUser(req, res) {
        try {
            User.findByIdAndRemove(req.params.id, (err, deleted_user) => {
                if (err) {
                    res.status(500).send(err);
                }                
                res.json({ deleted_user });                
            });
        }
        catch (err) {
            res.send(err);
        }
    }
};

export default UserController;