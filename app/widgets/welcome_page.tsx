import { useRouter } from 'next/navigation';
import ConnectWallet from './connect_wallet';
import ComingSoonToNEAR from './coming_soon_to_near';
import { FaGithub, FaTelegram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

export default function WelcomePage() {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center w-full">
            {/* Hero */}
            <section className="flex flex-col gap-4 items-center justify-center w-full min-h-72 bg-zinc-200 dark:bg-zinc-800 px-4 py-12">
                <h1 className="font-medium sm:text-6xl max-sm:text-4xl text-center">
                    Stake. Earn. Trade.
                </h1>
                <p className="text-center text-gray-700 dark:text-gray-400 text-lg">
                    Earn from staking, trade anytime.
                </p>
            </section>

            {/* How it Works */}
            <section className="py-16 px-4 w-full max-w-4xl">
                <h3 className="text-2xl font-semibold text-center mb-10">How It Works</h3>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Vault Owners */}
                    <div className="flex flex-col gap-4 hover:shadow-lg p-6 border rounded-lg border-zinc-300 dark:border-zinc-800 w-full">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                            For Vault Owners
                        </h5>
                        <p className="text-gray-700 dark:text-gray-400">
                            Access USDC anytime by trading the rights to your staked tokens with liquidity providers.
                        </p>
                        <ConnectWallet label="Mint a Vault" />
                    </div>

                    {/* Liquidity Providers */}
                    <div className="flex flex-col gap-4 hover:shadow-lg p-6 border rounded-lg border-zinc-300 dark:border-zinc-800 w-full">
                        <h5 className="font-medium text-gray-900 dark:text-white">
                            For Liquidity Providers
                        </h5>
                        <p className="text-gray-700 dark:text-gray-400">
                            Provide USDC to vault owners in exchange for the rights to their staked tokens.
                        </p>
                        <button
                            onClick={() => router.push('/liquidity_requests')}
                            className="px-4 h-9 text-sm font-medium border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 transition"
                        >
                            Provide Liquidity
                        </button>
                    </div>
                </div>
            </section>

            {/* Coming Soon to NEAR */}
            <section className="w-full">
                <ComingSoonToNEAR />
            </section>

            {/* Socials */}
            <section className="py-12 px-4 flex flex-col gap-4 items-center max-w-2xl w-full">
                <h3 className="text-xl font-semibold text-center">Socials</h3>
                <div className="flex flex-row gap-6">
                    <a
                        href="https://github.com/sudostake"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="SudoStake GitHub"
                    >
                        <FaGithub className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a
                        href="https://x.com/sudostake"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="SudoStake Twitter (X)"
                    >
                        <FaXTwitter className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                    <a
                        href="https://t.me/sudostake"
                        target="_blank"
                        rel="noreferrer"
                        aria-label="SudoStake Telegram"
                    >
                        <FaTelegram className="w-5 h-5 sm:w-6 sm:h-6" />
                    </a>
                </div>
            </section>
        </div>
    );
}
