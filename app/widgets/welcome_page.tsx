import classNames from "classnames";
import { useRouter } from 'next/navigation';
import ConnectWallet from "./connect_wallet";

export default function WelcomePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center w-full min-h-72 bg-zinc-200 dark:bg-zinc-800 px-4 py-8">
                <span className="flex flex-row gap-2 items-center justify-center">
                    <h1 className="font-bold text-xl sm:text-2xl">
                        The Liquidity Protocol for <span>Stakers</span>
                    </h1>
                </span>
            </div>

            <div className="flex flex-col p-8 max-w-2xl">
                <h3 className="font-bold text-xl mb-4 text-center">How it Works</h3>

                <ul className="flex max-sm:flex-col sm:flex-row gap-8">
                    <li className="flex flex-col hover:shadow-lg p-4 border rounded-lg  border-zinc-300 dark:border-zinc-800">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            For Vault Owners
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Access USDC anytime by trading the rights to your staked tokens with liquidity providers.
                        </p>
                    </li>

                    <li className="flex flex-col hover:shadow-lg p-4 border rounded-lg  border-zinc-300 dark:border-zinc-800">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            For Liquidity Providers
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Provide USDC to vault owners in exchange for the rights to their staked tokens.
                        </p>
                    </li>
                </ul>
            </div>

            <div className="flex flex-col p-8 max-w-2xl">
                <h3 className="font-bold text-xl mb-4 text-center">Loan Option</h3>
                <div className="flex flex-col hover:shadow-lg p-4 border rounded-lg  border-zinc-300 dark:border-zinc-800">
                    <div className={classNames(
                        "flex flex-col",
                        "w-full",
                    )}>
                        <span className='text-red-600 font-bold'>Fixed Term Loan</span>
                        <p>Liquidity providers have the right to liquidate a fixed amount of tokens held in a vault if the owner defaults.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-8 max-w-lg text-center">
                <h3 className="font-bold text-xl mb-4">Get Started</h3>
                <span className="flex flex-row gap-8">
                    <ConnectWallet label="Mint a Vault" />
                    <button onClick={() => { router.push('/liquidity_requests') }}
                        className="btn btn-primary hover:underline">Provide Liquidity</button>
                </span>
            </div>
        </div>
    );
}