import { useWithdraw } from '@/app/hooks/use_exec';
import { useQueryBalance } from '@/app/hooks/use_query';
import { walletState } from '@/app/state';
import { Currency } from '@/app/utils/supported_chains';
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

type WithdrawDialogProps = {
    from_address: string,
    currency: Currency
}

export default function WithdrawDialog({ from_address, currency }: WithdrawDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const { balance } = useQueryBalance(from_address, currency);
    const { mutate: withdraw, isLoading, isSuccess } = useWithdraw(from_address);
    const [to_address, setToAddress] = useState("");

    // Close modal when the withdrawal is done
    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
        }
    }, [isSuccess]);

    // Validate user input to make sure it is not bigger than available balance
    function validate_amount(amount: number) {
        if (amount > Number(balance)) {
            setAmount('');
        } else {
            setAmount(`${amount}`);
        }
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="items-center border border-current rounded w-20 text-xs lg:text-sm lg:font-medium">
                Withdraw
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsOpen(false)}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-80" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className={classNames({
                                    "bg-slate-800": true,
                                    "w-full max-w-lg overflow-hidden rounded p-8 text-left align-middle shadow-lg": true,
                                    "transform transition-all": true
                                })}>
                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg font-bold leading-6 text-gray-300">
                                        Withdraw Tokens
                                    </Dialog.Title>

                                    <p className="text-gray-300 text-xs lg:text-lg mt-2 mb-8">
                                        Please enter the amount of {currency.coinDenom} to withdraw
                                    </p>

                                    <div className="flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                        Available: {balance} {currency.coinDenom}
                                    </div>

                                    <input value={amount}
                                        onChange={(e) => validate_amount(Number(e.target.value))}
                                        type="number" placeholder="0.00"
                                        className={classNames({
                                            "p-3 mb-8 rounded text-sm outline-none focus:outline-none focus:ring w-full": true,
                                            "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                        })} />

                                    <div className="flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                        Optional: Provide the address to send funds to, else funds will be sent to your primary address
                                    </div>

                                    <input value={to_address}
                                        onChange={(e) => setToAddress(e.target.value)}
                                        type="text" placeholder="arch..."
                                        className={classNames({
                                            "p-3 rounded text-sm outline-none focus:outline-none focus:ring w-full": true,
                                            "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                        })} />

                                    <div className="flex mt-20 w-full justify-end">
                                        <button
                                            disabled={!Boolean(amount) || isLoading}
                                            type="button"
                                            onClick={() => { withdraw({ amount: Number(amount), currency, to_address: Boolean(to_address) ? to_address : null }) }}
                                            className="inline-flex justify-center rounded-md border border-current px-4 py-2 text-xs lg:text-base font-medium text-gray-300">
                                            {
                                                isLoading && <>
                                                    <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                    <span>withdrawing ...</span>
                                                </>
                                            }
                                            {
                                                !isLoading && <>
                                                    <span>withdraw</span>
                                                </>
                                            }
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
