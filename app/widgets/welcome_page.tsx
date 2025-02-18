import classNames from "classnames";
import { useRouter } from 'next/navigation';
import ConnectWallet from "./connect_wallet";
import { FaGithub, FaTelegram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function WelcomePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col gap-8 justify-center items-center">
            <div className="flex flex-col items-center justify-center w-full min-h-72 bg-zinc-200 dark:bg-zinc-800 px-4 py-8">
                <h1 className="font-meduim text-4xl">
                    Stake. Earn. Trade.
                </h1>
            </div>

            <div className="flex flex-col gap-8 p-8 max-w-2xl">
                <h3 className="text-xl mb-4 text-center font-semibold">How it Works</h3>

                <ul className="flex max-md:flex-col md:flex-row gap-8">
                    <li className="flex flex-col gap-4 hover:shadow-lg p-4 border rounded-lg border-zinc-300 dark:border-zinc-800">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                            For Vault Owners
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Access USDC anytime by trading the rights to your staked tokens with liquidity providers.
                        </p>
                        <ConnectWallet label="Mint a Vault" />
                    </li>

                    <li className="flex flex-col gap-4 hover:shadow-lg p-4 border rounded-lg border-zinc-300 dark:border-zinc-800">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                            For Liquidity Providers
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Provide USDC to vault owners in exchange for the rights to their staked tokens.
                        </p>
                        <button onClick={() => { router.push('/liquidity_requests') }}
                            className="px-4 flex items-center justify-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 min-w-24 h-9 text-xs lg:text-sm lg:font-medium">
                            Provide Liquidity
                        </button>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col gap-4 p-4 max-w-2xl">
                <h3 className="text-xl text-center">Socials</h3>
                <div className="flex flex-row gap-8">
                    <a href="https://github.com/sudostake"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaGithub className="w-6 h-6"></FaGithub>
                    </a>

                    <a href="https://x.com/sudostake"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaXTwitter className="w-6 h-6"></FaXTwitter>
                    </a>

                    <a href="https://t.me/sudostake"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <FaTelegram className="w-6 h-6"></FaTelegram>
                    </a>
                </div>
            </div>
        </div>
    );
}