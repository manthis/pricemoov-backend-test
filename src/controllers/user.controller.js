
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import config from '../config/config';

class UserController {

    static getAll(req, res) {
        try {
            User.find().sort('-dateAdded').exec((err, users) => {
                if (err) {
                    res.status(500).json({ error: err });
                }
                res.json({ users });
            });
        }
        catch(err) {
            console.log(err);
            res.json({ error: err });
        }
    }

    static getUser(req, res) {
        try {
            User.findById(req.params.id, (err, user) => {
                if (err) {
                    res.status(500).json({ error: err });
                }
                res.json({ user });
            });
        }
        catch (err) {
            res.json({ error: err });
        }
    }

    static addUser(req, res) {
        try {    
            const user = new User(req.body);   
            bcrypt.hash(user.password, 10, function(err, hash) {
                if (err) {
                    throw err;
                }
                // We replace the user password with its hash and save it
                user.password = hash;
                user.save((err, saved) => {
                    if (err) {
                        res.status(500).json({ error: err });
                    }
                    res.json({ user: saved });
                });
            });   
        }
        catch (err) {
            res.json({ error: err });
        }
    }

    static updateUser(req, res) {
        try {
            User.findByIdAndUpdate(
                req.params.id, 
                req.body, // We can directly pass the request body 
                {new: true}, // Will pass the updated user to the callback and not the old one (before update)
                (err, updated_user) => {
                    if (err) {
                        res.status(500).json({ error: err });
                    }
                    res.json({ updated_user });
                }
            );
        }
        catch (err) {
            res.json({ error: err });
        }
    }

    static deleteUser(req, res) {
        try {
            User.findByIdAndRemove(req.params.id, (err, deleted_user) => {
                if (err) {
                    res.status(500).json({ error: err });
                }                
                res.json({ deleted_user });                
            });
        }
        catch (err) {
            res.json({ error: err });
        }
    }

    static generateToken(req, res) {
        try {
            User.findById(req.params.id, (err, user) => {
                if (err) {
                    res.status(500).json({ error: err });
                }
                let jwtToken = jwt.sign(
                    {id: user._id, firstname: user.firstname, lastname: user.lastname}, 
                    config.JWT_SECRET,
                    { expiresIn: '1h' }
                );
                res.json({ token: jwtToken });
            });
        }
        catch (err) {
            res.json({ error: err });
        }
    }
};

export default UserController;