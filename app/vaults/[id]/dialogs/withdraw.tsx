import { useWithdraw } from '@/app/hooks/use_exec';
import { useQueryBalance } from '@/app/hooks/use_query';
import { selectedChainState } from '@/app/state';
import { Currency } from '@/app/utils/supported_chains';
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';

type WithdrawDialogButtonProps = {
    from_address: string,
    currency: Currency
}

export default function WithdrawDialogButton({ from_address, currency }: WithdrawDialogButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="items-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 w-24 h-9 text-xs lg:text-sm lg:font-medium">
                Withdraw
            </button>

            {
                isOpen && <_WithdrawDialog
                    from_address={from_address}
                    currency={currency}
                    is_open={isOpen}
                    on_close={() => { setIsOpen(false) }} />
            }
        </>
    )
}


type _WithdrawDialogProps = {
    from_address: string,
    currency: Currency,
    is_open: boolean,
    on_close: () => void,
}

function _WithdrawDialog({ from_address, currency, is_open, on_close }: _WithdrawDialogProps) {
    const [amount, setAmount] = useState('');
    const { balance } = useQueryBalance(from_address, currency);
    const { mutate: withdraw, isLoading, isSuccess } = useWithdraw(from_address);
    const [to_address, setToAddress] = useState("");
    const chainInfo = useRecoilValue(selectedChainState);

    // Close modal when the withdrawal is done
    useEffect(() => {
        if (isSuccess) {
            on_close();
        }
    }, [isSuccess, on_close]);

    // Validate user input to make sure it is not bigger than available balance
    function validate_amount(amount: number) {
        if (amount > Number(balance)) {
            setAmount('');
        } else {
            setAmount(`${amount}`);
        }
    }

    return (
        <Transition appear show={is_open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={on_close}>
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
                                "w-full max-w-lg overflow-hidden rounded-lg p-8 text-left align-middle shadow-lg": true,
                                "transform transition-all": true
                            })}>
                                <Dialog.Title
                                    as="h2"
                                    className="text-lg font-bold leading-6 text-gray-300">
                                    Withdraw Tokens
                                </Dialog.Title>

                                <p className="text-gray-300 text-xs lg:text-base mt-2 mb-8">
                                    Enter the amount of {currency.coinDenom} to withdraw
                                </p>

                                <div className="flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                    Available: {balance.toLocaleString('en-us')} {currency.coinDenom}
                                </div>

                                <div className="relative flex w-full flex-wrap items-stretch mb-8">
                                    <input value={amount}
                                        onChange={(e) => validate_amount(Number(e.target.value))}
                                        type="number" placeholder="0.00"
                                        className={classNames({
                                            "p-3 rounded-lg text-sm outline-none focus:outline-none focus:ring w-full": true,
                                            "placeholder-slate-200 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                        })} />
                                    <span onClick={() => setAmount(`${balance}`)} role="button" className="right-0 mr-8 flex h-full leading-snug font-normal text-center text-base items-center justify-center text-slate-100 absolute bg-transparent rounded-lg  w-8 ">
                                        max
                                    </span>
                                </div>

                                <div className="flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                    Optional: Provide the address to send funds to, else funds will be sent to your primary address
                                </div>

                                <input value={to_address}
                                    onChange={(e) => setToAddress(e.target.value)}
                                    type="text" placeholder={`Enter ${chainInfo.src.chainName} address`}
                                    className={classNames({
                                        "p-3 rounded-lg text-sm outline-none focus:outline-none focus:ring w-full": true,
                                        "placeholder-slate-200 text-slate-100 relative bg-slate-800 border border-slate-500": true,
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
    )
}
