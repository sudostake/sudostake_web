import classNames from 'classnames';
import { FaChevronDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedChainState } from '@/app/state';
import { Currency } from '@/app/utils/interface';

type ComponentProps = {
    onOptionSelected: (option: Currency) => void,
}

export default function CurrencyOptions({ onOptionSelected }: ComponentProps) {
    const [isOpen, setIsOpen] = useState(false);
    const chainInfo = useRecoilValue(selectedChainState);
    const [selected, setSelected] = useState(chainInfo.request_denoms[0]);

    function handle_click(denom: Currency) {
        setIsOpen(!isOpen);
        setSelected(denom);
    }

    // Whenever selected is updated, we trigger onOptionSelected
    useEffect(() => {
        onOptionSelected(selected);
    }, [selected, onOptionSelected]);

    return (
        <div className="relative inline-block text-left">
            <span role='button' onClick={() => setIsOpen(!isOpen)} className={classNames({
                "font-normal text-left text-xs lg:text-sm text-slate-100 bg-transparent w-12": true,
                "flex h-full w-28 px-4 leading-snug items-center justify-center": true,
                "p-3 border rounded-r-lg border-slate-500 hover:border-zinc-400": true
            })}>
                {selected.coinDenom}
                <FaChevronDown className="ml-auto h-4 w-4" aria-hidden="true" />
            </span>

            <span role="button" onClick={() => setIsOpen(!isOpen)} className={`fixed inset-0 ${isOpen ? '' : 'hidden'}`} />

            <div className={classNames({
                "absolute right-0 mt-2 w-56 origin-top-right divide-y divide-current divide-opacity-5 rounded-md shadow-lg": true,
                "bg-white dark:bg-gray-900": true,
                "ring-1 ring-current ring-opacity-5 focus:outline-none": true,
                "hidden": !isOpen
            })}>

                {[chainInfo.request_denoms[0]].map((currency) => {
                    return (
                        <div key={currency.coinMinimalDenom} className="px-1 py-1">
                            <button onClick={() => { handle_click(currency) }} className='group flex w-full items-center p-2 text-xs lg:text-sm'>
                                {currency.coinDenom}
                            </button>
                        </div>
                    );
                })}

            </div>
        </div>
    )
}
