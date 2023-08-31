'use client'

import { Dialog, Transition } from "@headlessui/react"
import classNames from "classnames";
import { Fragment, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { VaultIndexErrorState, WalletStatusType, walletState } from "../state";
import { useIndexVault } from "../hooks/use_exec";
import { FaSpinner } from "react-icons/fa";

type ComponentProps = {}
export default function VaultIndexHandler({ }: ComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { status } = useRecoilValue(walletState);
    const [vault_with_index_error, setVaultWithIndexError] = useState('');
    const { mutate: indexVault, isLoading, isSuccess, isError } = useIndexVault();
    const instant_index_error = useRecoilValue(VaultIndexErrorState);

    useEffect(() => {
        const failed_to_index = localStorage.getItem('failed_vault_index');
        if (Boolean(failed_to_index) && status === WalletStatusType.connected) {
            setVaultWithIndexError(failed_to_index);
            return setIsOpen(true);
        }

        setIsOpen(false);
    }, [status, instant_index_error, isSuccess, isError, setVaultWithIndexError, setIsOpen]);

    return (
        <>
            <span></span>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => { }}>
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
                                    "w-full max-w-lg overflow-hidden rounded-lg p-8 text-center align-middle shadow-lg": true,
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
                                            className="hover:ring-2 hover:ring-offset-2 inline-flex justify-center rounded-md border border-current px-4 py-2 text-xs lg:text-base font-medium text-gray-300">
                                            {
                                                isLoading && <>
                                                    <FaSpinner className="w-5 h-5 mr-3 spinner" />
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
