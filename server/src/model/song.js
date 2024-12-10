import mongoose, { Schema } from "mongoose";

const songSchema = new Schema(
	{
		title: {
			type: String,
			required: true,
		},
		artist: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		likes: {
			type: Number,
			default: 0,
		},
		key: {
			type: String,
			required: true,
		},
		genres: {
			type: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
			default: [],
		},
	},
	{ timestamps: true }
);

const Song = mongoose.model("Song", songSchema);

export default Song;
