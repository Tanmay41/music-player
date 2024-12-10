import mongoose, { Schema } from "mongoose";

const playlistSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	songs: {
		type: [Schema.Types.ObjectId],
		ref: "Song",
		default: [],
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
});

const Playlist = mongoose.model("Playlist", playlistSchema);

export default Playlist;
