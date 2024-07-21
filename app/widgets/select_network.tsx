import Image from 'next/image';
import { supportedChains } from '../utils/supported_chains';
import { useRecoilState } from 'recoil';
import { selectedChainState } from '../state';

export default function SelectNetwork() {
    const [chainInfo, setSelectedChainState] = useRecoilState(selectedChainState);

    function handle_network_select(selected_chain_id: string) {
        const selected = supportedChains.find(x => x.chain_id === selected_chain_id)!;
        setSelectedChainState(selected);
        localStorage.setItem('selected_chain_id', selected_chain_id);
        // location.reload();
    }

    return (
        <>
            <label className='h-12 flex items-center gap-4'>
                <span className='size-4'>
                    <Image
                        src={chainInfo.chain_logo_url}
                        alt="logo"
                        className="rounded-full"
                        width={24}
                        height={24}
                        priority
                    />
                </span>
                <select name="supported_networks" id="supported_networks"
                    className='rounded-lg bg-zinc-200 dark:bg-zinc-900 px-2'
                    value={chainInfo.chain_id}
                    onChange={(e) => {
                        handle_network_select(e.target.value)
                    }}>
                    {
                        supportedChains.map((chain) => {
                            return <option className='flex flex-row' key={chain.chain_id} value={chain.chain_id}>
                                {chain.chain_name}
                            </option>
                        })
                    }
                </select>
            </label>
        </>
    )
}
