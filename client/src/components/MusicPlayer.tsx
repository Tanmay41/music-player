"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import { SongObject } from "@/api/song";
// import { AudioGiber, type AudioTrack } from "audio-giber";
import useSound from "use-sound";
import { Howl } from "howler";

const MusicPlayer = () => {
	const song: SongObject = useSelector((state: RootState) => state.song);

	if (song != null) {
		// const [music, setMusic] = useState(new Audio(song.audioUrl));

		const music = new Howl({
			src: [song.audioUrl],
		});

		const playMusic = () => {
			music.play();
		};

		const pauseMusic = () => {
			music.pause();
		};

		const stopMusic = () => {
			music.stop();
		};

		return (
			<div className={"fixed bottom-0 w-full"}>
				<>
					{/* {`${Math.floor(music.duration() / 60)}:${Math.floor(
						music.duration() % 60
					)}`} */}
					<button
						onClick={() => {
							console.log(music.orientation());
						}}
					>
						{song.title}
					</button>
					<div className="song-control-ui">
						<button onClick={playMusic}>Play</button>
						<button onClick={pauseMusic}>Pause</button>
						<button onClick={stopMusic}>Stop</button>
					</div>
				</>
			</div>
		);
	}
	return null;
};

export default MusicPlayer;

// "use client";

// import useSound from "use-sound";

// const MusicPlayer = () => {
// 	const [play] = useSound(
// 		"https://mussic.s3.ap-south-1.amazonaws.com/songs/505.mp3?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAQAGUQI3V7T3OIUCR%2F20241109%2Fap-south-1%2Fs3%2Faws4_request&X-Amz-Date=20241109T032017Z&X-Amz-Expires=300&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCmFwLXNvdXRoLTEiRzBFAiBJqWhn5q3XAUa8vqtVWTv3XoXmdM2I9h%2Fa6Y6JIvOvTwIhAJr5GZ4cyMF9jgX7MZw8rQIjMSfy2r%2BF8KsODRJpBx90KoADCGwQABoMMDAwNDQ1NjYyOTU1IgxRDGRdrSioVeruHGYq3QIo1bjKnAwfCaR1HKIeXfuW6QDe6%2BEMnu4m6AeFwtbXwPHd0ZQgpz7pq0%2BKMvoXr8j5HThKlr9YCIq04G6bBEKT5EnbaHOTmRHIwVb91vvr7QHZNNmFqoa9Yb4r%2FfDHn8FGXntvcwu7IobF%2B7p2MAtjP9q1mHiD8kKi6mCUyDm%2FOR4PoK77r1HppjjUyl3YPIhmA21eMfxNOwQTXzJmLnMtVI2GT9y0zOZ4i11PbAy%2Bk7Y8HxEaJiTA9STAKpliyfRkpQvkEUM1Js202ZnAH44PupkAp4AnuDNrDLbmdMCd0htzg2TkvZ%2FLgPS44YJSjKF0UlDvuNKs4Pp%2F5oeDTGS%2FzTJ0oYe7Mn1Qcy6A5h2v5iAQQMLfvsupBjrhB%2Fb2w%2Bb%2BI7eMXgPRverjcfTzw6%2F70bWE2CkAbR%2FWjZWEN3IGu0OqrQdv0Th3wz6agPPxUrNSz3DHJFn8j67FFBHmMNigu7kGOrQCR3RCi1GHN42Vl99sAvPs6KNLnYF7QuICkpdX4QUzV6c4cwQ338zjl20aIVvMMNK0k4NjPrEINkj9O%2BcBP0EteM58fm1QBF9Bh0bp%2BXMYLs5wqN9vJYZCcLtJG%2FAQ069LwD2acqfZpv6%2FEgLIKRwKyVKPeelJi2j9CpxACOs4mP2JeMCzzp7CoryRGW%2FLvmUWFm98NvvFcnlFS1u9%2F%2BaJusp88kX9nOLmzOLUTpE7Wn5SmuhpZBwCSIkadlXGnGs7pjuFKCMWyEx6MIuW4fqWYwRL93LPLBDO55rKjZc%2BwPgb%2BSOWGkFO49zwqoB8xSqmIjCWYhK9ZjTq2Nbv6NeIy%2FCBc0%2FZlDgWffye8msLVIFMYJ61T0iiljb%2FePpPfa67tW89ESGpTA9MOkfRDdZkSUBYLRY%3D&X-Amz-Signature=7714cf54886e967c94735e44fb4d51faf1d0c28470f93cce19d282a765811c08&X-Amz-SignedHeaders=host&response-content-disposition=inline"
// 	);

// 	return <button onClick={play}>Boop!</button>;
// };

// export default MusicPlayer;
