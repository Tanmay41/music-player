/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["mussic.s3.ap-south-1.amazonaws.com"],
	},
	rewrites: async () => {
		return [
			{
				source: "/:path*",
				destination: "/:path*",
				has: [
					{
						type: "host",
						value: "mussic.s3.ap-south-1.amazonaws.com",
					},
					{
						type: "header",
						key: "accept",
						value: "audio/mpeg",
					},
				],
			},
		];
	},
};

export default nextConfig;
