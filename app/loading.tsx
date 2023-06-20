import { FaSpinner } from "react-icons/fa";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
        <div className="flex w-full h-full items-center justify-center">
            <h2 className="flex items-center"><FaSpinner className="w-6 h-6 mr-3 spinner" /> <span>Loading...</span></h2>
        </div>
    );
}