import Image from "next/image";

export default function WelcomePage() {
    return (
        <div className="p-8">
            <h1 className="font-bold text-lg">Welcome to SudoStake</h1>
            <h2>On-chain property rights for everyone.</h2>

            <br />
            <br />

            <h3 className="font-medium underline underline-offset-4 mb-4">How it works</h3>
            <ol>
                <li> 1. Mint a vault.</li>
                <li> 2. Stake and manage your ARCH tokens in your vault.</li>
                <li> 3. Access USDC anytime by trading rights to your staked tokens with lenders.</li>
                <li> 4. Provide USDC to vault owners in exchange for rights to their staked tokens.</li>
            </ol>

            <br />
            <br />

            <h3 className="font-medium underline underline-offset-4 mb-4"> Types of rights you can extend to lenders as a vault owner</h3>
            <ol className="flex flex-col gap-4">
                <li><span className="text-green-600">Fixed interest rental</span> <br /> You can allow the lender to claim a fixed amount of staking rewards with optional voting rights that can be exercised by the lender during the rewards claiming process.</li>
                <li><span className='text-blue-600'>Fixed term rental</span> <br /> Allow the lender to claim all staking rewards for a fixed duration of time with optional voting rights that can be exercised by the lender during the rewards claiming process.</li>
                <li><span className='text-red-600'>Fixed term loan</span> <br /> Allow the lender to liquidate a fixed amount of your staked tokens when you default on the loan.</li>
            </ol>

            <br />
            <br />

            <h3 className="font-medium underline underline-offset-4 mb-4"> Supported stablecoins</h3>
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

            <br />
            <br />
            Get started today! 🚀
        </div>
    )
}