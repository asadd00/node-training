import { connectDB } from '../db/db_connection.js'
import { ObjectId } from 'mongodb'

class UserService {
    userCollection = 'users';
    tokenCollection = 'user_tokens';

    async login(username, password) {
        const db = await connectDB();
        const result = await db.collection(this.userCollection).findOne(
                {username: username},
                // { projection: {password: 0} }
            );
        return result
    }

    async registerUser(params) {
        const db = await connectDB();
        const result = await db.collection(this.userCollection).insertOne(
                params
            );
            
        const inserted = { ...params, _id: result.insertedId };
        return inserted;
    }

    async getUserById(user_id) {
        const db = await connectDB();
        const result = await db.collection(this.userCollection).findOne(
            {_id: new ObjectId(user_id)}, 
            { projection: {password: 0} }
        );
        return result
    }

    async getUserByUsername(username) {
        const db = await connectDB();
        const result = await db.collection(this.userCollection).findOne(
            { username: username}, 
            { projection: {username: 1} }
        );
        return result
    }

    async updateAccessToken(user_id, access_token) {
        const document = {user_id: user_id, access_token: access_token};
        const db = await connectDB();

        const result = await db.collection(this.tokenCollection).updateOne(
            {user_id: user_id},
            {$set: document},
            {upsert: true}
        );
        return result;
    }

    async getAccessTokenInfo(access_token) {
        const db = await connectDB();

        const result = await db.collection(this.tokenCollection).findOne(
            {access_token: access_token}
        );

        return result;
    }
}

export default new UserService();