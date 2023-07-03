import { FaSpinner } from "react-icons/fa";
import { useQueryVaultMetaData } from "../hooks/use_query";
import { useRouter } from 'next/navigation';
import TransferVaultDialog from "./transfer_vault_dialog";
import { useRecoilValue } from "recoil";
import { selectedChainState } from "../state";

export default function VaultInfo(props: any) {
    const { vault_metadata } = useQueryVaultMetaData(props.vault.id);
    const router = useRouter();
    const chainInfo = useRecoilValue(selectedChainState);

    return (
        <div className="w-full p-4 border border-current rounded grid grid-cols-1 gap-2">
            <span className="flex items-center">
                <span>ID</span>
                <span className="ml-auto">
                    #{props.vault.config.index_number}
                </span>
            </span>
            <span className="flex items-center">
                <span>{chainInfo.src.stakeCurrency.coinDenom}</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.native_balance).toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>{chainInfo.usdc.coinDenom}</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.usdc_balance).toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Delegated</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.total_staked).toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Staking Rewards</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.acc_rewards).toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Unbonding</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.unbonding).toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>

            <span className="grid gap-4 grid-cols-2">
                <button onClick={() => { router.push(`/vaults/${props.vault['id']}`) }} className="flex items-center justify-center mt-4 border border-current rounded p-2">
                    view
                </button>
                <TransferVaultDialog key={props.vault.id} vault={props.vault} />
            </span>
        </div>
    );
}
