import mongoose from 'mongoose';

export async function initMongoConnection() {
    try {
        const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
        process.env;

        const uri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

        await mongoose.connect(uri);
        console.log('Mongo connection successfully established!');
    } catch (error) {
        console.error('Mongo connection error:', error);
        process.exit(1);
    }
}
