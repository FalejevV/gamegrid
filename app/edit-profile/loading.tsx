

export default function EditProfile() {
    return (
        <div className="flexgap flex-col mx-auto max-w-[500px] animate-pulse">
            <div className="w-full max-w-[80px] h-[24px] min-h-[24px] bg-loading" />
            <div className="w-full inputheight bg-loading" />
            <div className="flexgap w-full inputheight justify-between items-center">
                <div className="w-[60px] h-[24px] bg-loading" />
                <div className="w-full sm:max-w-[240px] max-w-[140px] bg-loading h-full" />
            </div>
            <div className="flexgap w-full inputheight justify-between items-center">
                <div className="w-[60px] h-[24px] bg-loading" />
                <div className="w-full sm:max-w-[240px] max-w-[140px] bg-loading h-full" />
            </div>
            <div className="flexgap w-full h-[100px] justify-between items-center">
                <div className="w-[60px] h-[24px] bg-loading" />
                <div className="w-full sm:max-w-[240px] max-w-[140px] bg-loading h-full" />
            </div>
            <div className="w-full inputheight bg-loading" />
        </div>
    )
}