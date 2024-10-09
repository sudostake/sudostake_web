import { FaSortAmountDown } from 'react-icons/fa';
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
    const [selected_option, setSelectedOption] = useState<SortOption>();

    const handle_select = (selected_type: SortOptionTypes) => {
        // Find selected option
        const option = sort_options.find(option => option.type === selected_type);

        // Persist the selected option to local storage
        localStorage.setItem('selected_sort_option', option.type);

        // Update local component state
        setSelectedOption(option);

        // Emit the selection event to the parent component
        on_select(option);
    }

    // Set a default sort option
    useEffect(() => {
        const selected_sort_option = localStorage.getItem('selected_sort_option') as SortOptionTypes
            || SortOptionTypes.latest;

        handle_select(selected_sort_option);
    }, [])

    return (
        <>
            {
                selected_option &&
                <label className='h-12 flex items-center gap-4'>
                    <span>
                        Sort by
                    </span>
                    <select name="sort_options" id="sort_options"
                        className='rounded-lg bg-zinc-200 dark:bg-zinc-900 px-2'
                        value={selected_option.type}
                        onChange={(e) => {
                            handle_select(e.target.value as SortOptionTypes)
                        }}>
                        {
                            sort_options.map((option) => {
                                return <option key={option.type} value={option.type}>
                                    {option.label}
                                </option>
                            })
                        }
                    </select>
                </label>
            }
        </>
    )
}
