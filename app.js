import dotenv from 'dotenv';
import express from 'express';
import authRoute from './routes/auth_route.js'
import bookRoute from './routes/book_route.js'
import bodyParser from 'body-parser';
import { handleError } from './middlewares/error_handler_middleware.js'

dotenv.config();

const app = express();
const port = process.env.PORT;
const apiPrefix = "/api/"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(apiPrefix, authRoute);
app.use(apiPrefix, bookRoute);

app.use(handleError);

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});