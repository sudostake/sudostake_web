export default function Loading() {
    return (
        <div className="flex w-full h-full items-center justify-center">
            <progress value={75} max={100} />
        </div>
    );
}