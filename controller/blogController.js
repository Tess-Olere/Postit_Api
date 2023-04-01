const Stories = require("../models/stories");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");

//gets all stories no user
const getAllStories = async (req, res) => {
  try {
    const story = await Stories.find();
    res.status(200).json({ noOfStories: story.length, story });
  } catch (error) {
    res.json({ error });
  }
};

const singleStory = async (req, res) => {
  const {
    params: { blogId },
  } = req;
  try {
    const story = await Stories.findById({ _id: blogId });
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: `Story with ${blogId} not found` });
    }
    res.status(201).json({ success: true, story });
  } catch (error) {
    res.json({ error });
  }
};

// get allstories for user

const allStories = async (req, res) => {
  try {
    const story = await Stories.find({ createdBy: req.user.userId });
    res.status(200).json({ noOfStories: story.length, story });
  } catch (error) {
    res.json({ error });
  }
};

// const getStory = async (req, res) => {

//     try {
//         const story = await Stories.find()
//         if (!story) {
//             return res.status(404).json({success: false, message: `Story with ${blogId} not found`})
//         }
//         res.status(201).json({success: true, story})
//     } catch (error) {
//         res.json({error})
//     }
// }

// for user
const getaSingleStory = async (req, res) => {
  const {
    user: { userId },
    params: { blogId },
  } = req;
  try {
    const story = await Stories.findOne({ createdBy: userId, _id: blogId });
    if (!story) {
      return res
        .status(404)
        .json({ success: false, message: `Story with ${blogId} not found` });
    }
    res.status(201).json({ success: true, story });
  } catch (error) {
    res.json({ error });
  }
};

const createStory = async (req, res) => {
  // const {title, description, tag, image,createdBy} = req.body
  req.body.createdBy = req.user.userId;
  try {
    const result = await cloudinary.uploader.upload(
      req.files.image.tempFilePath,
      { use_filename: true, folder: "storyImages" }
    );
    fs.unlinkSync(req.files.image.tempFilePath);
    req.body.image = result.secure_url;
    const story = await Stories.create({ ...req.body });
    res.status(200).json({ success: true, story });
  } catch (error) {
    res.json({ error });
  }
};

const updateStory = async (req, res) => {
  const {
    user: { userId },
    params: { blogId },
  } = req;

  try {
    // if (req.files.image) {
      const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        { use_filename: true, folder: "storyImages" }
      );

      fs.unlinkSync(req.files.image.tempFilePath);
    (req.body.image = result.secure_url);
    // }

    const story = await Stories.findOneAndUpdate(
      { createdBy: userId, _id: blogId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({ success: true, story });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

const deleteStory = async (req, res) => {
  const {
    user: { userId },
    params: { blogId },
  } = req;
  try {
    const story = await Stories.findOneAndDelete({
      createdBy: userId,
      _id: blogId,
    });
    res.status(200).json({
      success: true,
      msg: "Deleted",
      story,
    });
  } catch (error) {
    console.log(error);
    res.json({ error });
  }
};

module.exports = {
  createStory,
  updateStory,
  deleteStory,
  allStories,
  getAllStories,
  getaSingleStory,
  singleStory,
};
