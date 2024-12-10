import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	gender: {
		type: String,
		enum: ["male", "female"],
	},
	avatar: String,
	role: {
		type: String,
		enum: ["user", "admin"],
		default: "user",
	},
	likedSongs: {
		type: [Schema.Types.ObjectId],
		ref: "Song",
		default: [],
	},
	playlists: {
		type: [Schema.Types.ObjectId],
		ref: "Playlist",
		default: [],
	},
	preferredGenres: {
		type: [String],
		default: [],
	},
	history: {
		type: [Schema.Types.ObjectId],
		ref: "Song",
		default: [],
	},
});

const User = mongoose.model("User", userSchema);

export default User;
