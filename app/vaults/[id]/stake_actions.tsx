import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FaChevronDown } from 'react-icons/fa'

export default function StakeActionsDropdown() {
    return (
        <Menu as="div" className="relative inline-block text-left w-24 z-1">
            <div>
                <Menu.Button className="flex items-center border border-current rounded w-24 text-sm p-2">
                    <span>Manage</span>
                    <FaChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
                </Menu.Button>
            </div>

            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-gray-200 dark:bg-black  shadow-lg ring-1 ring-current ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                        <Menu.Item>
                            {({ active }) => (
                                <a className="block px-4 py-2 text-sm">
                                    Delegate
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a className="block px-4 py-2 text-sm">
                                    Redelegate
                                </a>
                            )}
                        </Menu.Item>
                        <Menu.Item>
                            {({ active }) => (
                                <a className="block px-4 py-2 text-sm">
                                    Undelegate
                                </a>
                            )}
                        </Menu.Item>
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
