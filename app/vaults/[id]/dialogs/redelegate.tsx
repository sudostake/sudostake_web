import { useRedelegate } from '@/app/hooks/use_exec';
import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa';
import ValidatorOptions from '../widgets/validator_options';
import { useQueryRedelegationList } from '@/app/hooks/use_query';
import { Currency } from '@/app/types/currency';
import { ValidatorInfo } from '@/app/types/validator_info';

type ComponentProps = {
    vault_address: string,
    currency: Currency
}

export default function RedelegateDialog({ vault_address, currency }: ComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [amount, setAmount] = useState('');
    const [selected_from_validator, setSelectedFromValidator] = useState<ValidatorInfo>();
    const [selected_from_has_pending_redelegations, setSelectedFromError] = useState(false);
    const [selected_to_validator, setSelectedToValidator] = useState<ValidatorInfo>();
    const { mutate: redelegate, isLoading, isSuccess } = useRedelegate(vault_address);
    const { redelegation_list } = useQueryRedelegationList(vault_address);

    // Check when the continue button should be active
    const can_continue = !selected_from_has_pending_redelegations && Boolean(selected_from_validator) &&
        Boolean(selected_to_validator) && Number(amount) > 0 &&
        (selected_from_validator && selected_from_validator.address) !== (selected_to_validator && selected_to_validator.address);

    // Close modal when the withdrawal is done
    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
        }
    }, [isSuccess]);

    // Validate user input to make sure it is not bigger than available selected_to_validator.
    function validate_amount(amount: number) {
        if (Boolean(selected_from_validator)) {
            if (amount > Number(selected_from_validator.delegated_amount)) {
                setAmount('');
            } else {
                setAmount(`${amount}`);
            }
        }
    }

    // handle when selected_from_validator changes
    function handle_selected_from(data: ValidatorInfo) {
        setSelectedFromValidator(data);
        setAmount('');

        // Check if the selected validator has pending redelegations
        const has_pending_redelegations = redelegation_list.find((d) => d['redelegation']['validator_dst_address'] === data.address);
        if (Boolean(has_pending_redelegations)) {
            setSelectedFromError(true);
        } else {
            setSelectedFromError(false);
        }
    }

    // Handle when the modal is closed
    function handle_modal_closed() {
        setIsOpen(false);
        setAmount('');
        setSelectedFromError(false);
    }

    return (
        <>
            <button onClick={() => setIsOpen(true)} className='group flex w-full items-center p-2 text-xs lg:text-sm'>
                Redelegate
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={handle_modal_closed}>
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
                                    "w-full max-w-3xl overflow-hidden rounded-lg p-8 text-left align-middle shadow-lg": true,
                                    "transform transition-all": true
                                })}>
                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg font-bold leading-6 text-gray-300">
                                        Redelegate Tokens
                                    </Dialog.Title>

                                    <>
                                        <div className="mt-8 flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                            From Validator
                                        </div>

                                        <ValidatorOptions hide_zero_balance={true} onValidatorSelected={handle_selected_from} />
                                        {
                                            selected_from_has_pending_redelegations &&
                                            <div className="mt-4 flex items-center mb-2 w-full text-rose-500 text-xs lg:text-sm">
                                                This validator still has incoming redelegations.
                                                Please select another validator to redelegate from
                                            </div>
                                        }
                                    </>

                                    <>
                                        <div className="mt-8 flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                            To Validator
                                        </div>

                                        <ValidatorOptions onValidatorSelected={setSelectedToValidator} />
                                    </>

                                    <>
                                        <div className="mt-8 flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                            Available to redelegate: {selected_from_validator && selected_from_validator.delegated_amount.toLocaleString('en-us')} {currency.coinDenom}
                                        </div>

                                        <div className="relative flex w-full flex-wrap items-stretch mb-8">
                                            <input value={amount}
                                                onChange={(e) => validate_amount(Number(e.target.value))}
                                                type="number" placeholder="0.00"
                                                className={classNames({
                                                    "p-3 rounded-lg text-sm outline-none focus:outline-none focus:ring w-full": true,
                                                    "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                                })} />
                                            <span onClick={() => setAmount(selected_from_validator && `${selected_from_validator.delegated_amount}`)} role="button" className="right-0 mr-2 lg:mr-8 flex h-full leading-snug font-normal text-center text-xs lg:text-base items-center justify-center text-slate-100 absolute bg-transparent rounded-lg  w-8 ">
                                                max
                                            </span>
                                        </div>

                                    </>

                                    <div className="flex mt-20 w-full justify-end">
                                        <button
                                            disabled={!can_continue}
                                            type="button"
                                            onClick={() => { redelegate({ amount: Number(amount), currency, from_validator: selected_from_validator, to_validator: selected_to_validator }) }}
                                            className="inline-flex justify-center rounded-md border border-zinc-400 px-4 py-2 text-xs lg:text-base font-medium text-gray-300">
                                            {
                                                isLoading && <>
                                                    <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                    <span>redelegating ...</span>
                                                </>
                                            }
                                            {
                                                !isLoading && <>
                                                    <span>redelegate</span>
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
