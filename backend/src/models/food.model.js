const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  video: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
  },
  foodPartnerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "foodpartner"
  },
  likeCount: {
    type: Number,
    default: 0
  },
  commentCount: {
    type: Number,
    default: 0
  }
});

const foodModel = mongoose.model("food", foodSchema);

module.exports = foodModel;
