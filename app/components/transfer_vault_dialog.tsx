import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useState } from 'react'

export default function TransferVaultDialog() {
    let [isOpen, setIsOpen] = useState(false)
    const [name, setName] = useState("");

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    return (
        <>
            <button type="button" onClick={openModal} className="flex items-center  justify-center  mt-4 border border-current rounded p-2">
                transfer
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
                                    " bg-slate-800": true,
                                    "w-full max-w-lg overflow-hidden rounded p-4 text-left align-middle shadow-lg": true,
                                    "transform transition-all": true
                                })}>
                                    <Dialog.Title
                                        as="h2"
                                        className="text-lg font-bold leading-6 text-gray-400">
                                        Transfer Vault#12
                                    </Dialog.Title>

                                    <div className="mt-2 mb-8">
                                        <p className="text-gray-400">
                                            Please enter the recipient's address below
                                        </p>
                                    </div>

                                    <input value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        type="text" placeholder="arch..."
                                        className={classNames({
                                            "p-3 rounded text-sm outline-none focus:outline-none focus:ring w-full": true,
                                            "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                                        })} />

                                    <div className="flex mt-8 w-full justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-current px-4 py-2 text-sm font-medium text-gray-300"
                                            onClick={closeModal}
                                        >
                                            continue
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
