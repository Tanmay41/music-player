import { Skeleton } from "@/components/ui/skeleton";

export function SongCardSkeleton() {
	return (
		<div>
			<Skeleton className="h-10 w-32 mt-4 ml-5" />
			<div className={"flex gap-x-4 p-4 overflow-x-hidden"}>
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-48 w-64 rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-48 w-64 rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-48 w-64 rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-48 w-64 rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-48 w-64 rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-48 w-64 rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
				<div className="flex flex-col space-y-3">
					<Skeleton className="h-48 w-64 rounded-xl" />
					<div className="space-y-2">
						<Skeleton className="h-4 w-[250px]" />
						<Skeleton className="h-4 w-[200px]" />
					</div>
				</div>
			</div>
		</div>
	);
}
