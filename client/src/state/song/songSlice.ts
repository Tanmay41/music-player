import { SongObject } from "@/api/song";
import { createSlice } from "@reduxjs/toolkit";

const initialState: SongObject = {
	_id: "",
	title: "",
	artist: { _id: "", name: "", avatar: "" },
	imageUrl: "",
	audioUrl: "",
	duration: 0,
	likes: 0,
};

const songSlice = createSlice({
	name: "song",
	initialState,
	reducers: {
		setSong: (state, action) => (state = action.payload),
	},
});

export const { setSong } = songSlice.actions;

export default songSlice.reducer;
