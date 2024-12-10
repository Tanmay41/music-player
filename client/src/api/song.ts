// import { cookies } from "next/headers";

export interface ArtistObject {
	_id: string;
	name: string;
	avatar: string;
}

export interface SongObject {
	_id: string;
	title: string;
	artist: ArtistObject;
	imageUrl: string;
	audioUrl: string;
	duration: number;
	likes: number;
}

export interface GetSongsResponse {
	songs: SongObject[];
	success?: boolean;
}

export async function getSongs(title: string): Promise<GetSongsResponse> {
	const url = `${process.env.BACKEND_URL}/song/?title=${title}`;

	try {
		const response = await fetch(url, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
				// Cookie: cookies().toString(),
			},
		});

		const data: GetSongsResponse = await response.json();

		return data;
	} catch (error) {
		console.error("Error fetching songs:", error);
		throw error;
	}
}

export interface GetSongResponse {
	song: SongObject;
	success?: boolean;
}

export async function getSong(id: string): Promise<GetSongResponse> {
	// const url = `${process.env.BACKEND_URL}/song/one?songID=${id}`;
	const url = `http://localhost:9000/api/v1/song/one?songID=${id}`;

	try {
		const response = await fetch(url, {
			method: "GET",
			credentials: "include",
			headers: {
				"Content-Type": "application/json",
			},
		});

		const data: GetSongResponse = await response.json();
		console.log(data);

		return data;
	} catch (error) {
		console.error("Error fetching song:", error);
		throw error;
	}
}
