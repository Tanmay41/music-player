import { Play } from "lucide-react";
import React from "react";
import Link from "next/link";
import { ArtistObject } from "@/api/song";

interface SongCardProps {
	title: string;
	artist: ArtistObject;
	imageUrl: string;
	url: any;
}

const SongCard = ({ title, artist, imageUrl, url }: SongCardProps) => {
	return (
		<Link
			href={url}
			className="shadow-md rounded-lg overflow-hidden w-64 border-b-[0.2px] border-r-[0.2px] border-gray-300/25 cursor-pointer"
		>
			<div className={"flex justify-center items-center"}>
				<img
					src={imageUrl}
					alt={`${title} cover`}
					className="w-full h-48 object-cover"
				/>
				<Play size={45} className={"absolute"} fill="white" />
			</div>
			<div className="flex items-center h-20 p-4">
				<div className={"w-1/2"}>
					<h3 className="text-lg font-semibold">{title}</h3>
					<p className="text-gray-600">{artist.name}</p>
				</div>
			</div>
		</Link>
	);
};

export default SongCard;
