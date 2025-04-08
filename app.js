import dotenv from 'dotenv';
import express from 'express';
import authRoute from './routes/auth_route.js'
import bodyParser from 'body-parser';

dotenv.config();

const app = express();
const port = process.env.PORT;
const apiPrefix = "/api/"

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use(apiPrefix, authRoute);

app.get('/', (req, res) => {
    res.send('Hello, World!');
  });

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});