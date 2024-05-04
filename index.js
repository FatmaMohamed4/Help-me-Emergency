import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import app from './app.js';
import connectDB from './connectDB.js';
import dotenv from 'dotenv';

app.set('view engine', 'ejs');
app.use(cookieParser());
app.use(morgan('dev'));
dotenv.config();

const PORT =4121;


// Start the server 
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});