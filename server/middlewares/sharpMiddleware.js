const sharp = require("sharp");

// Load cloudinary methods
const cloudinary = require("../utils/cloudinary");

module.exports = {
  resizeProfileCover: async (req, file, next) => {
    const id = req.user.id;
    if (!file) {
      return res.status(404).json({ message: "Please provide a  photo " });
    } else {
      const path = `${process.env.APP_NAME}/users/${id}/profile_cover/`;
      const data = await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("webp")
        .webp({ quality: 90 })
        .toBuffer();

      const imageDetails = await cloudinary.uploadToCloudinary(data, path);
      req.body.cover = imageDetails.url;
      next();
    }
  },
  resizeProfilePhoto: async (req, file, next) => {
    const id = req.user.id;
    if (!file) {
      return res.status(404).json({ message: "Please provide a  photo " });
    } else {
      const path = `${process.env.APP_NAME}/users/${id}/profile_photos/`;
      const data = await sharp(req.file.buffer)
        .resize(500, 500)
        .toFormat("webp")
        .webp({ quality: 90 })
        .toBuffer();

      const imageDetails = await cloudinary.uploadToCloudinary(data, path);
      req.body.photo = imageDetails.url;
      next();
    }
  },
};
