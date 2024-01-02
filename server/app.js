const express = require('express');
const app = express();
const connectDB = require('./db/connect');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const cors = require('cors');
const auth = require('./routes/auth')
const tradesmanRoute = require('./routes/TradesMan');
const chatRoute = require('./routes/Chat');
const TrademanSchema = require('./models/Tradesmen');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const path = require('path');
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const Message = require('./models/Message');

cloudinary.config({
  cloud_name: 'njnjj2fdiawje',
  api_key: '186277285738544',
  api_secret: 'IKoKc-pKt9XF8dNdJbE3TeA9WyM',
});

const storage = multer.diskStorage({
  // destination: ('./public/uploads/'),
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 10 * 1024 * 1024, // Increase field size limit to 10MB (adjust as needed)
  }
});

const port = process.env.PORT || 5000;
require('dotenv').config({ path: '.env' })

// Middleware
app.use(cors());
app.use(express.json());

// Routes

app.get('/', (req, res) => {
  console.log('hello bot');
  res.json({req})
});

app.get('/api/v1/messages', async (req, res) => {
 try {
  const messages = await Message.find();
  res.status(200).json(messages);
  console.log(messages, 'messages');
 } catch (error) {
  console.log(error, 'error fetching messages' );
 }
})

io.on('connection', (socket) => {
  // console.log('a user connected', socket.rooms);

  // Listen for sendMessage event
  socket.on('sendMessage', async (data) => {
    // Save the message to the database
    const message = new Message(data);
    await message.save();

    // Broadcast the message to all connected clients
    io.emit('message', data);
  });

  // Disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});
app.use('/api/v1/', auth);
app.use('/api/v1/tradesman', tradesmanRoute);
app.use('/api/v1/chat', chatRoute);


app.use(errorHandler)
app.use(notFound)

const start = async () => {
  try {
    await connectDB(process.env.URI);
    server.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start(); 

// app.post('/api/v1/tradesman', upload.single('image'), async (req, res, next) => {
//   const { occupation, username, email, ratings, hourlyRate, description, location,lat, lng, phoneNumber } = req.body;
//   // console.log(req.body, 'req.body');
//     const parsedLat = Number(lat?.[1]);
// const parsedLng = Number(lng?.[1]);
// // console.log(parsedLat, parsedLng, 'parsedLat and parsedLng');

//   let mainImageURL;

//   // Handle image updates
//   if (req.file) {
//     const mainImage = req.file;
//     const mainImageResult = await cloudinary.uploader.upload(mainImage.path, {
//       folder: 'Assets',
//     });
//     mainImageURL = mainImageResult.secure_url;
//   }

//   const newContent = new TrademanSchema({
//     occupation, username, email, ratings, hourlyRate, description, location, image: mainImageURL, lat: parsedLat, lng: parsedLng, phoneNumber
//   });

//   try {
//     const savedContent = await newContent.save();

//     const responseObj = {
//       ...savedContent._doc,
//     };

//     if (mainImageURL) {
//       responseObj.mainImage = mainImageURL;
//     }

//     res.status(201).json(responseObj);
//   } catch (error) {
//     console.error('Error saving product:', error);
//     res.status(500).json({ message: 'Error saving product' });
//   }

// });