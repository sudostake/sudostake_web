import Image from "next/image";
import { FaArrowRight } from "react-icons/fa";
import NearLaunchModal from "./near_launch_modal";

export default function ComingSoonToNEAR() {
    return (
        <div className="fade-in flex flex-col items-center justify-center w-full py-16 bg-[rgb(0,236,151)] dark:bg-zinc-900">
            <div className="text-center max-w-2xl px-4">
                <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white mb-4">
                    Coming Soon to NEAR Protocol
                </h2>
                <p className="text-gray-800 dark:text-neutral-300 mb-6">
                    SudoStake is expanding to NEAR — unlocking permissionless staking and on-chain liquidity for NEAR stakers.
                </p>
                <NearLaunchModal
                    trigger={
                        <button className="inline-flex items-center gap-2 bg-white dark:bg-neutral-800 border border-gray-300 dark:border-neutral-600 text-sm font-medium text-gray-900 dark:text-white py-2 px-4 rounded-lg shadow-sm hover:shadow-md transition-all">
                            <Image
                                src="/near.png"
                                alt="NEAR Protocol Logo"
                                className="invert-0 dark:invert"
                                width={20}
                                height={20}
                                priority
                            />
                            <span>Check Integration Progress</span>
                            <FaArrowRight className="text-sm" />
                        </button>
                    }
                />
            </div>
        </div>
    );
}
