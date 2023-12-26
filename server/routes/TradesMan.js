const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createTrademanProfile, updateTrademanProfile, deleteTrademanProfile, getAllTradesmenProfiles, getTrademanProfileById } = require('../controllers/Tradesmen');

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

const uploadFiles = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'image2', maxCount: 1 }])



// Get all lettings
router.route('/').get(getAllTradesmenProfiles);

// Create a new letting
// router.route('/').post(uploadFiles, createTrademanProfile);

// Update an existing letting by ID
router.route('/:id').put(uploadFiles, updateTrademanProfile);

// Get a letting by ID and Delete a letting by ID
router.route('/:id').get(getTrademanProfileById).delete(deleteTrademanProfile);
module.exports = router;