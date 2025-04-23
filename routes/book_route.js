import express from 'express';
import bookController from '../controllers/BookController.js';
import { validateToken } from '../middlewares/auth_validation_middleware.js';
import { addCommentToBookSchema, addNewBookSchema, deleteCommentOnBookSchema} from '../validations/book_validation.js';
import { validateRequest } from '../validations/validation_middleware.js';

const router = express.Router();

router.post('/book/add-new-book', validateToken, validateRequest(addNewBookSchema), bookController.addNewBook);
router.get('/book/get-user-books', validateToken, bookController.getUserBooks);
router.post('/book/add-book-comment', validateToken, validateRequest(addCommentToBookSchema), bookController.addCommentToBook);
router.delete('/book/delete-comment', validateToken, validateRequest(deleteCommentOnBookSchema), bookController.deleteCommentOnBook);

export default router;