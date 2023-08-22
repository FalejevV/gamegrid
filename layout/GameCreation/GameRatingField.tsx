import RatingButton from "@/components/RatingButton/RatingButton";




export default function GameRatingField() {
    return (
        <div className="flex items-center justify-between">
            <RatingButton aspect={"graphics_avg"} value={1} />
            <RatingButton aspect={"graphics_avg"} value={2} />
            <RatingButton aspect={"graphics_avg"} value={3} />
            <RatingButton aspect={"graphics_avg"} value={4} />
            <RatingButton aspect={"graphics_avg"} value={5} />
            <RatingButton aspect={"graphics_avg"} value={6} />
            <RatingButton aspect={"graphics_avg"} value={7} />
            <RatingButton aspect={"graphics_avg"} value={8} />
            <RatingButton aspect={"graphics_avg"} value={9} />
            <RatingButton aspect={"graphics_avg"} value={10} />
        </div>
    )
}