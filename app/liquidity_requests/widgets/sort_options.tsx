import classNames from 'classnames';
import { FaCaretDown, FaSortAmountDown, FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export enum SortOptionTypes {
    latest = 'latest',
    highest_value_locked = 'highest_value_locked',
}

export type SortOption = {
    type: SortOptionTypes,
    label: string,
    prev_label: string,
    next_label: string,
}

const sort_options: SortOption[] = [
    {
        type: SortOptionTypes.latest,
        label: 'Date',
        prev_label: 'Newer',
        next_label: 'Older'
    },
    {
        type: SortOptionTypes.highest_value_locked,
        label: 'TVL',
        prev_label: 'Higher',
        next_label: 'Lower'
    },
];

type ComponentProps = {
    on_select: (option: SortOption) => void,
}

export default function SortOptions({ on_select }: ComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selected_option, setSelectedOption] = useState<SortOption>();

    const handle_select = (option: SortOption) => {
        // Persist the selected option to local storage
        localStorage.setItem('selected_sort_option', option.type);

        // Update local component state
        setSelectedOption(option);
        setIsOpen(false);

        // Emit the selection event to the parent component
        on_select(option);
    }

    // Set a default sort option
    useEffect(() => {
        const selected_sort_option = localStorage.getItem('selected_sort_option') as SortOptionTypes
            || SortOptionTypes.latest;

        handle_select(sort_options.find(option => option.type === selected_sort_option));
    }, [])

    return (
        <div className="relative inline-block text-left py-2">
            <span onClick={() => setIsOpen(!isOpen)} className='flex items-center flex-row gap-4 border border-zinc-400 dark:border-zinc-600 rounded-lg p-2' role='button'>
                <FaSortAmountDown className="w-5 h-5" />
                <span className='text-sm lg:text-base font-medium'>
                    {selected_option && selected_option.label}
                </span>
                <FaCaretDown className="w-4 h-4" />
            </span>

            <span role="button" onClick={() => setIsOpen(!isOpen)} className={`fixed inset-0 ${isOpen ? '' : 'hidden'}`} />

            <div className={classNames({
                "absolute left-0 mt-2 w-56 origin-top-right rounded-lg shadow-lg overflow-hidden": true,
                "divide-y divide-zinc-400 dark:divide-zinc-700": true,
                "bg-white dark:bg-zinc-900": true,
                "hidden": !isOpen
            })}>
                {
                    sort_options.map((option, index) => {
                        return (
                            <div key={index}
                            className={classNames({
                                "p-1":true,
                                "bg-white dark:bg-zinc-900 hover:bg-zinc-300 dark:hover:bg-zinc-800": true,
                            })}>
                                <button onClick={() => { handle_select(option) }} className='group flex w-full items-center p-2 text-xs lg:text-sm'>
                                    <span>{option.label}</span>

                                    {
                                        selected_option && option.type === selected_option.type &&
                                        <span className='ml-auto'>
                                            <FaCheck className="w-4 h-4 text-green-500" />
                                        </span>
                                    }

                                </button>
                            </div>
                        );
                    })
                }
            </div>
        </div>
    )
}
