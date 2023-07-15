import { RadioGroup } from '@headlessui/react'
import { FaCheckCircle } from "react-icons/fa";
import { IObjectMap, RequestOption } from '@/app/utils/generic_interface';

type ComponentProps = {
    onOptionSelected: (option: RequestOption) => void,
    default_value: RequestOption,
    options: IObjectMap<RequestOption>
}

export default function LiquidityRequestOptions({ onOptionSelected, default_value, options }: ComponentProps) {
    return (
        <div className="w-full text-gray-300">
            <RadioGroup value={options[default_value.id]} onChange={(selected) => { onOptionSelected(selected) }}>
                <RadioGroup.Label className="sr-only">Server size</RadioGroup.Label>
                <div className="space-y-4">
                    {Object.values(options).map((request_option) => (
                        <RadioGroup.Option
                            key={request_option.id}
                            value={request_option}
                            className={({ active, checked }) =>
                                `hover:ring-2 hover:ring-offset-2 border border-slate-500 relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                            }>
                            {({ active, checked }) => (
                                <div className="flex w-full items-center justify-between">
                                    <div className="flex items-center">
                                        <div className="text-sm">
                                            <RadioGroup.Label as="p" className="text-lg mb-2">
                                                {request_option.title}
                                            </RadioGroup.Label>
                                            <RadioGroup.Description as="span" className="text-xs lg:text-sm">
                                                {request_option.description}
                                            </RadioGroup.Description>
                                        </div>
                                    </div>
                                    <div className="shrink-0 text-white ml-4 w-8">
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

