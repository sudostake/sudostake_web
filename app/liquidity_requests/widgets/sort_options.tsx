import classNames from 'classnames';
import { FaCaretDown, FaSortAmountDown, FaCheck } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export enum SortOptionTypes {
    latest = 'latest',
    highest_value_locked = 'highest_value_locked',
}

type SortOption = {
    type: SortOptionTypes,
    label: string
}

const sort_options: SortOption[] = [
    {
        type: SortOptionTypes.latest,
        label: 'Latest'
    },
    {
        type: SortOptionTypes.highest_value_locked,
        label: 'Highest TVL'
    },
];

type ComponentProps = {
    on_select: (type: SortOptionTypes) => void,
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
        on_select(option.type);
    }

    // Set a default sort option
    useEffect(() => {
        const selected_sort_option = localStorage.getItem('selected_sort_option') as SortOptionTypes
            || SortOptionTypes.latest;

        handle_select(sort_options.find(option => option.type === selected_sort_option));
    }, [])

    return (
        <div className="relative inline-block text-left py-2">
            <span onClick={() => setIsOpen(!isOpen)} className='flex items-center flex-row gap-4 border border-current rounded p-2' role='button'>
                <FaSortAmountDown className="w-5 h-5" />
                <span className='text-sm lg:text-base font-medium'>
                    {selected_option && selected_option.label}
                </span>
                <FaCaretDown className="w-4 h-4" />
            </span>

            <span role="button" onClick={() => setIsOpen(!isOpen)} className={`fixed inset-0 ${isOpen ? '' : 'hidden'}`} />

            <div className={classNames({
                "absolute left-0 mt-2 w-56 origin-top-right divide-y divide-current divide-opacity-5 rounded-md shadow-lg": true,
                "bg-gray-200 dark:bg-gray-900": true,
                "ring-1 ring-current ring-opacity-5 focus:outline-none": true,
                "hidden": !isOpen
            })}>
                {
                    sort_options.map((option, index) => {
                        return (
                            <div key={index} className="px-1 py-1">
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
