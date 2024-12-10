import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import s3Client from "./AWS-S3.js";

export async function getObjectUrl(key) {
	return await getSignedUrl(
		s3Client,
		new GetObjectCommand({
			Bucket: "mussic",
			Key: key,
		})
	);
}

export async function addObjectUrls(songs) {
	for (let i = 0; i < songs.length; i++) {
		songs[i] = {
			...songs[i],
			audioUrl: await getObjectUrl("songs/" + songs[i].key + ".mp3"),
			imageUrl: await getObjectUrl("images/" + songs[i].key + ".png"),
		};
	}
	return songs;
}
