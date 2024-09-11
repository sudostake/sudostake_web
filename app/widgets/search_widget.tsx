'use client'

import { Dialog, Transition } from "@headlessui/react";
import classNames from "classnames";
import { Fragment, useLayoutEffect, useState } from "react";
import { FaSearch, FaCaretRight } from "react-icons/fa";
import { useQueryVaultInfo } from "../hooks/use_query";
import Link from "next/link";
import { createPortal } from "react-dom";

export default function SearchWidget() {
    const [is_open, setIsOpen] = useState(false);
    const [document_node, setDocumentNode] = useState<globalThis.Document>();
    const [search_query, setSearchQuery] = useState("");
    const { vault_info } = useQueryVaultInfo(search_query);

    useLayoutEffect(() => {
        setDocumentNode(document);
    });

    async function paste_text_from_clipboart() {
        setSearchQuery(await navigator.clipboard.readText());
    }

    function close_modal() {
        setSearchQuery("")
        setIsOpen(false)
    }

    const modal_content = <>
        {
            is_open &&
            <div role='button' onClick={close_modal}
                className="fixed inset-0 z-30" />
        }

        <Transition appear show={is_open} as={Fragment}>
            <Dialog as="div" className="relative z-40" onClose={close_modal}>
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
                                "bg-white dark:bg-zinc-950": true,
                                "shadow-lg shadow-zinc-300 dark:shadow-black": true,
                                "border border-zinc-300 dark:border-zinc-800": true,
                                "w-full max-w-3xl overflow-hidden rounded-lg p-8 text-left align-middle shadow-2xl": true,
                                "transform transition-all": true
                            })}>
                                <Dialog.Title
                                    as="h2"
                                    className="text-lg font-bold leading-6 mb-4">
                                    Enter the vault address
                                </Dialog.Title>

                                <div className="flex flex-row gap-4 mb-12">
                                    <input value={search_query}
                                        onChange={(e) => { setSearchQuery(e.target.value) }}
                                        type="string" placeholder="Enter vault address"
                                        className={classNames({
                                            "p-3 rounded-lg text-sm w-full relative": true,
                                            "bg-slate-100 placeholder-slate-500 text-slate-500  border border-slate-500": true,
                                            "dark:placeholder-slate-100 dark:text-slate-100  dark:bg-slate-800 border dark:border-slate-500": true,
                                        })} />

                                    {
                                        !Boolean(search_query) &&
                                        <button onClick={() => paste_text_from_clipboart()}>
                                            paste
                                        </button>
                                    }

                                    {
                                        Boolean(search_query) &&
                                        <button onClick={() => setSearchQuery("")}>
                                            clear
                                        </button>
                                    }
                                </div>

                                {
                                    vault_info && Boolean(search_query) &&
                                    <Link passHref href={(`/vaults/${vault_info.id}`)}
                                        className="relative flex w-full items-center gap-4 text-blue-600" role="button">
                                        <span>Vault Number {vault_info.index_number}</span>
                                        <FaCaretRight className="w-5 h-5" />
                                    </Link>
                                }
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    </>;

    return (
        <>
            <button onClick={() => setIsOpen(true)}>
                <FaSearch className="w-5 h-5" />
            </button>

            {document_node && createPortal(
                modal_content,
                document_node.body
            )}
        </>
    );
}
