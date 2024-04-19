import classNames from 'classnames';
import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedChainState } from '@/app/state';
import RedelegateDialog from '../dialogs/redelegate';
import UndelegateDialogButton from '../dialogs/undelegate';
import DelegateDialogButton from '../dialogs/delegate';

type ManageStakeActionsMenuProps = {
    vault_address: string,
}

export default function ManageStakeActionsMenu({ vault_address }: ManageStakeActionsMenuProps) {
    const chainInfo = useRecoilValue(selectedChainState);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative inline-block text-left py-2">
            <button onClick={() => setIsOpen(!isOpen)} className="w-24 h-9 inline-flex justify-center items-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 text-xs lg:text-sm lg:font-medium">
                Manage
            </button>

            <span role="button" onClick={() => setIsOpen(!isOpen)} className={`fixed inset-0 ${isOpen ? '' : 'hidden'}`} />

            <div className={classNames({
                "absolute right-0 mt-2 w-56 origin-top-right rounded-lg shadow-lg overflow-hidden": true,
                "divide-y divide-zinc-400 dark:divide-zinc-700": true,
                "bg-white dark:bg-zinc-900": true,
                "hidden": !isOpen
            })}>

                <div className={classNames({
                    "p-1": true,
                    "bg-white dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800": true,
                })}>
                    <DelegateDialogButton vault_address={vault_address} currency={chainInfo.src.stakeCurrency} />
                </div>

                <div className={classNames({
                    "p-1": true,
                    "bg-white dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800": true,
                })}>
                    <RedelegateDialog vault_address={vault_address} currency={chainInfo.src.stakeCurrency} />
                </div>

                <div className={classNames({
                    "p-1": true,
                    "bg-white dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800": true,
                })}>
                    <UndelegateDialogButton vault_address={vault_address} currency={chainInfo.src.stakeCurrency} />
                </div>
            </div>
        </div>
    )
}
