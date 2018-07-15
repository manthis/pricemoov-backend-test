
import mongoose from 'mongoose';
import config from './config/config';

mongoose.Promise = global.Promise;

class Database {
    static async connect() {
        const options = {
            useNewUrlParser: true,
            keepAlive: true,
            autoIndex: false, // Don't build indexes
            reconnectTries: Number.MAX_VALUE, // Never stop trying to reconnect
            reconnectInterval: 500, // Reconnect every 500ms
            poolSize: 10, // Maintain up to 10 socket connections
            bufferMaxEntries: 0, // If not connected, return errors immediately rather than waiting for reconnect
            connectTimeoutMS: 10000, // Give up initial connection after 10 seconds
            socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
        };
        await mongoose.connect(config.MONGO_URL, options).then(
            () => { console.log('Database is connected') },
            err => { console.log('Can not connect to the database' + err) }
        );        
    }
};

export default Database;