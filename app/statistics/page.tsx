import classNames from "classnames";
import { NAV_BAR_HEIGHT_SIZE } from "../utils/constants";

export default function Statistics() {
    return (
        <div className={classNames(
            `flex flex-col h-full overflow-y-auto overscroll-contain pt-${NAV_BAR_HEIGHT_SIZE} max-sm:pb-${NAV_BAR_HEIGHT_SIZE}`
        )}>
            <div className="px-4 py-8 flex flex-row items-center justify-between w-full min-h-36 bg-zinc-200 dark:bg-zinc-800">
                <span className='text-3xl'>
                    App Statistics
                </span>
            </div>
        </div >
    );
}