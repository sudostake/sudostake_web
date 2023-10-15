import { useUndelegate } from '@/app/hooks/use_exec';
import { Currency } from '@/app/utils/supported_chains';
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import ValidatorOptions from '../widgets/validator_options';
import { ValidatorInfo } from '@/app/state';

type UndelegateDialogButtonProps = {
    vault_address: string,
    currency: Currency
}

export default function UndelegateDialogButton({ vault_address, currency }: UndelegateDialogButtonProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button onClick={() => setIsOpen(true)} className='group flex w-full items-center p-2 text-xs lg:text-sm'>
                Undelegate
            </button>

            {
                isOpen && <UndelegateDialog
                    vault_address={vault_address}
                    currency={currency}
                    is_open={isOpen}
                    on_close={() => { setIsOpen(false) }} />
            }
        </>
    )
}


type ComponentProps = {
    vault_address: string,
    currency: Currency,
    is_open: boolean,
    on_close: () => void,
}
function UndelegateDialog({ vault_address, currency, is_open, on_close }: ComponentProps) {
    const [amount, setAmount] = useState('0');
    const [selected_validator, setSelectedValidator] = useState<ValidatorInfo>();
    const { mutate: undelegate, isLoading, isSuccess } = useUndelegate(vault_address);

    // Check when the continue button should be active
    const can_continue = Number(amount) > 0 && Boolean(selected_validator);

    // Close modal when the undelegate is done
    useEffect(() => {
        if (isSuccess) {
            on_close();
        }
    }, [isSuccess, on_close]);

    // Validate user input to make sure it is not bigger than available balance
    function validate_amount(amount: number) {
        if (Boolean(selected_validator) && amount > Number(selected_validator.delegated_amount)) {
            setAmount('');
        } else {
            setAmount(`${amount}`);
        }
    }

    // Handle when the modal is closed
    function handle_modal_closed() {
        on_close();
        setAmount('');
        setSelectedValidator(null);
    }

    return (
        <Transition appear show={is_open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={handle_modal_closed}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-opacity-80 backdrop-blur-xs" />
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
                                "w-full max-w-xl overflow-hidden rounded-lg p-8 text-left align-middle shadow-lg": true,
                                "transform transition-all": true
                            })}>
                                <Dialog.Title
                                    as="h2"
                                    className="text-lg font-bold leading-6 text-gray-300">
                                    Undelegate Tokens
                                </Dialog.Title>

                                <div className="mt-8 flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                    Choose Validator
                                </div>

                                <ValidatorOptions hide_zero_balance={true} onValidatorSelected={setSelectedValidator} />

                                <div className="mt-8 flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                    Available {selected_validator && selected_validator.delegated_amount.toLocaleString('en-us')} {currency.coinDenom}
                                </div>

                                <div className="relative flex w-full flex-wrap items-stretch mb-8">
                                    <input value={amount}
                                        onChange={(e) => validate_amount(Number(e.target.value))}
                                        type="number" placeholder="0.00"
                                        className={classNames({
                                            "p-3 rounded-lg text-sm outline-none focus:outline-none focus:ring w-full": true,
                                            "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                        })} />
                                    <span onClick={() => selected_validator && setAmount(`${selected_validator.delegated_amount}`)} role="button" className="right-0 mr-2 lg:mr-8 flex h-full leading-snug font-normal text-center text-xs lg:text-base items-center justify-center text-slate-100 absolute bg-transparent rounded-lg  w-8 ">
                                        max
                                    </span>
                                </div>

                                <div className="flex mt-20 w-full justify-end">
                                    <button
                                        disabled={!can_continue}
                                        type="button"
                                        onClick={() => { undelegate({ amount: Number(amount), currency, validator: selected_validator }) }}
                                        className="inline-flex justify-center rounded-md border border-current px-4 py-2 text-xs lg:text-base font-medium text-gray-300">
                                        {
                                            isLoading && <>
                                                <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                <span>undelegating ...</span>
                                            </>
                                        }
                                        {
                                            !isLoading && <>
                                                <span>undelegate</span>
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
