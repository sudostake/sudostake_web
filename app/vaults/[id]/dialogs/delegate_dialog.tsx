import { useDelegate } from '@/app/hooks/use_exec';
import { useQueryBalance } from '@/app/hooks/use_query';
import { Currency } from '@/app/utils/supported_chains';
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import ValidatorOptions from '../widgets/validator_options';
import { ValidatorInfo } from '@/app/state';

type DelegateDialogProps = {
    vault_address: string,
    currency: Currency
}

export default function DelegateDialog({ vault_address, currency }: DelegateDialogProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('0');
    const [selected_validator, setSelectedValidator] = useState<ValidatorInfo>();
    const { balance } = useQueryBalance(vault_address, currency);
    const { mutate: delegate, isLoading, isSuccess } = useDelegate(vault_address);

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
            <button onClick={() => setIsOpen(true)} className='group flex w-full items-center rounded-md px-2 py-2 text-sm'>
                Delegate
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { setIsOpen(false); }}>
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
                        <div className="flex min-h-screen items-center justify-center p-4 text-center">
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
                                        Delegate Tokens
                                    </Dialog.Title>

                                    <div className="mt-8 flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                        Select a validator
                                    </div>

                                    <ValidatorOptions onValidatorSelected={setSelectedValidator} />

                                    <div className="mt-8 flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                        Available: {balance} {currency.coinDenom}
                                    </div>

                                    <div className="relative flex w-full flex-wrap items-stretch mb-8">
                                        <input value={amount}
                                            onChange={(e) => validate_amount(Number(e.target.value))}
                                            type="number" placeholder="0.00"
                                            className={classNames({
                                                "p-3 rounded text-sm outline-none focus:outline-none focus:ring w-full": true,
                                                "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                            })} />
                                        <span onClick={() => setAmount(`${balance}`)} role="button" className="right-0 mr-8 flex h-full leading-snug font-normal text-center text-base items-center justify-center text-slate-100 absolute bg-transparent rounded  w-8 ">
                                            max
                                        </span>
                                    </div>

                                    <div className="flex mt-20 w-full justify-end">
                                        <button
                                            disabled={Number(amount) == 0 && Boolean(selected_validator)}
                                            type="button"
                                            onClick={() => { delegate({ amount: Number(amount), currency, validator: selected_validator }) }}
                                            className="inline-flex justify-center rounded-md border border-current px-4 py-2 text-xs lg:text-base font-medium text-gray-300">
                                            {
                                                isLoading && <>
                                                    <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                    <span>delegating ...</span>
                                                </>
                                            }
                                            {
                                                !isLoading && <>
                                                    <span>delegate</span>
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
