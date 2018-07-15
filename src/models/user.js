
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
    firstname: {
        type: 'String',
        required: true,
    },
    lastname: {
        type: 'String',
        required: true,
    },
    login: {
        type: 'String',
        required: true,
        unique: true,
    },
    email: {
        type: 'String',
        required: true,
        unique: true,
    },
    jobtitle: {
        type: 'String',
        required: true,
    },
    password: {
        type: 'String',
        required: true,
    },
    dateAdded: { 
        type: 'Date', 
        default: Date.now, 
        required: true 
    },
});

let User = mongoose.model('User', UserSchema);

export default User;
