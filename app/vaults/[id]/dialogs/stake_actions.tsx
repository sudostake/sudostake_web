import classNames from 'classnames';
import { FaChevronDown } from 'react-icons/fa';
import DelegateDialog from './delegate_dialog';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedChainState } from '@/app/state';
import RedelegateDialog from './redelegate_dialog';

type ManageStakeActionsMenuProps = {
    vault_address: string,
}

export default function ManageStakeActionsMenu({ vault_address }: ManageStakeActionsMenuProps) {
    const chainInfo = useRecoilValue(selectedChainState);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left py-2">
            <button onClick={() => setIsOpen(!isOpen)} className="w-24 h-full inline-flex px-2 items-center border border-current rounded text-xs lg:text-sm lg:font-medium">
                <span>Manage</span>
                <FaChevronDown className="ml-2 mt-1 h-4 w-4" aria-hidden="true" />
            </button>

            <span role="button" onClick={() => setIsOpen(!isOpen)} className={`fixed inset-0 ${isOpen ? '' : 'hidden'}`} />

            <div className={classNames({
                "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-current divide-opacity-5 rounded-md shadow-lg": true,
                "bg-gray-200 dark:bg-gray-900": true,
                "ring-1 ring-current ring-opacity-5 focus:outline-none": true,
                "hidden": !isOpen
            })}>

                <div className="px-1 py-1">
                    <DelegateDialog vault_address={vault_address} currency={chainInfo.src.stakeCurrency} />
                </div>

                <div className="px-1 py-1">
                    <RedelegateDialog vault_address={vault_address} currency={chainInfo.src.stakeCurrency} />
                </div>

                <div className="px-1 py-1">
                    <button className='group flex w-full items-center rounded-md px-2 py-2 text-sm'>
                        Undelegate
                    </button>
                </div>
            </div>
        </div>
    )
}
