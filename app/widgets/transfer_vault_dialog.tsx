import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useState } from 'react'
import { useTransferVaultOwnership } from '../hooks/use_exec';
import { FaSpinner } from 'react-icons/fa';
import { VaultIndex } from '../utils/interface';

type ComponentProps = {
    vault_info: VaultIndex
}

export default function TransferVaultDialog({ vault_info }: ComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [address, setAddress] = useState("");
    const { mutate: transferVault, isLoading } = useTransferVaultOwnership(vault_info);

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button type="button" onClick={openModal} className="flex items-center justify-center border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium p-2">
                Transfer
            </button>

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
                                        Transfer Vault: ID #{vault_info.index_number}
                                    </Dialog.Title>

                                    <div className="mt-2 mb-8">
                                        <p className="text-xs lg:text-base text-gray-300">
                                            Enter the recipient&apos;s address below
                                        </p>
                                    </div>

                                    <input value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        type="text" placeholder="arch..."
                                        className={classNames({
                                            "p-3 rounded-lg text-sm outline-none focus:outline-none focus:ring w-full": true,
                                            "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                        })} />

                                    <div className="flex mt-20 w-full justify-end">
                                        <button
                                            disabled={!Boolean(address)}
                                            type="button"
                                            onClick={() => { !isLoading && transferVault(address) }}
                                            className="inline-flex justify-center rounded-md border border-current px-4 py-2 text-xs lg:text-base font-medium text-gray-300">
                                            {
                                                isLoading && <>
                                                    <FaSpinner className="w-5 h-5 mr-3 spinner" />
                                                    <span>transferring ...</span>
                                                </>
                                            }
                                            {
                                                !isLoading && <>
                                                    <span>transfer</span>
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
