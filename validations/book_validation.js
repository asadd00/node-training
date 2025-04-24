import Joi from "joi";

export const addNewBookSchema = Joi.object({
    title: Joi.string().min(3).max(100).required(),
    genre: Joi.string().min(3).max(20).required()
});

export const addCommentToBookSchema = Joi.object({
    book_id: Joi.string().required(),
    comment: Joi.string().required()
});

export const deleteCommentOnBookSchema = Joi.object({
    comment_id: Joi.string().required()
});

export const replyOnCommentSchema = Joi.object({
    comment_id: Joi.string().required(),
    reply: Joi.string().required()
});

export const deleteReplyOnCommentSchema = Joi.object({
    comment_id: Joi.string().required(),
    reply_id: Joi.string().required()
});