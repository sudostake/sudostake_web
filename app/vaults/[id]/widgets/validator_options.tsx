import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { FaChevronDown, FaUserShield } from 'react-icons/fa'
import classNames from 'classnames'
import { ValidatorInfo } from '@/app/state'
import { useFilteredValidators } from '@/app/hooks/use_query'

type ValidatorOptionsProps = {
    hide_zero_balance?: boolean,
    onValidatorSelected: (val: ValidatorInfo) => void
}

export default function ValidatorOptions({ onValidatorSelected, hide_zero_balance }: ValidatorOptionsProps) {
    const [selected, setSelected] = useState<ValidatorInfo>(null)
    const [query, setQuery] = useState('')
    const { filtered_list: validators } = useFilteredValidators(hide_zero_balance);

    const filteredValidators =
        query === ''
            ? validators
            : validators.filter((validator) =>
                validator.name
                    .toLowerCase()
                    .replace(/\s+/g, '')
                    .includes(query.toLowerCase().replace(/\s+/g, ''))
            );

    return (
        <Combobox value={selected}
            onChange={(val) => { setSelected(val); onValidatorSelected(val); }}>
            <div className="relative mt-1">
                <div className="relative w-full cursor-default overflow-hidden rounded-md text-left">
                    <Combobox.Input
                        className={classNames({
                            "py-3 pl-10 pr-4 w-full  border-2 border-current rounded-lg ": true,
                            " text-xs lg:text-sm w-full": true,
                            "placeholder-slate-500 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                        })}
                        placeholder='Type or select a validator name'
                        displayValue={(validator?: ValidatorInfo) => validator && validator.name}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="rounded-lg absolute inset-y-0 right-0 flex items-center pr-3">
                        <FaChevronDown
                            className="h-4 w-4 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                    <Combobox.Button className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        <FaUserShield
                            className="h-4 w-4 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                </div>

                <Combobox.Options className={classNames({
                    "absolute right-0 mt-2 w-full origin-top-right divide-y divide-current divide-opacity-1 rounded-md shadow-lg": true,
                    "bg-gray-900 z-10": true,
                    "ring-1 ring-current ring-opacity-5 focus:outline-none": true,
                    "max-h-48 overflow-auto": true
                })}>
                    {filteredValidators.length === 0 ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-rose-500 text-xs lg:text-sm">
                            No validators with delegations
                        </div>
                    ) : (
                        filteredValidators.map((validator) => (
                            <Combobox.Option
                                key={validator.address}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4`
                                }
                                value={validator}
                            >
                                {({ selected, active }) => (
                                    <span role="button">
                                        <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                                            <FaUserShield
                                                className="h-5 w-5 text-gray-400"
                                                aria-hidden="true"
                                            />
                                        </span>

                                        <span className={`block truncate mr-36 text-xs lg:text-base ${selected ? 'font-medium' : 'font-normal'} ${active || selected ? 'text-teal-600' : 'text-gray-400'}`}>
                                            {validator.name}
                                        </span>

                                        <span
                                            className={`text-xs lg:text-base absolute inset-y-0 right-0 flex items-center pr-3 ${active || selected ? 'text-teal-600' : 'text-gray-400'}`}>
                                            {Number(validator.delegated_amount).toFixed(2)}
                                        </span>
                                    </span>
                                )}
                            </Combobox.Option>
                        ))
                    )}
                </Combobox.Options>
            </div>
        </Combobox>
    )
}
