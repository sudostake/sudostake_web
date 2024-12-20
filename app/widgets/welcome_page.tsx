import classNames from "classnames";
import Image from "next/image";

export default function WelcomePage() {
    return (
        <div className="flex flex-col justify-center items-center">
            <div className="flex flex-col items-center justify-center w-full min-h-72 bg-zinc-200 dark:bg-zinc-800 px-4 py-8">
                <span className="flex flex-row gap-2 items-center justify-center">
                    <h1 className="font-bold text-4xl ">
                        SudoStake
                    </h1>
                </span>
                <h2>On-chain property rights for everyone</h2>
            </div>

            <div className="flex flex-col p-8 max-w-md">
                <h3 className="font-bold text-xl mb-4">How it works</h3>
                <ul className="flex flex-col gap-8">
                    <li>
                        <div className="flex flex-col">
                            <span className="text-blue-600">For vault owners</span>
                            <span>Access USDC anytime by trading rights to your staked tokens with liquidity providers.</span>
                        </div>
                    </li>
                    <li>
                        <div className="flex flex-col">
                            <span className="text-green-600">For liquidity providers</span>
                            <span>Provide USDC to vault owners in exchange for rights to their staked tokens.</span>
                        </div>
                    </li>
                    
                </ul>
            </div>

            <div className="flex flex-col p-8 max-w-md">
                <h3 className="font-bold text-xl mb-4">Loan Options</h3>
                <div className="flex flex-col hover:shadow-lg p-4 border rounded-lg  border-zinc-300 dark:border-zinc-800">
                    <div className={classNames(
                        "flex flex-col",
                        "w-full",
                    )}>
                        <span className='text-red-600 font-bold'>Fixed term loan</span>
                        <p>Liquidity providers can liquidate a fixed amount of tokens staked in a vault when the owner defaults.</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-4 py-8 items-center">
                <h3 className="font-bold text-xl mb-4">Supported stablecoins</h3>
                <ol>
                    <li>
                        <Image
                            src="https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/noble/asset/usdc.png"
                            alt="USDC logo"
                            className="rounded-full"
                            width={32}
                            height={32}
                            priority
                        />
                    </li>
                </ol>
            </div>
        </div>
    );
}