import classNames from "classnames";
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center w-full min-h-72 bg-zinc-200 dark:bg-zinc-800 px-4 py-8">
                <span className="flex flex-row gap-2 items-center justify-center">
                    <h1 className="font-bold text-2xl">
                        Welcome to <span>SudoStake</span>
                    </h1>
                </span>
                <h2>On-chain property rights for everyone</h2>
            </div>

            <div className="flex flex-col p-8 max-w-2xl">
                <h3 className="font-bold text-xl mb-4 text-center">How it works</h3>

                <ul className="flex max-sm:flex-col sm:flex-row gap-8">
                    <li className="flex flex-col hover:shadow-lg p-4 border rounded-lg  border-zinc-300 dark:border-zinc-800">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            For vault owners
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Access USDC anytime by trading rights to your staked tokens with liquidity providers.
                        </p>
                    </li>

                    <li className="flex flex-col hover:shadow-lg p-4 border rounded-lg  border-zinc-300 dark:border-zinc-800">
                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                            For liquidity providers
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            Provide USDC to vault owners in exchange for rights to their staked tokens.
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
                        <span className='text-red-600 font-bold'>Fixed term loan</span>
                        <p>Liquidity providers can liquidate a fixed amount of tokens held in a vault when the owner defaults.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col p-8 max-w-lg text-center">
                <h3 className="font-bold text-xl mb-4">Get Started</h3>
                <span className="flex flex-row gap-8">
                    <button className="btn btn-primary">Create a vault</button>
                    <button onClick={() => { router.push('/liquidity_requests') }}
                        className="btn btn-primary hover:underline">Provide liquidity</button>
                </span>
            </div>
        </div>
    );
}