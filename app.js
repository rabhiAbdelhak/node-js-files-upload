require('dotenv').config();
require('express-async-errors');
const productRouter = require('./routes/productRoutes');
const {uploadImage, uploadImageCloud} = require('./controllers/uploadsController');
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const cloudinary = require('cloudinary').v2
cloudinary.config(
  {
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
  }
);
// database
const connectDB = require('./db/connect');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.use(express.static('./public'))

app.use(express.json());
app.use(fileUpload({useTempFiles: true}));


app.get('/', (req, res) => {
  res.send('<h1>File Upload Starter</h1>');
});

//products route
app.use('/products', productRouter);
app.post('/products/uploads' , uploadImageCloud);

// middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URI);

    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
