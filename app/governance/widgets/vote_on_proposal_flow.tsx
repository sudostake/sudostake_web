import { Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useState } from 'react'
import { Decision, IObjectMap, VotingVault, WalletStatusTypes } from '@/app/utils/interface';
import Markdown from 'react-markdown';
import { useQueryVotingVaultsForProposal } from '@/app/hooks/use_query';
import { useRecoilValue } from 'recoil';
import { walletState } from '@/app/state';
import ConnectWalletOptions from '@/app/widgets/connect_wallet_options';
import VoteOptions from './vote_options';
import { FaCheckSquare, FaSpinner } from "react-icons/fa"
import { useVoteOnProposal } from '@/app/hooks/use_exec';

type ComponentProps = {
    proposal: IObjectMap<any>,
}
export default function VoteOnProposalFlow({ proposal }: ComponentProps) {
    const { status } = useRecoilValue(walletState);
    const [isOpen, setIsOpen] = useState(false);
    const [step_history, setStepHistory] = useState<number>(0);
    const [selected_vote_option, setSelectedVoteOption] = useState<Decision>(null);

    const [selected_vaults_map, setSelectedVaults] = useState<IObjectMap<VotingVault>>({});
    const can_vote = Object.keys(selected_vaults_map).length > 0;

    const { mutate: vote, isLoading: is_voting, isSuccess } = useVoteOnProposal(proposal.proposal_id);

    const { voting_vaults, isLoading: is_loading_voting_vaults } = useQueryVotingVaultsForProposal(
        proposal.proposal_id,
        Boolean(selected_vote_option) && step_history === 2
    );

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function handle_select_voting_vault(selected: VotingVault) {
        const current_selection = { ...selected_vaults_map };
        const is_selected = current_selection[selected.vault.id];

        if (is_selected) {
            delete current_selection[selected.vault.id]
        } else {
            current_selection[selected.vault.id] = selected;
        }

        setSelectedVaults({
            ...current_selection
        });
    }

    function handle_vote_on_proposal() {
        !is_voting && vote({
            vaults: Object.values(selected_vaults_map),
            decision: selected_vote_option
        });
    }

    return (
        <>
            <button onClick={openModal} className={classNames({
                "flex items-center justify-center h-9 mt-auto hover:ring-1 hover:ring-offset-1 text-xs lg:text-sm lg:font-medium p-2": true,
                "border border-zinc-400 dark:border-zinc-700 rounded-lg": true
            })}>
                Vote
            </button>

            {
                isOpen &&
                <div role='button' onClick={closeModal} className="fixed inset-0 bg-opacity-80 backdrop-blur-xs" />
            }

            <Transition appear show={isOpen} as={Fragment}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >

                    <div className={
                        classNames({
                            "flex flex-col h-full absolute inset-0 z-30": true,
                            "bg-white dark:bg-zinc-950": true,
                            "shadow-lg shadow-zinc-300 dark:shadow-black": true,
                            "lg:border border-zinc-300 dark:lg:border-zinc-800": true,
                            "w-full max-w-2xl": true,
                            "ml-auto mr-auto": true,
                            "dark:text-zinc-200": true,
                        })
                    }>
                        {
                            step_history === 0 &&
                            <>
                                <div className='flex flex-row items-center p-8 h-20'>
                                    <span className='text-lg'>Full Description</span>
                                    <span role='button' onClick={(() => setIsOpen(false))} className='ml-auto'>Close</span>
                                </div>
                                <div className='flex-grow overflow-y-scroll overscroll-contain p-8'>
                                    <Markdown>
                                        {proposal.summary}
                                    </Markdown>
                                </div>
                                <div className='flex flex-row items-center p-8 h-20'>
                                    <span role='button' onClick={(() => setIsOpen(false))}>Close</span>
                                    <span role='button' onClick={() => { setStepHistory(1) }}
                                        className='flex items-center ml-auto h-20'>Next</span>
                                </div>
                            </>
                        }

                        {
                            step_history === 1 &&
                            <>
                                <div className='flex flex-row items-center p-8 h-20'>
                                    <span className='text-lg'>Select Vote Option</span>
                                    <span role='button' onClick={(() => setIsOpen(false))} className='ml-auto'>Close</span>
                                </div>
                                {
                                    status === WalletStatusTypes.connected &&
                                    <>
                                        <div className='flex-grow overflow-y-scroll overscroll-contain p-8'>
                                            <VoteOptions default_value={selected_vote_option} onOptionSelected={(option) => { setSelectedVoteOption(option) }} />
                                        </div>
                                        <div className='flex flex-row items-center p-8 h-20'>
                                            <span role='button' onClick={() => { setStepHistory(0) }}>Prev</span>
                                            <button disabled={!Boolean(selected_vote_option)} onClick={() => { setStepHistory(2) }}
                                                className='flex items-center ml-auto h-20'>Next</button>
                                        </div>
                                    </>
                                }

                                {
                                    status !== WalletStatusTypes.connected &&
                                    <>
                                        <div className='flex-grow overflow-y-scroll overscroll-contain p-8'>
                                            <ConnectWalletOptions title="Connect wallet to vote." />
                                        </div>
                                        <div className='flex flex-row items-center p-8 h-20'>
                                            <span role='button' onClick={() => { setStepHistory(0) }}>Prev</span>
                                            <button disabled={!Boolean(selected_vote_option)} onClick={() => { setStepHistory(2) }}
                                                className='flex items-center ml-auto h-20'>Close</button>
                                        </div>
                                    </>
                                }
                            </>
                        }

                        {
                            step_history === 2 &&
                            <>
                                <div className='flex flex-row items-center p-8 h-20'>
                                    <span className='text-lg'>Select Vaults</span>
                                    <span role='button' onClick={(() => setIsOpen(false))} className='ml-auto'>Close</span>
                                </div>

                                {
                                    is_loading_voting_vaults &&
                                    <div className="flex w-full h-full items-center justify-center">
                                        <h2 className="flex items-center"><FaSpinner className="w-6 h-6 mr-3 spinner" /> <span>Loading...</span></h2>
                                    </div>
                                }

                                {
                                    !is_loading_voting_vaults &&
                                    <div className='flex-grow overflow-y-scroll overscroll-contain py-8'>
                                        <div className='flex flex-col divide-y divide-zinc-300 dark:divide-zinc-900'>
                                            {voting_vaults.map((voting_vault) => {
                                                return (
                                                    <span role='button' key={voting_vault.vault.id} onClick={() => { handle_select_voting_vault(voting_vault) }}
                                                        className="flex items-center py-4 px-8 hover:bg-zinc-300 dark:hover:bg-zinc-800 cursor-pointer">

                                                        <span>
                                                            {
                                                                selected_vaults_map[voting_vault.vault.id] &&
                                                                <FaCheckSquare className="w-5 h-5 mr-8" />
                                                            }

                                                            {
                                                                !selected_vaults_map[voting_vault.vault.id] &&
                                                                <div className="w-5 h-5 mr-8 border-2 border-current" />
                                                            }
                                                        </span>

                                                        <span>Vault Number {voting_vault.vault.index_number}</span>
                                                        <span className="ml-auto">
                                                            {
                                                                voting_vault.has_voted &&
                                                                <span>Voted</span>
                                                            }

                                                            {
                                                                !voting_vault.has_voted &&
                                                                <span>{voting_vault.vault.tvl}</span>
                                                            }
                                                        </span>
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                }

                                <div className='flex flex-row items-center p-8 h-20'>
                                    <span role='button' onClick={() => { setStepHistory(1) }}>Prev</span>
                                    <button className='flex items-center ml-auto h-20'
                                        onClick={() => setStepHistory(3)}
                                        disabled={!can_vote}>Next</button>
                                </div>
                            </>
                        }

                        {
                            step_history === 3 &&
                            <>
                                <div className='flex flex-row items-center p-8 h-20'>
                                    <span className='text-lg'>Voting Summary</span>
                                    <span role='button' onClick={(() => setIsOpen(false))} className='ml-auto'>Close</span>
                                </div>
                                <div className='flex-grow overflow-y-scroll overscroll-contain p-8'>
                                    <div className="flex w-full h-full items-center justify-center">
                                        <h2 className="flex items-center">
                                            Vote {selected_vote_option.title} on proposal {proposal.proposal_id} with vault(s) {Object.values(selected_vaults_map).map(v => v.vault.index_number).join(', ')}
                                        </h2>
                                    </div>
                                </div>
                                <div className='flex flex-row items-center p-8 h-20'>
                                    <span role='button' onClick={() => { setStepHistory(2) }}>Back</span>
                                    <span role='button' onClick={handle_vote_on_proposal}
                                        className='flex items-center ml-auto h-20'>
                                        {
                                            is_voting && <>
                                                <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                <span>Voting...</span>
                                            </>
                                        }
                                        {
                                            !is_voting && <>
                                                <span>Vote</span>
                                            </>
                                        }
                                    </span>
                                </div>
                            </>
                        }
                    </div>
                </Transition.Child>
            </Transition>
        </>
    )
}
