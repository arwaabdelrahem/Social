const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const mongoose = require("mongoose");

const postSchema = mongoose.Schema(
  {
    postText: {
      type: String,
    },
    comments: [
      {
        content: String,
        image: String,
      },
    ],
    likeIds: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      },
    ],
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

function postValidation(post) {
  const schema = Joi.object({
    postText: Joi.string().required(),
    image: Joi.string(),
    userId: Joi.objectId().required(),
  });
  return schema.validate(post);
}

const Post = mongoose.model("Post", postSchema);

module.exports.Post = Post;
module.exports.validate = postValidation;
