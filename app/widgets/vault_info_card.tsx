import { FaSpinner } from "react-icons/fa";
import { useQueryVaultMetaData } from "../hooks/use_query";
import { useRouter } from 'next/navigation';
import TransferVaultDialog from "./transfer_vault_dialog";
import { useRecoilValue } from "recoil";
import { selectedChainState } from "../state";
import { VaultIndex } from "../utils/interface";
import classNames from "classnames";

type ComponentProps = {
    vault_info: VaultIndex
}

export default function VaultInfoCard({ vault_info }: ComponentProps) {
    const { vault_metadata } = useQueryVaultMetaData(vault_info.id);
    const router = useRouter();
    const chainInfo = useRecoilValue(selectedChainState);
    const usd_currency = chainInfo.request_denoms.find(currency => currency.coinDenom === 'USDC');

    return (
        <div className={
            classNames({
                "w-full p-4 border-2 rounded-lg grid grid-cols-1 gap-2": true,
                "border-current": vault_info.liquidity_request_status === 'idle',
                "border-orange-500": vault_info.liquidity_request_status === 'pending',
                "border-green-500": vault_info.liquidity_request_status === 'active',
            })
        }>
            <span className="flex items-center">
                <span>ID</span>
                <span className="ml-auto">
                    #{vault_info.index_number}
                </span>
            </span>
            <span className="flex items-center">
                <span>{chainInfo.src.stakeCurrency.coinDenom}</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.native_balance).toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>{usd_currency.coinDenom}</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.usdc_balance).toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Delegated</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.total_staked).toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Staking Rewards</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.acc_rewards).toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Unbonding</span>
                <span className="ml-auto">
                    {vault_metadata && vault_metadata.unbonding_details.total_unbonding_amount.toFixed(2)}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 spinner" />}
                </span>
            </span>

            <span className="grid gap-4 grid-cols-2">
                <button onClick={() => { router.push(`/vaults/${vault_info.id}`) }} className="flex items-center justify-center  mt-4 border border-current rounded-lg hover:ring-2 hover:ring-offset-2 text-xs lg:text-sm lg:font-medium p-2">
                    View
                </button>
                <TransferVaultDialog key={vault_info.id} vault_info={vault_info} />
            </span>
        </div>
    );
}
