import { FaSpinner } from "react-icons/fa";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex w-full h-full items-center justify-center">
            <progress value={75} max={100} />
        </div>
    );
}