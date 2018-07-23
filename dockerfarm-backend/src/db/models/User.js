import mongoose from 'mongoose';
import crypto from 'crypto';
import config from 'config';
const { Schema } = mongoose;

const User = new Schema({
    email: String,
    password: String,
    username: String,
    createdAt: {
        type: Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now    
    },
    social: {
        google: {
            id: String,
            accessToken: String    
        },
        facebook: {
            id: String,
            accessToken: String 
        }
    }
});

const encryptPassword = password => {
    return crypto.createHmac('sha256', config.hashSecret).update(password).digest('hex');
};

User.statics.localSignup = function({
    email, 
    password,
    username
}) {
    let user = new this({
        email,
        password: encryptPassword(password),
        username
    });
    
    return user.save();
};

User.statics.findByEmail = function(email) {
    return this.findOne({email}).exec();
};

User.methods.verifyPassword = function(password) {
    return this.password == encryptPassword(password);
};


export default mongoose.model('User', User);