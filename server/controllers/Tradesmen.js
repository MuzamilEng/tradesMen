const TrademanSchema = require('../models/Tradesmen');
const cloudinary = require('../cloudinary.config')
// Function to update an existing trademan
const createTrademanProfile = async (req, res) => {
  try {
    const { occupation, username, email, ratings, hourlyRate, description, location, lat, lng, phoneNumber } = req.body;
    const parsedLat = Number(lat?.[1]);
    const parsedLng = Number(lng?.[1]);

    let mainImageURL;

    // Handle image updates
    if (req.file) {
      const mainImage = req.file;
      const mainImageResult = await cloudinary.uploader.upload(mainImage.path, {
        folder: 'Assets',
      });
      mainImageURL = mainImageResult.secure_url;
    }

    const newContent = new TrademanSchema({
      occupation, username, email, ratings, hourlyRate, description, location, image: mainImageURL, lat: parsedLat, lng: parsedLng, phoneNumber
    });

    const savedContent = await newContent.save();

    const responseObj = {
      ...savedContent._doc,
    };

    if (mainImageURL) {
      responseObj.mainImage = mainImageURL;
    }

    res.status(201).json(responseObj);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Error saving product' });
  }
};

const updateTrademanProfile = async (req, res, next) => {
  console.log(req.body, "req body");
  const {
    occupation, username, email, ratings, hourlyRate, description, location, lat, lng, phoneNumber, image, gigImage1, gigImage2, gigImage3, video, docs1, docs2
  } = req.body;

  const updateFields = {
    occupation, username, email, ratings, hourlyRate, description, location, lat, lng, phoneNumber, image, gigImage1, gigImage2, gigImage3, video, docs1, docs2
  };

  try {
    const existingContent = await TrademanSchema.findById(req.params.id);

    if (!existingContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Keep track of existing public_ids to delete them later
    const existingPublicIds = [];

    // Function to handle file upload and update fields
    const handleFileUpload = async (fieldName) => {
      if (req.files[fieldName]) {
        // Delete previous file if it exists
        if (existingContent[fieldName]) {
          existingPublicIds.push(existingContent[fieldName]);
        }

        const file = req.files[fieldName][0];
        const result = await cloudinary.uploader.upload(file.path, {
          folder: 'Assets',
        });

        updateFields[fieldName] = result.secure_url;
      }
    };

    // Handling file uploads for multiple fields
    handleFileUpload('image');
    handleFileUpload('gigImage1');
    handleFileUpload('gigImage2');
    handleFileUpload('gigImage3');
    handleFileUpload('video');
    handleFileUpload('docs1');
    handleFileUpload('docs2');

    // Delete previous files in Cloudinary
    for (const publicId of existingPublicIds) {
      await cloudinary.uploader.destroy(publicId.replace(cloudinary.config().cloud_name + '/', ''));
    }

    const updatedContent = await TrademanSchema.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(500).json({ message: 'Failed to update content' });
    }

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Error updating profile' });
  }
};



// Get all trademans
const getAllTradesmenProfiles = async (req, res) => {
  try {
    const profiles = await TrademanSchema.find();
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get a single trademan by ID
const getTrademanProfileById = async (req, res) => {
  try {
    const profile = await TrademanSchema.findById(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getTrademanProfileByEmail = async (req, res) => {
  const {email} = req.query;
  console.log(req.query, 'req.query');
  try {
    const profile = await TrademanSchema.findOne({email: email});
    if (!profile) {
      return res.status(404).json({ error: 'profile not found' });
    }
    res.status(200).json(profile);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Delete a trademan by ID
const deleteTrademanProfile = async (req, res) => {
  try {
    const profile = await TrademanSchema.findByIdAndRemove(req.params.id);
    if (!profile) {
      return res.status(404).json({ error: 'profile not found' });
    }
    res.status(200).json(profile);
    // console.log("Successfully deleted");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const allTradesMen = async (req, res) => {
  console.log(req.query, 'query');
  const keyword = req.query.search ? 
  {
    $or : [
      { username: {$regex : req.query.search, $options: "i"}},
      { email: {$regex : req.query.search, $options: "i"}},
    ]
  } : {};

  try {
    const profiles = await TrademanSchema.find(keyword).find({ _id: { $ne: req.user._id } });
    res.status(200).json(profiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const advancedSearch = async (req, res) => {
  const { price, availability, occupation, distanceRadius } = req.query;
  const parseMinPrice = parseInt(minPrice);
  const parseMaxPrice = parseInt(maxPrice);
  const parseBedrooms = parseInt(bedrooms);
  const parseBathrooms = parseInt(bathrooms);
  console.log(req.query, 'query');

  // Define an array to store the conditions for the $and operator
  const andConditions = [];

  // Check and add conditions based on the provided query parameters
  if (minPrice) {
    andConditions.push({ pricePerWeek: { $gte: parseMinPrice } });
  }
  if (maxPrice) {
    andConditions.push({ pricePerMonth: { $lte: parseMaxPrice } });
  }
  if (bedrooms) {
    andConditions.push({ bedrooms: parseBedrooms });
  }
  if (bathrooms) {
    andConditions.push({ bathrooms: parseBathrooms });
  }
  if (propertyType) {
    andConditions.push({ propertyType });
  }
  if (location) {
    andConditions.push({ location });
  }

  // Build the final search query
  const searchQuery = andConditions.length > 0 ? { $and: andConditions } : {};

  try {
    const searchResults = await TrademanSchema.find(searchQuery);
    res.status(200).json(searchResults);
  } catch (error) {
    console.error('Error during search:', error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
};
module.exports = {
  createTrademanProfile,
  updateTrademanProfile,
  getAllTradesmenProfiles,
  getTrademanProfileById,
  deleteTrademanProfile,
  getTrademanProfileByEmail,
  allTradesMen
};