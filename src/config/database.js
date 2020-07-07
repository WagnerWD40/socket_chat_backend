import mongoose, { mongo } from 'mongoose';

mongoose.Promise = global.Promise;

const config = {
    uri: 'mongodb://localhost:27017/powered_chat_db',
    options: {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    },
};

mongoose.connection.on('open', () => {
    console.log('Successfully connected to database.');
});

mongoose.connection.on('error', () => {
    throw new Error('Could not connect to MongoDB.');
});

export default {
    connect: () => mongoose.connect(config.uri, config.options),
};