import bookService from "../services/book_service.js";
import { createError, respond } from "../utils/methods.js";

class BookController {
    async addNewBook(req, res, next) {
        try {
            const result = await bookService.addNewBook(req.user._id, req.body);
            if(result){
                respond(res, 200, true, 'New book added to your collection');
            }
            else {
                throw createError(400, result)
            }
        } catch (error) {
            next(error);
        }
    }

    async getUserBooks(req, res, next) {
        try {
            const result = await bookService.getUserBooks(req.user._id);
            if(result){
                respond(res, 200, true, 'user books', result);
            }
            else {
                throw createError(400, result)
            }
        } catch (error) {
            next(error);
        }
    }

    async addCommentToBook(req, res, next) {
        try {
            const result = await bookService.addCommentToBook(req.user._id, req.body);
            if(result.insertedId){
                respond(res, 200, true, 'Comment added to the book');
            }
            else {
                throw createError(400, 'Error unknown')
            }
        } catch (error) {
            next(error);
        }
    }

    async deleteCommentOnBook(req, res, next) {
        try {
            const result = await bookService.deleteCommentOnBook(req.user._id, req.body.comment_id);
            if(result.deletedCount){
                respond(res, 200, true, 'Comment deleted');
            }
            else {
                throw createError(400, 'Error unknown')
            }
        } catch (error) {
            next(error);
        }
    }

    async addReplyToComment(req, res, next) {
        try {
            const {comment_id, reply} = req.body;
            const result = await bookService.addReplyToComment(req.user._id, comment_id, reply)
            respond(res, 200, "Replied to the comment", result);
        } catch (error) {
            next(error);
        }
    }

    async deleteReplyOnComment(req, res, next) {
        try {
            const {comment_id, reply_id} = req.body;
            const result = await bookService.deleteReplyOnComment(req.user._id, comment_id, reply_id)
            if(result.modifiedCount){
                respond(res, 200, "Reply deleted");
            }
            else {
                throw createError(400, 'Error unknown', result)
            }
        } catch (error) {
            next(error);
        }
    }
}

export default new BookController();