import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import Image from 'next/image';
import { Fragment, useState } from 'react'
import { supportedChains } from '../utils/supported_chains';
import { FaChevronRight } from 'react-icons/fa';
import { SudoStakeChainInfoSchema } from '../utils/interface';

type ComponentProps = {
    selected_chain: SudoStakeChainInfoSchema
}

export default function SelectNetworkDialog({ selected_chain: chainInfo }: ComponentProps) {
    const [isOpen, setIsOpen] = useState(false);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    function handle_network_select(selected_chain: SudoStakeChainInfoSchema) {
        localStorage.setItem('selected_chain_id', selected_chain.src.chainId);
        location.reload();
    }

    return (
        <>
            <span role="button" onClick={openModal} className="flex flex-row items-center px-4 py-2 border-t border-zinc-400 dark:border-zinc-700">
                <Image
                    src={chainInfo.src.chainSymbolImageUrl}
                    alt="logo"
                    className="rounded-full"
                    width={24}
                    height={24}
                    priority
                />

                <span className="ml-6 text-sm lg:text-base font-medium">{chainInfo.src.chainName}</span>
                <span className="ml-auto"><FaChevronRight className="w-4 h-4" /></span>
            </span>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={closeModal}>
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
                                    "w-full max-w-xl overflow-hidden rounded-lg p-8 text-left align-middle shadow-lg": true,
                                    "transform transition-all": true
                                })}>
                                    <Dialog.Title
                                        as="h1"
                                        className="text-lg font-bold leading-6 text-gray-300 text-center">
                                        Select your network
                                    </Dialog.Title>

                                    <div className="mt-8 mb-16 grid grid-cols-1 gap-8 md:grid-cols-2">
                                        {supportedChains.map((chain, index) => {
                                            return (
                                                <div key={index} className="w-full rounded-lg grid grid-cols-1 gap-4">
                                                    <span role='button' onClick={() => handle_network_select(chain)}
                                                        className="flex flex-row gap-4 items-center justify-center mt-4 border border-zinc-400 rounded-lg hover:ring-1 hover:ring-offset-1 text-xs lg:text-sm lg:font-medium p-2 text-gray-300">
                                                        <Image
                                                            src={chainInfo.src.chainSymbolImageUrl}
                                                            alt="logo"
                                                            className="rounded-full"
                                                            width={24}
                                                            height={24}
                                                            priority
                                                        />
                                                        <span>
                                                            {chain.src.chainName}
                                                        </span>
                                                    </span>
                                                </div>
                                            );
                                        })}
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
