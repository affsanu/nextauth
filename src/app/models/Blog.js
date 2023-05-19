import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    min: 4,
  },
  desc: {
    type: String,
    required: true,
    min: 6,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
    enum: [
        'Bangladesh',
        'International',
        'Sports',
        'Politics',
        'Education',
        'Opinion',
        'Economy'
    ],
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  likes: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
},
{timestamps: true}
);

export default mongoose?.models?.Blog || mongoose.model("Blog", BlogSchema);
