const foodModel = require("../models/food.model");
const LikeModel = require("../models/likes.model");
const saveModel = require("../models/save.model");
const CommentModel = require("../models/comment.model");
const storageService = require("../services/storage.service");

const { v4: uuid } = require("uuid");

async function createFood(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Video is required" });
    }

    const fileUploadResult = await storageService.uploadFile(
      req.file.buffer,
      uuid() + "_" + req.file.originalname
    );

    console.log("UPLOAD RESULT:", fileUploadResult);

    const foodItem = await foodModel.create({
      name: req.body.name,
      description: req.body.description,
      video: fileUploadResult.url,
      foodPartnerId: req.foodPartner._id,
      price: req.body.price
    });

    return res.status(201).json({
      message: "Food created",
      food: foodItem,
    });

  } catch (err) {
    console.log("ERROR:", err);

    return res.status(500).json({
      message: "Something went wrong",
      error: err.message,
    });
  }
}

async function getFoodItems(req, res) {
  try {
    const fooditems = await foodModel.find({}).populate('foodPartnerId', 'ownerName businessName');

    res.status(200).json({
      message: "Food items fetched successfully",
      foodItems: fooditems
    });
  }
  catch (err) {
    res.status(500).json({
      message: "Something went wrong",
      error: err.message
    });
  }
}

async function likeFood(req, res) {
  try {
    const user = req.user;
    const { foodId } = req.body;

    if (!foodId) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const isAlreadyLiked = await LikeModel.findOne({
      user: user._id,
      food: foodId
    });

    if (isAlreadyLiked) {
      await LikeModel.deleteOne({
        user: user._id,
        food: foodId
      });

      await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likeCount: -1 }
      });

      return res.status(200).json({
        message: "Food unliked successfully"
      });
    }

    const like = await LikeModel.create({
      user: user._id,
      food: foodId
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { likeCount: 1 }
    });

    res.status(201).json({
      message: "Food liked successfully",
      like: like
    });

  } catch (err) {
    res.status(500).json({
      message: "Something went wrong" + err.message,
      error: err.message
    });
  }
}

async function saveFood(req, res) {
  try {
    const { foodId } = req.body;
    const user = req.user;

    if (!foodId) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const isAlreadySaved = await saveModel.findOne({
      user: user._id,
      food: foodId
    });

    if (isAlreadySaved) {
      await saveModel.deleteOne({
        user: user._id,
        food: foodId
      });

      return res.status(200).json({ message: "Food removed successfully" });
    }

    const savedFood = await saveModel.create({
      user: user._id,
      food: foodId
    });

    res.status(201).json({
      message: "food saved successfully",
      savedFoods: savedFood
    });

  } catch (err) {
    res.status(500).json({
      message: "error is " + err.message,
      error: err.message
    });
  }
}

async function getSavedFoods(req, res) {
  try {
    const user = req.user;
    const savedItems = await saveModel.find({ user: user._id }).populate('food');

    res.status(200).json({
      message: "Saved foods fetched successfully",
      savedFoods: savedItems
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong: " + err.message,
      error: err.message
    });
  }
}

async function getLikedFoods(req, res) {
  try {
    const user = req.user;
    const likedItems = await LikeModel.find({ user: user._id })
      .populate({
        path: 'food',
        populate: {
          path: 'foodPartnerId',
          select: 'ownerName businessName'
        }
      })
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Liked foods fetched successfully",
      likedFoods: likedItems
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong: " + err.message,
      error: err.message
    });
  }
}

async function addComment(req, res) {
  try {
    const user = req.user;
    const { foodId, text } = req.body;

    if (!foodId || !text || !text.trim()) {
      return res.status(400).json({ message: "Food ID and comment text are required" });
    }

    const comment = await CommentModel.create({
      user: user._id,
      food: foodId,
      text: text.trim()
    });

    await foodModel.findByIdAndUpdate(foodId, {
      $inc: { commentCount: 1 }
    });

    const populatedComment = await CommentModel.findById(comment._id).populate('user', 'fullName');

    res.status(201).json({
      message: "Comment added successfully",
      comment: populatedComment
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong: " + err.message,
      error: err.message
    });
  }
}

async function getComments(req, res) {
  try {
    const { foodId } = req.params;

    if (!foodId) {
      return res.status(400).json({ message: "Food ID is required" });
    }

    const comments = await CommentModel.find({ food: foodId })
      .populate('user', 'fullName')
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Comments fetched successfully",
      comments: comments
    });
  } catch (err) {
    res.status(500).json({
      message: "Something went wrong: " + err.message,
      error: err.message
    });
  }
}

module.exports = { createFood, getFoodItems, likeFood, saveFood, getSavedFoods, getLikedFoods, addComment, getComments }
 

 

