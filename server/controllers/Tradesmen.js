const TrademanSchema = require('../models/Tradesmen');
const cloudinary = require('../cloudinary.config')

const createTrademanProfile = async (req, res) => {
  const { mainTitle, info, location, } = req.body;

  const imageUrls = [];

  try {
    // Upload images to Cloudinary in parallel
    await Promise.all(
      Array.from({ length: 3 }, (_, index) => `image${index + 1}`).map(async (fieldName) => {
        if (req.files[fieldName]) {
          const image = req.files[fieldName][0];
          const result = await cloudinary.uploader.upload(image.path, {
            folder: 'Assets',
          });
          imageUrls.push({ [fieldName]: { public_id: result.public_id, url: result.secure_url } });
        }
      })
    );

    const newContent = new TrademanSchema({
     mainTitle, info, location, ...Object.assign({}, ...imageUrls),
    });

    const savedContent = await newContent.save();

    const responseObj = {
      ...savedContent._doc,
      ...Object.assign({}, ...imageUrls),
    };

    res.status(201).json(responseObj);
  } catch (error) {
    console.error('Error saving product:', error);
    res.status(500).json({ message: 'Error saving product' });
  }
};


// Function to update an existing trademan
const updateTrademanProfile = async (req, res, next) => {
  const { mainTitle, info, location } = req.body;

  const updateFields = {mainTitle, info, location};

  try {
    const existingContent = await TrademanSchema.findById(req.params.id);

    if (!existingContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    // Keep track of existing public_ids to delete them later
    const existingPublicIds = [];

    for (let i = 1; i <= 15; i++) {
      const fieldName = `image${i}`;

      if (req.files[fieldName]) {
        // Delete previous image if it exists
        if (existingContent[fieldName] && existingContent[fieldName].public_id) {
          existingPublicIds.push(existingContent[fieldName].public_id);
        }

        const image = req.files[fieldName][0];
        const result = await cloudinary.uploader.upload(image.path, {
          folder: 'Assets',
        });

        updateFields[fieldName] = { public_id: result.public_id, url: result.secure_url };
      }
    }

    // Delete previous images in Cloudinary
    for (const publicId of existingPublicIds) {
      await cloudinary.uploader.destroy(publicId.replace(cloudinary.config().cloud_name + '/', ''));
    }

    const updatedContent = await 
    TrademanSchema.findByIdAndUpdate(
      req.params.id,
      { $set: updateFields },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(500).json({ message: 'Failed to update content' });
    }

    res.status(200).json(updatedContent);
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product' });
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



module.exports = {
  createTrademanProfile,
  updateTrademanProfile,
  getAllTradesmenProfiles,
  getTrademanProfileById,
  deleteTrademanProfile
};