import { Menu } from '@headlessui/react'
import classNames from 'classnames';
import { FaChevronDown } from 'react-icons/fa';

export default function StakeActionsDropdown() {
    return (
        <Menu as="div" className="relative inline-block text-left py-2">
            <Menu.Button className="w-24 h-full inline-flex px-2 items-center border border-current rounded text-xs lg:text-sm lg:font-medium">
                <span>Manage</span>
                <FaChevronDown className="ml-2 mt-1 h-4 w-4" aria-hidden="true" />
            </Menu.Button>

            <Menu.Items className={classNames({
                "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-current divide-opacity-5 rounded-md shadow-lg": true,
                "bg-gray-200 dark:bg-gray-900": true,
                "ring-1 ring-current ring-opacity-5 focus:outline-none": true
            })}>

                <div className="px-1 py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <button className='group flex w-full items-center rounded-md px-2 py-2 text-sm'>
                                Delegate
                            </button>
                        )}
                    </Menu.Item>
                </div>

                <div className="px-1 py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <button className='group flex w-full items-center rounded-md px-2 py-2 text-sm'>
                                Redelegate
                            </button>
                        )}
                    </Menu.Item>
                </div>

                <div className="px-1 py-1">
                    <Menu.Item>
                        {({ active }) => (
                            <button className='group flex w-full items-center rounded-md px-2 py-2 text-sm'>
                                Undelegate
                            </button>
                        )}
                    </Menu.Item>
                </div>

            </Menu.Items>

        </Menu>
    )
}
