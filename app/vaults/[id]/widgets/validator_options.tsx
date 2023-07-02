import { useState } from 'react'
import { Combobox } from '@headlessui/react'
import { FaChevronDown, FaUserShield } from 'react-icons/fa'
import classNames from 'classnames'
import { ValidatorInfo, validatorListState } from '@/app/state'
import { useRecoilValue } from 'recoil'

type ValidatorOptionsProps = {
    onValidatorSelected: (val: ValidatorInfo) => void
}

export default function ValidatorOptions({ onValidatorSelected }: ValidatorOptionsProps) {
    const [selected, setSelected] = useState<ValidatorInfo>(null)
    const [query, setQuery] = useState('')
    const validators = useRecoilValue(validatorListState)

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
                <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-white text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                    <Combobox.Input
                        className={classNames({
                            "font-medium py-3 pl-10 pr-4 rounded text-sm outline-none focus:outline-none focus:ring w-full": true,
                            "placeholder-slate-100 text-slate-100 relative bg-slate-800 border border-slate-500": true,
                        })}
                        displayValue={(validator?: ValidatorInfo) => validator && validator.name}
                        onChange={(event) => setQuery(event.target.value)}
                    />
                    <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-3">
                        <FaChevronDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </Combobox.Button>
                    <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                        <FaUserShield
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                        />
                    </span>
                </div>

                <Combobox.Options className={classNames({
                    "absolute right-0 mt-2 w-full origin-top-right divide-y divide-current divide-opacity-1 rounded-md shadow-lg": true,
                    "bg-gray-900 z-10": true,
                    "ring-1 ring-current ring-opacity-5 focus:outline-none": true,
                    "max-h-48 overflow-auto": true
                })}>
                    {filteredValidators.length === 0 && query !== '' ? (
                        <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                            Nothing found.
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

                                        <span className={`block truncate ${selected ? 'font-medium' : 'font-normal'} ${active || selected ? 'text-teal-600' : 'text-gray-400'}`}>
                                            {validator.name}
                                        </span>

                                        <span
                                            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${active || selected ? 'text-teal-600' : 'text-gray-400'}`}>
                                            {validator.delegated_amount}
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
