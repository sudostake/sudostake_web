import { Dialog, Switch, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useEffect, useState } from 'react'
import LiquidityRequestOptions from './widgets/liquidity_request_options';
import { FaSpinner, FaTimes } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { selectedChainState } from '@/app/state';
import { useQueryVaultMetaData } from '@/app/hooks/use_query';
import { useRequestLiquidity } from '@/app/hooks/use_exec';
import { convertDenomToMicroDenom, convert_days_to_seconds } from '@/app/utils/conversion';
import CurrencyOptions from './widgets/currency_options';
import Image from 'next/image';
import { LiquidityRequestType } from '@/app/enums/liquidity_request_type';
import { Currency } from '@/app/types/currency';
import { VaultVersion } from '@/app/types/vault_version';
import { RequestOption } from '@/app/types/liquidity_request';

const liquidityRequestOptions: RequestOption[] = [
    {
        id: LiquidityRequestType.fixed_interest_rental,
        title: 'Fixed Interest Rental',
        description: 'Allow the lender to claim a fixed amount of staking rewards.',
    },
    {
        id: LiquidityRequestType.fixed_term_rental,
        title: 'Fixed Term Rental',
        description: 'Allow the lender to claim staking rewards for a fixed duration of time.',
    },
    {
        id: LiquidityRequestType.fixed_term_loan,
        title: 'Fixed Term Loan',
        description: 'Allow the lender to liquidate a fixed amount of staked tokens when you default on the loan.',
    }
]

type ComponentProps = {
    vault_address: string,
    from_code_id: number,
}
export default function RequestLiquidityFlow({ vault_address, from_code_id }: ComponentProps) {
    const { mutate: request_liquidity, isLoading, isSuccess } = useRequestLiquidity(vault_address);
    const { vault_metadata } = useQueryVaultMetaData(vault_address);
    const chainInfo = useRecoilValue(selectedChainState);
    const [isOpen, setIsOpen] = useState(false);
    const [step_history, setStepHistory] = useState<number>(0);

    // Liquidity request details
    const [selected_request_type, setSelectedRequestType] = useState(liquidityRequestOptions[0]);
    const [allow_lender_to_vote, setAllowLenderToVote] = useState(false);
    const [requested_amount, setRequestedAmount] = useState('');
    const [requested_denom, setRequestedDenom] = useState<Currency>();
    const [interest_amount, setInterestAmount] = useState('');
    const [collateral_amount, setCollateralAmount] = useState('');
    const [claimable_amount, setClaimableAmount] = useState('');
    const [duration_in_days, setDurationInDays] = useState('');

    // Check when the continue button should be active
    const is_fixed_interest_rental = selected_request_type.id === LiquidityRequestType.fixed_interest_rental;
    const is_fixed_term_rental = selected_request_type.id === LiquidityRequestType.fixed_term_rental;
    const is_fixed_term_loan = selected_request_type.id === LiquidityRequestType.fixed_term_loan;
    const can_continue =
        (is_fixed_interest_rental && Number(requested_amount) > 0 && Number(claimable_amount) > 0) ||
        (is_fixed_term_rental && Number(requested_amount) > 0 && Number(duration_in_days) > 0) ||
        (is_fixed_term_loan &&
            Number(requested_amount) > 0 && Number(duration_in_days) > 0 &&
            Number(collateral_amount) > 0);

    // Filter available liquidityRequestOptions for this vault version
    const vault_version: VaultVersion = chainInfo.vault_versions.find(v => v.code_id === from_code_id);
    const supported_request_options = vault_version.collateral_options.map(type => {
        return liquidityRequestOptions.find(option => option.id === type)
    });

    useEffect(() => {
        if (isSuccess) {
            setIsOpen(false);
        }

    }, [isSuccess]);

    function validate_duration_input(days: number) {
        setDurationInDays(`${Math.floor(days)}`);
    }

    function validate_collateral_input(amount: number) {
        if (amount > vault_metadata.total_staked) {
            setCollateralAmount('');
        } else {
            setCollateralAmount(`${amount}`);
        }
    }

    function handle_request_liquidity() {
        const staking_currency = chainInfo.stakeCurrency;
        const request_payload = (is_fixed_interest_rental && {
            request_liquidity: {
                option: {
                    fixed_interest_rental: {
                        claimable_tokens: convertDenomToMicroDenom(claimable_amount, staking_currency.coinDecimals),
                        can_cast_vote: allow_lender_to_vote,
                        requested_amount: {
                            denom: requested_denom.coinMinimalDenom,
                            amount: convertDenomToMicroDenom(requested_amount, requested_denom.coinDecimals)
                        }
                    }
                }
            }
        }) || (is_fixed_term_rental && {
            request_liquidity: {
                option: {
                    fixed_term_rental: {
                        duration_in_seconds: convert_days_to_seconds(Number(duration_in_days)),
                        can_cast_vote: allow_lender_to_vote,
                        requested_amount: {
                            denom: requested_denom.coinMinimalDenom,
                            amount: convertDenomToMicroDenom(requested_amount, requested_denom.coinDecimals)
                        }
                    }
                }
            }
        }) || (is_fixed_term_loan && {
            request_liquidity: {
                option: {
                    fixed_term_loan: {
                        duration_in_seconds: convert_days_to_seconds(Number(duration_in_days)),
                        collateral_amount: convertDenomToMicroDenom(collateral_amount, staking_currency.coinDecimals),
                        requested_amount: {
                            denom: requested_denom.coinMinimalDenom,
                            amount: convertDenomToMicroDenom(requested_amount, requested_denom.coinDecimals)
                        },
                        interest_amount: convertDenomToMicroDenom(interest_amount, requested_denom.coinDecimals),
                    }
                }
            }
        });

        request_liquidity(request_payload);
    }

    return (
        <>
            <div role="button" onClick={() => setIsOpen(true)}
                className={classNames({
                    "p-8 rounded-lg  border border-zinc-400 hover:ring-1 hover:ring-offset-1": true,
                    "text-base lg:font-medium text-center": true,
                    "flex flex-row gap-4 items-center": true
                })}
            >
                <span>Request Liquidity</span>
                <Image
                    src="https://raw.githubusercontent.com/cosmostation/chainlist/master/chain/noble/asset/usdc.png"
                    alt="logo"
                    className="rounded-full ml-auto"
                    width={32}
                    height={32}
                    priority
                />
            </div>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={() => setIsOpen(false)}>
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

                    <div className="fixed inset-0">
                        <div className="flex min-h-full items-center justify-center lg:p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95">
                                <Dialog.Panel className={classNames({
                                    "bg-slate-800 fixed w-full max-w-3xl": true,
                                    "lg:rounded-lg text-left align-middle shadow-lg": true,
                                    "transform transition-all": true,
                                    "h-full lg:h-max": true
                                })}>
                                    <span className={`${step_history !== 0 && 'hidden'} flex flex-col w-full h-full`} >
                                        <h2 className="h-20 flex items-center text-lg lg:text-2xl font-medium leading-6 text-gray-300 p-4 lg:p-8 border-b border-slate-500">
                                            Select security type
                                            <button onClick={() => setIsOpen(false)} className="rounded-full ml-auto mr-4 lg:hidden"> <FaTimes className="w-5 h-5" /></button>
                                        </h2>

                                        <span className='flex py-16 overflow-y-auto p-4 lg:p-8'>
                                            <LiquidityRequestOptions
                                                default_value={selected_request_type}
                                                options={supported_request_options}
                                                onOptionSelected={setSelectedRequestType} />
                                        </span>

                                        <div className="flex w-full justify-end mt-auto border-t border-slate-500 p-4 lg:p-8 h-20 text-gray-300">
                                            <button
                                                onClick={() => { setStepHistory(1) }}>
                                                <span>Next</span>
                                            </button>
                                        </div>
                                    </span>

                                    <span className={`${step_history !== 1 && 'hidden'} flex flex-col w-full h-full`} >
                                        <h2 className="h-20 flex items-center text-lg lg:text-2xl font-medium leading-6 text-gray-300 px-4 lg:p-8 border-b border-slate-500">
                                            {selected_request_type.title}
                                            <button onClick={() => setIsOpen(false)} className="rounded-full ml-auto mr-4 lg:hidden">
                                                <FaTimes className="w-5 h-5" />
                                            </button>
                                        </h2>

                                        <span className='flex flex-col py-16 overflow-y-auto p-4 lg:p-8'>
                                            <span className='flex flex-col w-full mb-2'>
                                                <p className='flex text-gray-300 mb-8'>{selected_request_type.description}</p>

                                                <div className="flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                                    Enter requested amount
                                                </div>

                                                <div className="relative flex flex-row w-full flex-wrap items-stretch">
                                                    <input value={requested_amount}
                                                        onChange={(e) => { setRequestedAmount(e.target.value) }}
                                                        type="number" placeholder="0.00"
                                                        className={classNames({
                                                            "flex-grow p-3 rounded-l-lg text-sm outline-none focus:outline-none focus:ring": true,
                                                            "placeholder-slate-100 text-slate-100 relative bg-slate-800 border-t border-b border-l rounded-l-lg border-slate-500": true,
                                                        })} />

                                                    <CurrencyOptions onOptionSelected={setRequestedDenom} />
                                                </div>
                                            </span>

                                            {selected_request_type.id === LiquidityRequestType.fixed_interest_rental &&
                                                <span className='flex flex-col w-full mb-8 mt-8'>
                                                    <div className="flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                                        Enter claimable tokens
                                                    </div>

                                                    <div className="relative flex w-full flex-wrap items-stretch">
                                                        <input value={claimable_amount}
                                                            onChange={(e) => { setClaimableAmount(e.target.value) }}
                                                            type="number" placeholder="0.00"
                                                            className={classNames({
                                                                "p-3 rounded-lg text-sm outline-none focus:outline-none focus:ring w-full": true,
                                                                "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                                            })} />
                                                        <span role="button" className="right-0 mr-2 lg:mr-8 flex h-full leading-snug font-normal text-left text-xs lg:text-sm items-center justify-center text-slate-100 absolute bg-transparent rounded-lg w-12 ">
                                                            {chainInfo.stakeCurrency.coinDenom}
                                                        </span>
                                                    </div>
                                                </span>
                                            }

                                            {(selected_request_type.id === LiquidityRequestType.fixed_term_rental
                                                || selected_request_type.id === LiquidityRequestType.fixed_term_loan) &&
                                                <span className='flex flex-col w-full mt-8'>
                                                    <div className="flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                                        Enter duration in days
                                                    </div>

                                                    <input value={duration_in_days}
                                                        onChange={(e) => validate_duration_input(Number(e.target.value))}
                                                        type="number" placeholder="0"
                                                        className={classNames({
                                                            "p-3 rounded-lg text-sm outline-none focus:outline-none focus:ring w-full": true,
                                                            "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                                        })} />
                                                </span>
                                            }

                                            {
                                                selected_request_type.id === LiquidityRequestType.fixed_term_loan &&
                                                <span className='flex flex-col w-full mt-8 '>
                                                    <div className="flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                                        Enter interest amount
                                                    </div>

                                                    <div className="relative flex w-full flex-wrap items-stretch">
                                                        <input value={interest_amount}
                                                            onChange={(e) => { setInterestAmount(e.target.value) }}
                                                            type="number" placeholder="0.00"
                                                            className={classNames({
                                                                "p-3 rounded-lg text-sm outline-none focus:outline-none focus:ring w-full": true,
                                                                "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                                            })} />
                                                        <span role="button" className="right-0 mr-2 lg:mr-8 flex h-full leading-snug font-normal text-left text-xs lg:text-sm items-center justify-center text-slate-100 absolute bg-transparent rounded-lg w-12 ">
                                                            {requested_denom.coinDenom}
                                                        </span>
                                                    </div>
                                                </span>
                                            }

                                            {
                                                selected_request_type.id === LiquidityRequestType.fixed_term_loan &&
                                                <span className='flex flex-col w-full mt-8'>
                                                    <div className="flex items-center mb-2 w-full text-gray-400 text-xs lg:text-sm">
                                                        Enter collateral amount: Available {vault_metadata && Number(vault_metadata.total_staked).toLocaleString('en-us')}
                                                    </div>

                                                    <div className="relative flex w-full flex-wrap items-stretch">
                                                        <input value={collateral_amount}
                                                            onChange={(e) => validate_collateral_input(Number(e.target.value))}
                                                            type="number" placeholder="0.00"
                                                            className={classNames({
                                                                "p-3 rounded-lg text-sm outline-none focus:outline-none focus:ring w-full": true,
                                                                "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                                            })} />
                                                        <span role="button" className="right-0 mr-2 lg:mr-8 flex h-full leading-snug font-normal text-left text-xs lg:text-sm items-center justify-center text-slate-100 absolute bg-transparent rounded-lg w-12 ">
                                                            {chainInfo.stakeCurrency.coinDenom}
                                                        </span>
                                                    </div>
                                                </span>
                                            }

                                            {
                                                selected_request_type.id !== LiquidityRequestType.fixed_term_loan &&
                                                <Switch.Group>
                                                    <div className="flex items-center mt-8">
                                                        <Switch.Label className="text-gray-400 text-xs lg:text-sm mr-4">
                                                            Allow lender to vote
                                                        </Switch.Label>
                                                        <Switch
                                                            checked={allow_lender_to_vote}
                                                            onChange={setAllowLenderToVote}
                                                            className={
                                                                `${allow_lender_to_vote ? 'bg-blue-600' : 'bg-gray-200'
                                                                } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}>
                                                            <span
                                                                className={`${allow_lender_to_vote ? 'translate-x-6' : 'translate-x-1'
                                                                    } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                                                            />
                                                        </Switch>
                                                    </div>
                                                </Switch.Group>
                                            }
                                        </span>

                                        <div className="flex flex-row gap-8 w-full justify-between mt-auto border-t border-slate-500 p-4 lg:p-8 h-20 text-gray-300">
                                            <button
                                                onClick={() => { setStepHistory(0) }}>
                                                <span>Back</span>
                                            </button>

                                            <button
                                                disabled={!can_continue}
                                                onClick={handle_request_liquidity}
                                            >
                                                {
                                                    isLoading &&
                                                    <span className='flex flex-row items-center'>
                                                        <FaSpinner className="w-4 h-4 mr-3 spinner" />
                                                        <span>Posting</span>
                                                    </span>
                                                }
                                                {
                                                    !isLoading && <>
                                                        <span>Post offer</span>
                                                    </>
                                                }
                                            </button>
                                        </div>
                                    </span>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition >
        </>
    )
}
