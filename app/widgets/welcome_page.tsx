import classNames from "classnames";
import Image from "next/image";

export default function WelcomePage() {
    return (
        <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center w-full min-h-72 bg-zinc-200 dark:bg-zinc-800 px-4 py-8">
                <span className="flex flex-row gap-2 items-center justify-center">
                    <Image
                        src="/logo.png"
                        alt="sudostake Logo"
                        className="invert-0 dark:invert rounded-full"
                        width={44}
                        height={44}
                        priority
                    />
                    <h1 className="font-bold text-4xl">SudoStake</h1>
                </span>
                <h2>On-chain property rights for everyone</h2>
            </div>

            <div className="flex flex-col p-8">
                <h3 className="font-bold text-xl mb-4">How it works</h3>
                <ul className="list-disc">
                    <li> Connect your wallet.</li>
                    <li> Mint a vault.</li>
                    <li> Deposit, stake and manage your ARCH tokens.</li>
                    <li> Access USDC anytime by trading rights to your staked tokens with lenders.</li>
                    <li> Provide USDC to vault owners in exchange for rights to their staked tokens.</li>
                </ul>
            </div>

            <h3 className="font-normal text-xl px-4 py-8 border-t border-zinc-300 dark:border-zinc-600 text-center"> Types of rights you can extend to lenders as a vault owner</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                <div
                    className={classNames({
                        "px-4 py-8": true,
                        "flex flex-col gap-4": true,
                        "w-full": true,
                        "hover:shadow-lg dark:hover:bg-zinc-900": true,
                        "border-t border-zinc-300 dark:border-zinc-600": true,
                        "md:max-lg:border-r": 0 % 2 === 0,
                        "md:max-lg:border-b": 3 <= 2 || 0 >= 3 - 2,
                        "lg:border-r": (0 + 1) % 3 !== 0,
                        "lg:border-b": 3 <= 3 || 0 >= 3 - 3,
                        "max-sm:border-b": 0 === 3 - 1,
                    })}>
                    <span className="text-green-600 font-bold">Fixed interest rental</span> <br /> You can allow the lender to claim a fixed amount of staking rewards with optional voting rights that can be exercised by the lender during the rewards claiming process.
                </div>
                <div
                    className={classNames({
                        "px-4 py-8": true,
                        "flex flex-col gap-4": true,
                        "w-full": true,
                        "hover:shadow-lg dark:hover:bg-zinc-900": true,
                        "border-t border-zinc-300 dark:border-zinc-600": true,
                        "md:max-lg:border-r": 1 % 2 === 0,
                        "md:max-lg:border-b": 3 <= 2 || 1 >= 3 - 2,
                        "lg:border-r": (1 + 1) % 3 !== 0,
                        "lg:border-b": 3 <= 3 || 1 >= 3 - 3,
                        "max-sm:border-b": 1 === 3 - 1,
                    })}>
                    <span className='text-blue-600 font-bold'>Fixed term rental</span> <br /> You can allow the lender to claim all staking rewards for a fixed duration of time with optional voting rights that can be exercised by the lender during the rewards claiming process.
                </div>
                <div
                    className={classNames({
                        "px-4 py-8": true,
                        "flex flex-col gap-4": true,
                        "w-full": true,
                        "hover:shadow-lg dark:hover:bg-zinc-900": true,
                        "border-t border-zinc-300 dark:border-zinc-600": true,
                        "md:max-lg:border-r": 2 % 2 === 0,
                        "md:max-lg:border-b": 3 <= 2 || 2 >= 3 - 2,
                        "lg:border-r": (2 + 1) % 3 !== 0,
                        "lg:border-b": 3 <= 3 || 2 >= 3 - 3,
                        "max-sm:border-b": 2 === 3 - 1,
                    })}>
                    <span className='text-red-600 font-bold'>Fixed term loan</span> <br /> You can allow the lender to liquidate a fixed amount of your staked tokens when you default on the loan.
                </div>
            </div>

            <div className="flex flex-col px-4 py-8 items-center">
                <h3 className="font-bold text-xl mb-4"> Supported stablecoins</h3>
                <ol>
                    <li>
                        <Image
                            src="https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/noble/asset/usdc.png"
                            alt="logo"
                            className="rounded-full"
                            width={32}
                            height={32}
                            priority
                        />
                    </li>
                </ol>
            </div>

            <div className="flex flex-col px-4 py-8 items-center">
                Get started today! 🚀
            </div>
        </div>
    )
}