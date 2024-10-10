import { Dialog, Transition } from '@headlessui/react'
import classNames from 'classnames';
import { Fragment, useState } from 'react'
import { selectedChainState, validatorListState } from '@/app/state';
import { useRecoilValue } from 'recoil';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function UnbondingInfoDialog() {
    const [isOpen, setIsOpen] = useState(false);
    const { validator_unbonding_list } = useRecoilValue(validatorListState);
    const chainInfo = useRecoilValue(selectedChainState);

    return (
        <>
            <button type="button"
                onClick={() => setIsOpen(true)}
                disabled={validator_unbonding_list.length === 0}
                className="px-2 w-24 h-9 items-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 text-xs lg:text-sm lg:font-medium">
                Info
            </button>

            <Transition appear show={isOpen && Boolean(chainInfo)} as={Fragment}>
                <Dialog as="div" className="relative z-[70]" onClose={() => setIsOpen(false)}>
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
                                    "bg-slate-800 fixed w-full max-w-3xl": true,
                                    "lg:rounded-lg text-left align-middle shadow-lg": true,
                                    "transform transition-all": true,
                                    "h-full lg:h-max": true
                                })}>
                                    <span className="flex flex-col w-full h-full">
                                        <h2 className="flex items-center text-sm lg:text-base font-bold leading-6 text-gray-300 p-4 lg:p-8 border-b border-slate-500">
                                            Unbonding Details
                                            <button onClick={() => setIsOpen(false)} className="rounded-full ml-auto mr-4 lg:hidden"> <FaTimes className="w-4 h-4" /></button>
                                        </h2>


                                        <span className='flex overflow-y-auto p-4 lg:p-8'>
                                            <div className="flex-col items-center mb-2 w-full text-xs lg:text-sm">
                                                {validator_unbonding_list.map((list, index) => {
                                                    return (
                                                        <div key={index} className="relative overflow-x-auto mt-8">
                                                            <table className="table-fixed caption-top w-full text-sm text-left text-slate-400">
                                                                <caption className="mb-4 text-left">
                                                                    <span className='flex flex-row gap-4 items-center'>
                                                                        <Image
                                                                            src={`${chainInfo.validators_img_base_url}${list.address}.png`}
                                                                            alt="logo"
                                                                            className="rounded-full"
                                                                            width={32}
                                                                            height={32}
                                                                            priority
                                                                        />
                                                                        <span className='font-bold'>{list.name}</span>
                                                                    </span>
                                                                </caption>
                                                                <thead className="text-xs uppercase  bg-slate-700">
                                                                    <tr>
                                                                        <th scope="col" className="px-6 py-3">
                                                                            Amount
                                                                        </th>
                                                                        <th scope="col" className="px-6 py-3">
                                                                            Completion time
                                                                        </th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {list.entries.map((entry, e_index) => {
                                                                        return (
                                                                            <tr key={e_index} className="border-b border-slate-700">
                                                                                <th scope="row" className="px-6 py-4 font-medium whitespace-nowrap">
                                                                                    {entry.amount.toLocaleString('en-us')}
                                                                                </th>
                                                                                <td className="px-6 py-4">
                                                                                    {entry.completion_time}
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </span>
                                    </span>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}
