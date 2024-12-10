import React, { Suspense } from "react";
import Section from "./Section";
import { SongCardSkeleton } from "./SongCardSkeleton";
import { sections } from "@/datas";
import { getSongs } from "@/api/song";

const Home = () => {
	return (
		<div>
			{sections.map((item) => (
				<Suspense key={item.id} fallback={<SongCardSkeleton />}>
					<Section title={item.title} getSongs={getSongs} />
				</Suspense>
			))}
		</div>
	);
};

export default Home;
