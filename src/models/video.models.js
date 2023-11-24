import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";
const videoSchema = new Schema(
  {
    videoFile: {
      type: String,
      required: [true, "Video url required"],
    },
    thumnail: {
      type: String,
      required: [true, "thumail url required"],
    },

    title: {
      type: String,
      required: [true, "title required"],
    },
    description: {
      type: String,
      required: [true, "description required"],
    },
    duration: {
      type: Number,
      required: [true, "duration required"],
    },
    views: {
      type: Number,
      default: 0,
    },
    isPublished: {
      type: Boolean,
      default: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

videoSchema.plugin(mongooseAggregatePaginate);

export const Video = mongoose.model("Video", videoSchema);
