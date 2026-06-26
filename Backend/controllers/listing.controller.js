import uploadOnCloudinary from "../config/cloudinary.js";
import Listing from "../model/listing.model.js";
import User from "../model/user.model.js";

export const addListing = async (req, res) => {
  try {
    let host = req.userId;
    let { title, description, rent, city, landmark, category } = req.body;

    const image1 = await uploadOnCloudinary(req.files.image1[0].path);

    const image2 = await uploadOnCloudinary(req.files.image2[0].path);

    const image3 = await uploadOnCloudinary(req.files.image3[0].path);

    let listing = await Listing.create({
      title,
      description,
      rent,
      city,
      landmark,
      category,
      image1,
      image2,
      image3,
      host,
    });

    let user = await User.findByIdAndUpdate(
      host,
      { $push: { listing: listing._id } },
      { returnDocument: "after" },
    );
    if (!user) {
      res.status(404).json({ message: `User not found` });
    }
    res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    console.error(error.message);
    console.error(error.stack);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
