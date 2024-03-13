import { Decision, vote_options_type } from '@/app/utils/interface';
import { RadioGroup } from '@headlessui/react';
import { FaCheckCircle } from "react-icons/fa";

const vote_decisions: Decision[] = [
    {
        id: vote_options_type.yes,
        title: 'Yes',
        description: 'I agree',
    },
    {
        id: vote_options_type.no,
        title: 'No',
        description: 'I disagree',
    },
    {
        id: vote_options_type.no_with_veto,
        title: 'No with veto',
        description: 'I strongly disagree',
    },
    {
        id: vote_options_type.abstain,
        title: 'Abstain',
        description: 'Indecisive',
    },
];

type ComponentProps = {
    onOptionSelected: (option: Decision) => void,
    default_value: Decision,
}

export default function VoteOptions({ onOptionSelected, default_value: selected_option }: ComponentProps) {
    return (
        <div className="w-full">
            <RadioGroup value={selected_option} onChange={(selected) => { onOptionSelected(selected); }}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-4">
                    {vote_decisions.map((vote_option) => (
                        <RadioGroup.Option
                            key={vote_option.id}
                            value={vote_option}
                            className={({ active, checked }) =>
                                `hover:ring-1 hover:ring-offset-1 border border-zinc-600 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-sm focus:outline-none`
                            }>
                            {({ active, checked }) => (
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <RadioGroup.Label as="p" className="text-lg mb-2">
                                                {vote_option.title}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description as="span" className="text-xs lg:text-sm">
                                                <span>
                                                    {vote_option.description}
                                                </span>
                                            </RadioGroup.Description>
                                        </div>
                                    </div>
                                    <div className="shrink-0 ml-4 w-8">
                                        {checked && <FaCheckCircle className="w-6 h-6" />}
                                    </div>
                                </div>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    )
}

