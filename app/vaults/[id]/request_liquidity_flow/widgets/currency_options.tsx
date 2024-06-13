import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { selectedChainState } from '@/app/state';
import { Currency } from '@/app/models/currency';
import Image from 'next/image';

type ComponentProps = {
    onOptionSelected: (option: Currency) => void,
}

export default function CurrencyOptions({ onOptionSelected }: ComponentProps) {
    const chainInfo = useRecoilValue(selectedChainState);
    const [selected, setSelected] = useState(chainInfo.request_currencies[0]);

    // Whenever selected is updated, we trigger onOptionSelected
    useEffect(() => {
        onOptionSelected(selected);
    }, [selected, onOptionSelected]);

    return (
        <span className={classNames({
            "px-4 py-2 border rounded-r-lg border-slate-500 hover:border-zinc-400": true,
            "text-slate-100 font-normal text-xs lg:text-sm": true
        })}>
            <label className='h-12 flex items-center gap-2'>
                <Image
                    src={selected.coinImageUrl}
                    alt="logo"
                    className="rounded-full"
                    width={20}
                    height={20}
                    priority
                />

                <select name="sort_options" id="sort_options"
                    className='rounded-lg bg-slate-800 px-2'
                    value={selected.coinDenom}
                    onChange={(e) => {
                        setSelected(
                            chainInfo.request_currencies
                                .find(c => c.coinDenom === e.target.value)
                        )
                    }}>
                    {
                        chainInfo.request_currencies.filter(c => c.coinDenom !== 'TEST USDC').map((option) => {
                            return <option key={option.coinDenom} value={option.coinDenom}>
                                {option.coinDenom}
                            </option>
                        })
                    }
                </select>
            </label>
        </span>

    );
}
