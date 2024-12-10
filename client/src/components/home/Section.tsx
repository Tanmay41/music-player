import React from "react";
import SongCard from "./SongCard";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { GetSongsResponse } from "@/api/song";

interface SectionProps {
	title: string;
	getSongs?: (title: string) => Promise<GetSongsResponse>;
}

const Section = async ({ title, getSongs }: SectionProps) => {
	const songs: GetSongsResponse = getSongs
		? await getSongs(title)
		: { songs: [] };

	return (
		songs?.songs?.length > 0 && (
			<div className={"w-screen"}>
				<h2 className={"text-5xl font-bold mb-4 ml-5 mt-4"}>{title}</h2>
				<ScrollArea className="flex flex-row gap-10 overflow-x-visible">
					<div className="flex w-max space-x-4 p-4">
						{songs.songs.map((song, index) => (
							<SongCard
								key={index}
								title={song.title}
								artist={song.artist}
								imageUrl={song.imageUrl}
								url={song._id ? `/song/${song._id}` : "/404"}
							/>
						))}
					</div>
					<ScrollBar orientation="horizontal" />
				</ScrollArea>
			</div>
		)
	);
};

export default Section;
