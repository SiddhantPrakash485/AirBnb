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
      return res.status(404).json({ message: `User not found` });
    }
    return res.status(201).json(listing);
  } catch (error) {
    console.error(error);
    console.error(error.message);
    console.error(error.stack);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getListing = async (req, res) => {
  try {
    let listing = await Listing.find().sort({ createdAt: -1 });
    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json({ message: `getListing error ${error}` });
  }
};

export const findListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findById(id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not Found" });
    }
    return res.status(200).json(listing);
  } catch (error) {
    return res.status(500).json(`findlisting error ${error}`);
  }
};

export const updateListing = async (req, res) => {
  try {
    let image1;
    let image2;
    let image3;
    let { id } = req.params;
    let { title, description, rent, city, landmark, category } = req.body;
    if (req.files.image1) {
      image1 = await uploadOnCloudinary(req.files.image1[0].path);
    }
    if (req.files.image2) {
      image2 = await uploadOnCloudinary(req.files.image2[0].path);
    }
    if (req.files.image3) {
      image3 = await uploadOnCloudinary(req.files.image3[0].path);
    }

    let listing = await Listing.findByIdAndUpdate(
      id,
      {
        title,
        description,
        rent,
        city,
        landmark,
        category,
        image1,
        image2,
        image3,
      },
      { returnDocument: "after" },
    );

    return res.status(201).json(listing);
  } catch (error) {
    return res.status(400).json({ message: `updatelisting error ${error}` });
  }
};

export const deleteListing = async (req, res) => {
  try {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);
    let user = await User.findByIdAndUpdate(
      listing.host,
      {
        $pull: { listing: listing._id },
      },
      { returnDocument: "after" },
    );
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    return res.status(201).json({mesage:"Deleted Successfully"})
  } catch (error) {
    return res.status(400).json({ message: `Deletelisting error ${error}` });
  }
};
