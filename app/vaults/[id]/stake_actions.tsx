


import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa';

export default function StakeActionsDropdown() {
    return (
        <Menu as="div" className="relative inline-block text-left py-2">
            <Menu.Button className=" h-full inline-flex px-2 items-center border border-current rounded text-xs lg:text-sm lg:font-medium">
                <span>Manage</span>
                <FaChevronDown className="ml-2 mt-1 h-4 w-4" aria-hidden="true" />
            </Menu.Button>

            <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

                <div className="px-1 py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Delegate
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Redelegate
                            </button>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({ active }) => (
                            <button
                                className={`${active ? 'bg-violet-500 text-white' : 'text-gray-900'
                                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                                Undelegate
                            </button>
                        )}
                    </Menu.Item>
                </div>

            </Menu.Items>

        </Menu>
    )
}
