import { ObjectId } from "mongodb";
import { connectDB } from "../db/db_connection.js";

class BookService {
    bookCollection = 'books';
    commentCollection = 'comments';
    userCollection = 'users';

    async addNewBook(user_id, params) {
        const db = await connectDB();
        const result = await db.collection(this.bookCollection).insertOne(
            {
                ...params,
                user_id: new ObjectId(user_id)
            }
        )

        return result;
    }

    async getUserBooks(user_id) {
        const db = await connectDB();
        const result = await db.collection(this.bookCollection)
            .aggregate([
                {
                    $match: { user_id: new ObjectId(user_id) }
                },
                {
                    $lookup: {
                        from: this.commentCollection,
                        localField: '_id',
                        foreignField: 'book_id',
                        as: this.commentCollection
                    }
                },
                {
                    $lookup: {
                        from: this.userCollection,
                        localField: 'comments.user_id',
                        foreignField: '_id',
                        as: 'user_data'
                    }
                },
                {
                    $project: {
                        title: 1,
                        genre: 1,
                        comments: {
                            $map: {
                                input: "$comments",
                                as: "com",
                                in: {
                                    _id: "$$com._id",
                                    comment: "$$com.comment",
                                    replies: "$$com.replies",
                                    user: {
                                        $arrayElemAt: [
                                            {
                                                $map: {
                                                    input: {
                                                        $filter: {
                                                            input: '$user_data',
                                                            as: 'user',
                                                            cond: {
                                                                $eq: [
                                                                    "$$user._id",
                                                                    "$$com.user_id"
                                                                ]
                                                            }
                                                        }
                                                    },
                                                    as: 'user',
                                                    in: {
                                                        _id: "$$user._id",
                                                        name: "$$user.name"
                                                    }
                                                }
                                            },
                                            0
                                        ]
                                    }
                                }
                            }
                        }
                    }
                }
            ]).toArray();

        return result;
    }

    async addCommentToBook(user_id, params) {
        const db = await connectDB();
        const result = db.collection(this.commentCollection).insertOne({
            ...params,
            book_id: new ObjectId(params.book_id),
            user_id: user_id
        });

        return result;
    }

    async deleteCommentOnBook(user_id, comment_id) {
        const db = await connectDB();
        const result = db.collection(this.commentCollection).deleteOne({
            _id: new ObjectId(comment_id), 
            user_id: user_id
        });

        return result;
    }

    async addReplyToComment(user_id, comment_id, reply) {
        const db = await connectDB();

        const replyObj = {
            _id: new ObjectId(),
            text: reply,
            user_id: user_id
        };

        const result = await db.collection(this.commentCollection).updateOne(
            {
                _id: new ObjectId(comment_id)
            },
            {
                $push: {
                    replies: replyObj
                }
            }
        )

        return result;
    }

    async deleteReplyOnComment(user_id, comment_id, reply_id) {
        const db = await connectDB();
        const result = await db.collection(this.commentCollection).updateOne(
            {
                _id: new ObjectId(comment_id),
            },
            {
                $pull: {
                    replies: {
                        _id: new ObjectId(reply_id)
                    }
                }
            }
        );

        return result;
    }
}

export default new BookService();