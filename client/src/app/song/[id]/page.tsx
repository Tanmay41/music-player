"use client";
import React, { useEffect } from "react";
import { getSong } from "@/api/song";
// import Song from "@/components/song/Song";
import { useDispatch } from "react-redux";
import { setSong } from "@/state/song/songSlice";

const page = ({ params: { id } }: { params: { id: string } }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		getSong(id).then((res) => {
			dispatch(setSong(res.song));
		});
	}, [id, dispatch]);

	return null;
};

export default page;
