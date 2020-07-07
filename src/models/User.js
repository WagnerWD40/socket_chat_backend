import Mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const SALT_WORK_FACTOR = 10;

const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: [true, 'Email is required.'],
        unique: true,
        match: [emailRegex, 'Please fill with a valid email address.'],
    },
}, {
    timestamps: { createdAt: true, updatedAt: true },
    toJSON: {
        virtuals: true,
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        }
    },
    versionKey: false,
});

userSchema.pre('save', async function(next) {
    let user = this;

    console.log(this);
    if (!user.isModified('password')) {
        return next();
    };

    //generate a salt
    try {
        const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
        this.password = await bcrypt.hash(this.password, salt);

        return next();
    } catch (err) {
        return next(err);
    };
});

userSchema.methods.createNewPassword = async function(password) {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
};

userSchema.methods.validatePassword = async function(data) {
    return bcrypt.compare(data, this.password);
};

const User = Mongoose.model('User', userSchema);

export default User;