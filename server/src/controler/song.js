import mongoose from "mongoose";
import { addObjectUrls, getObjectUrl } from "../utils.js";
import Song from "../model/song.js";
import Genre from "../model/genre.js";
import User from "../model/user.js";
import jwt from "jsonwebtoken";

export async function getSongs(req, res) {
	var songs = [];
	const { title } = req.query;
	console.log(title);

	if (!title)
		return res
			.status(404)
			.json({ success: false, message: "Internal server error" });

	switch (title) {
		case "Listen Again":
			songs = await listenAgain();
			break;
		case "Recommended for You":
			songs = await recommendedForYou();
			break;
		default:
			break;
	}

	async function listenAgain() {
		try {
			var songs = [];
			const token = req.cookies.token;
			if (!!token) {
				var user = jwt.verify(token, process.env.JWT_SECRET);
				user = await User.findById(user.id);

				if (user?.history?.length > 0) {
					songs = await addObjectUrls(
						await Song.find({ _id: { $in: user.history } })
							.populate("artist", "name")
							.lean()
							.limit(10)
					);
				}
			}

			return songs;
		} catch (error) {
			console.error("Error fetching songs:", error);
			return res
				.status(500)
				.json({ success: false, message: "Internal Server Error" });
		}
	}

	async function recommendedForYou() {
		try {
			var songs = [];
			const token = req.cookies.token;
			if (!!token) {
				var user = jwt.verify(token, process.env.JWT_SECRET);
				user = await User.findById(user.id);

				if (user?.history?.length > 0) {
					const userHistory = await Song.find({
						$or: [
							{ _id: { $in: user.history } },
							{
								artist: {
									$in: user.history.map(
										(id) => new mongoose.Types.ObjectId(id)
									),
								},
							},
							{
								genre: {
									$in: user.history.map(
										(id) => new mongoose.Types.ObjectId(id)
									),
								},
							},
						],
					}).lean();
				}
			}

			return songs;
		} catch (error) {
			console.error("Error fetching songs:", error);
			return res
				.status(500)
				.json({ success: false, message: "Internal Server Error" });
		}
	}

	res.status(200).json({ success: true, songs: songs });
}

export async function getSong(req, res) {
	try {
		const { songID } = req.query;

		const songObj = await Song.findById(songID);

		if (!songObj) {
			return res
				.status(404)
				.json({ success: false, message: "Song not found" });
		}

		const song = {
			...songObj._doc,
			audioUrl: await getObjectUrl("songs/" + songObj.key + ".mp3"),
			imageUrl: await getObjectUrl("images/" + songObj.key + ".png"),
		};

		return res.json({ success: true, song });
	} catch (error) {
		console.error("Error fetching song:", error);
		return res
			.status(500)
			.json({ success: false, message: "Internal Server Error" });
	}
}

export async function manual(req, res) {
	// await song();
	res.json({ success: true, message: "songs uploaded!" });
}

async function song() {
	const songs = [
		{
			title: "505",
			artist: "Arctic Monkeys",
			key: "505",
			genres: ["672b511c9bb2c92b6aa87951", "672b511c9bb2c92b6aa87957"],
		},
		{
			title: "Not Allowed",
			artist: "TV Girl",
			key: "not-allowed",
			genres: ["672b511c9bb2c92b6aa87954", "672b511c9bb2c92b6aa87951"],
		},
		{
			title: "Shape of You",
			artist: "Ed Sheeran",
			key: "shape-of-you",
			genres: ["672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Blinding Lights",
			artist: "The Weeknd",
			key: "blinding-lights",
			genres: ["672b508d9bb2c92b6aa8794f", "672b511c9bb2c92b6aa87956"],
		},
		{
			title: "Bohemian Rhapsody",
			artist: "Queen",
			key: "bohemian-rhapsody",
			genres: ["672b511c9bb2c92b6aa87951", "672b511c9bb2c92b6aa87957"],
		},
		{
			title: "Hotel California",
			artist: "Eagles",
			key: "hotel-california",
			genres: ["672b511c9bb2c92b6aa87957", "672b511c9bb2c92b6aa87951"],
		},
		{
			title: "Levitating",
			artist: "Dua Lipa",
			key: "levitating",
			genres: ["672b508d9bb2c92b6aa8794f", "6731cf01a829f9861d17eaf9"],
		},
		{
			title: "Rolling in the Deep",
			artist: "Adele",
			key: "rolling-in-the-deep",
			genres: ["672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Take Five",
			artist: "Dave Brubeck",
			key: "take-five",
			genres: ["6731cf01a829f9861d17eaf4"],
		},
		{
			title: "Could You Be Loved",
			artist: "Bob Marley",
			key: "could-you-be-loved",
			genres: ["6731cf01a829f9861d17eaf7"],
		},
		{
			title: "Fur Elise",
			artist: "Ludwig van Beethoven",
			key: "fur-elise",
			genres: ["6731cf01a829f9861d17eaf8"],
		},
		{
			title: "Smells Like Teen Spirit",
			artist: "Nirvana",
			key: "smells-like-teen-spirit",
			genres: ["672b511c9bb2c92b6aa87951", "672b511c9bb2c92b6aa87953"],
		},
		{
			title: "Sunflower",
			artist: "Post Malone, Swae Lee",
			key: "sunflower",
			genres: ["672b508d9bb2c92b6aa8794f", "672b511c9bb2c92b6aa87952"],
		},
		{
			title: "Rockstar",
			artist: "Post Malone",
			key: "rockstar",
			genres: ["6731cf01a829f9861d17eafb", "672b511c9bb2c92b6aa87953"],
		},
		{
			title: "Radioactive",
			artist: "Imagine Dragons",
			key: "radioactive",
			genres: ["672b511c9bb2c92b6aa87951", "672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Superstition",
			artist: "Stevie Wonder",
			key: "superstition",
			genres: ["6731cf01a829f9861d17eaf5", "672b511c9bb2c92b6aa87951"],
		},
		{
			title: "Old Town Road",
			artist: "Lil Nas X",
			key: "old-town-road",
			genres: ["6731cf01a829f9861d17eaf6", "672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Yesterday",
			artist: "The Beatles",
			key: "yesterday",
			genres: ["672b508d9bb2c92b6aa8794f", "6731cf01a829f9861d17eafa"],
		},
		{
			title: "Chandelier",
			artist: "Sia",
			key: "chandelier",
			genres: ["672b508d9bb2c92b6aa8794f", "672b511c9bb2c92b6aa87956"],
		},
		{
			title: "Toxic",
			artist: "Britney Spears",
			key: "toxic",
			genres: ["672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Seven Nation Army",
			artist: "The White Stripes",
			key: "seven-nation-army",
			genres: ["672b511c9bb2c92b6aa87951", "672b511c9bb2c92b6aa87953"],
		},
		{
			title: "Can't Feel My Face",
			artist: "The Weeknd",
			key: "cant-feel-my-face",
			genres: ["672b508d9bb2c92b6aa8794f", "672b511c9bb2c92b6aa87955"],
		},
		{
			title: "Senorita",
			artist: "Shawn Mendes, Camila Cabello",
			key: "senorita",
			genres: ["672b508d9bb2c92b6aa8794f", "6731cf01a829f9861d17eafc"],
		},
		{
			title: "Stairway to Heaven",
			artist: "Led Zeppelin",
			key: "stairway-to-heaven",
			genres: ["672b511c9bb2c92b6aa87951", "672b511c9bb2c92b6aa87957"],
		},
		{
			title: "Rolling in the Deep",
			artist: "Adele",
			key: "rolling-in-the-deep",
			genres: ["672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Wake Me Up",
			artist: "Avicii",
			key: "wake-me-up",
			genres: ["6731cf01a829f9861d17eaf9", "672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "A Sky Full of Stars",
			artist: "Coldplay",
			key: "a-sky-full-of-stars",
			genres: ["672b508d9bb2c92b6aa8794f", "6731cf01a829f9861d17eaf9"],
		},
		{
			title: "Dancing Queen",
			artist: "ABBA",
			key: "dancing-queen",
			genres: ["672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Shallow",
			artist: "Lady Gaga, Bradley Cooper",
			key: "shallow",
			genres: ["672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Take Me to Church",
			artist: "Hozier",
			key: "take-me-to-church",
			genres: ["672b511c9bb2c92b6aa87953"],
		},
		{
			title: "Stayin' Alive",
			artist: "Bee Gees",
			key: "stayin-alive",
			genres: ["6731cf01a829f9861d17eaf5", "672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Lose Yourself",
			artist: "Eminem",
			key: "lose-yourself",
			genres: ["672b511c9bb2c92b6aa87951"],
		},
		{
			title: "Billie Jean",
			artist: "Michael Jackson",
			key: "billie-jean",
			genres: ["672b511c9bb2c92b6aa87955", "672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Mr. Brightside",
			artist: "The Killers",
			key: "mr-brightside",
			genres: ["672b511c9bb2c92b6aa87951", "672b511c9bb2c92b6aa87953"],
		},
		{
			title: "Wonderwall",
			artist: "Oasis",
			key: "wonderwall",
			genres: ["672b511c9bb2c92b6aa87953"],
		},
		{
			title: "Firework",
			artist: "Katy Perry",
			key: "firework",
			genres: ["672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Hallelujah",
			artist: "Leonard Cohen",
			key: "hallelujah",
			genres: ["672b511c9bb2c92b6aa87953", "672b511c9bb2c92b6aa87954"],
		},
		{
			title: "Sugar",
			artist: "Maroon 5",
			key: "sugar",
			genres: ["672b508d9bb2c92b6aa8794f", "672b511c9bb2c92b6aa87956"],
		},
		{
			title: "Poker Face",
			artist: "Lady Gaga",
			key: "poker-face",
			genres: ["672b508d9bb2c92b6aa8794f", "672b511c9bb2c92b6aa87956"],
		},
		{
			title: "Counting Stars",
			artist: "OneRepublic",
			key: "counting-stars",
			genres: ["672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Boulevard of Broken Dreams",
			artist: "Green Day",
			key: "boulevard-of-broken-dreams",
			genres: ["672b511c9bb2c92b6aa87951"],
		},
		{
			title: "Stay",
			artist: "The Kid LAROI, Justin Bieber",
			key: "stay",
			genres: ["672b508d9bb2c92b6aa8794f", "672b511c9bb2c92b6aa87955"],
		},
		{
			title: "Uptown Funk",
			artist: "Mark Ronson, Bruno Mars",
			key: "uptown-funk",
			genres: ["672b508d9bb2c92b6aa8794f", "6731cf01a829f9861d17eaf5"],
		},
		{
			title: "Hello",
			artist: "Adele",
			key: "hello",
			genres: ["672b508d9bb2c92b6aa8794f"],
		},
		{
			title: "Africa",
			artist: "Toto",
			key: "africa",
			genres: ["672b511c9bb2c92b6aa87951", "672b511c9bb2c92b6aa87957"],
		},
		{
			title: "Blurry",
			artist: "Puddle of Mudd",
			key: "blurry",
			genres: ["672b511c9bb2c92b6aa87951"],
		},
		{
			title: "Here Comes the Sun",
			artist: "The Beatles",
			key: "here-comes-the-sun",
			genres: ["672b511c9bb2c92b6aa87953", "672b508d9bb2c92b6aa8794f"],
		},
	];

	for (let i = 0; i < songs.length; i++) {
		const artist = await User.find({ name: songs[i].artist });
		if (artist.length > 0) {
			songs[i].artist = artist[0]._id;
		} else {
			const newArtist = new User({
				name: songs[i].artist,
				email: `${songs[i].artist}@dummy.com`,
				password: "dummyPassword",
			});
			await newArtist.save();
			songs[i].artist = newArtist._id;
		}
	}

	await Song.insertMany(songs);
}

// [
// 	{
// 		title: "505",
// 		artist: "671fbc798b6dfb08a9f1237f",
// 		key: "505",
// 		genres: [
// 			"rock",
// 			"672b511c9bb2c92b6aa87952",
// 			"672b511c9bb2c92b6aa87953",
// 		],
// 	},
// 	{
// 		title: "Not Allowed",
// 		artist: "671fbc798b6dfb08a9f12380",
// 		key: "not-allowed",
// 		genres: [
// 			"672b511c9bb2c92b6aa87954",
// 			"672b511c9bb2c92b6aa87953",
// 			"672b508d9bb2c92b6aa8794f",
// 		],
// 	},
// 	{
// 		title: "Starboy",
// 		artist: "671fbc798b6dfb08a9f12381",
// 		key: "starboy",
// 		genres: [
// 			"672b511c9bb2c92b6aa87955",
// 			"672b508d9bb2c92b6aa8794f",
// 			"672b511c9bb2c92b6aa87953",
// 		],
// 	},
// 	{
// 		title: "Blinding Lights",
// 		artist: "671fbc798b6dfb08a9f12382",
// 		key: "blinding-lights",
// 		genres: [
// 			"672b508d9bb2c92b6aa8794f",
// 			"672b511c9bb2c92b6aa87956",
// 			"672b511c9bb2c92b6aa87953",
// 		],
// 	},
// 	{
// 		title: "Bohemian Rhapsody",
// 		artist: "671fbc798b6dfb08a9f12383",
// 		key: "bohemian-rhapsody",
// 		genres: [
// 			"672b511c9bb2c92b6aa87951",
// 			"672b511c9bb2c92b6aa87957",
// 			"672b511c9bb2c92b6aa87953",
// 		],
// 	},
// ];
