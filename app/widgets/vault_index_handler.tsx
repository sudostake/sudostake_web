'use client'

import { Dialog, Transition } from "@headlessui/react"
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { VaultIndexErrorState, walletState } from "../state";
import { useIndexVault } from "../hooks/use_exec";
import { FaSpinner } from "react-icons/fa";
import { WalletStatus } from "../enums/wallet_status";

export default function VaultIndexHandler() {
    const [isOpen, setIsOpen] = useState(false);
    const { status } = useRecoilValue(walletState);
    const [vault_with_index_error, setVaultWithIndexError] = useState('');
    const { mutate: indexVault, isLoading, isSuccess, isError } = useIndexVault();
    const instant_index_error = useRecoilValue(VaultIndexErrorState);

    useEffect(() => {
        const failed_to_index = localStorage.getItem('failed_vault_index');
        if (Boolean(failed_to_index) && status === WalletStatus.connected) {
            setVaultWithIndexError(failed_to_index);
            setIsOpen(true);
        } else {
            setIsOpen(false);
        }
    }, [status, instant_index_error, isSuccess, isError, setVaultWithIndexError, setIsOpen]);

    return (
        <>
            <span></span>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-30" onClose={() => { }}>
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
                                    "w-full max-w-3xl overflow-hidden rounded-lg p-8 text-center align-middle shadow-lg": true,
                                    "transform transition-all": true
                                })}>
                                    <Dialog.Title
                                        as="h2"
                                        className="text-2xl font-medium leading-6 text-gray-300">
                                        Error Indexing Data
                                    </Dialog.Title>

                                    <div className="p-8">
                                        <p className="text-xs lg:text-base text-gray-300">
                                            An error occured when trying to index your vault data to firebase
                                        </p>
                                    </div>

                                    <div className="flex mt-8 w-full justify-center">
                                        <button
                                            type="button"
                                            onClick={() => { !isLoading && indexVault(vault_with_index_error) }}
                                            className="hover:ring-1 hover:ring-offset-1 inline-flex justify-center rounded-md border border-zinc-400 px-4 py-2 text-xs lg:text-base font-medium text-gray-300">
                                            {
                                                isLoading && <>
                                                    <FaSpinner className="w-4 h-4 mr-3 spinner" />
                                                    <span>Indexing...</span>
                                                </>
                                            }
                                            {
                                                !isLoading && <>
                                                    <span>Retry</span>
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
