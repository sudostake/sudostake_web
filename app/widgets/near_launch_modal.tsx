'use client';

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useLayoutEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import classNames from 'classnames';
import { FaCheckCircle, FaRegCircle, FaArrowRight, FaTools } from 'react-icons/fa';

export default function NearLaunchModal({ trigger }: { trigger: JSX.Element }) {
    const [isOpen, setIsOpen] = useState(false);
    const [documentNode, setDocumentNode] = useState<globalThis.Document>();

    useLayoutEffect(() => {
        setDocumentNode(document);
    }, []);

    const completed = [
        'Vault factory contract deployed to NEAR testnet',
    ];

    const in_progress = [
        'SudoStake NEAR AI Agent under development',
    ];

    const pending = [
        'Final testnet stress testing',
        'Audit & security reviews',
        'Mainnet deployment',
        'NEAR-native UX polish',
    ];

    const modalContent = (
        <>
            {isOpen && (
                <div
                    role="button"
                    onClick={() => setIsOpen(false)}
                    className="fixed inset-0 z-30 backdrop-blur-xs bg-white/30 dark:bg-black/20"
                />
            )}

            <Transition appear show={isOpen} as={Fragment}>
                <Dialog as="div" className="relative z-40" onClose={() => setIsOpen(false)}>
                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel
                                    className={classNames(
                                        'bg-white dark:bg-zinc-950',
                                        'shadow-lg shadow-zinc-300 dark:shadow-black',
                                        'border border-zinc-300 dark:border-zinc-800',
                                        'w-full max-w-3xl rounded-lg p-8 text-left align-middle',
                                        'transform transition-all'
                                    )}
                                >
                                    {/* NEAR Watermark */}
                                    <div className="absolute top-8 right-8 opacity-10 pointer-events-none select-none">
                                        <img
                                            src="/near.png"
                                            alt="NEAR Logo Watermark"
                                            className="w-32 h-32 object-contain dark:invert"
                                        />
                                    </div>

                                    <Dialog.Title as="h2" className="text-xl font-bold leading-6 mb-6">
                                        Roadmap to Mainnet
                                    </Dialog.Title>

                                    <div className="space-y-4 mb-8">
                                        <ul className="space-y-2">
                                            {completed.map((item, i) => (
                                                <li key={`done-${i}`} className="flex items-center gap-3 text-green-600 dark:text-green-400">
                                                    <FaCheckCircle className="w-4 h-4" />
                                                    <span className="text-sm text-gray-900 dark:text-gray-200">{item}</span>
                                                </li>
                                            ))}
                                            {in_progress.map((item, i) => (
                                                <li key={`done-${i}`} className="flex items-center gap-3 text-yellow-600 dark:text-yellow-400">
                                                    <FaTools className="w-4 h-4" />
                                                    <span className="text-sm text-gray-900 dark:text-gray-200">{item}</span>
                                                </li>
                                            ))}
                                            {pending.map((item, i) => (
                                                <li key={`todo-${i}`} className="flex items-center gap-3 text-gray-500 dark:text-gray-400">
                                                    <FaRegCircle className="w-4 h-4" />
                                                    <span className="text-sm">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex justify-end">
                                        <a
                                            href="https://github.com/sudostake/sudostake_contracts_near"
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-lg hover:opacity-90 transition"
                                        >
                                            View Progress on GitHub <FaArrowRight className="w-3 h-3" />
                                        </a>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    );

    return (
        <>
            <div role="button" onClick={() => setIsOpen(true)}>
                {trigger}
            </div>
            {documentNode && createPortal(modalContent, documentNode.body)}
        </>
    );
}
