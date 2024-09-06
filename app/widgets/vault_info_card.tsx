import { FaCircle, FaSpinner } from "react-icons/fa";
import { useQueryVaultMetaData } from "../hooks/use_query";
import { useRecoilValue } from "recoil";
import { selectedChainState } from "../state";
import classNames from "classnames";
import Image from "next/image";
import { format_for_diaplay } from "../utils/conversion";
import VaultInfoMenu from "./vault_info_menu";
import { VaultIndex } from "../types/vault_index";

type ComponentProps = {
    vault_info: VaultIndex
}
export default function VaultInfoCard({ vault_info }: ComponentProps) {
    const { vault_metadata } = useQueryVaultMetaData(vault_info.id);
    const chainInfo = useRecoilValue(selectedChainState);
    const usd_currency = chainInfo.request_currencies.find(currency => currency.coinDenom === 'USDC');
    const vault_status_color = vault_info.liquidity_request_status === 'pending' && 'text-orange-500' ||
        vault_info.liquidity_request_status === 'active' && 'text-green-500';
    const native_balance = vault_metadata && format_for_diaplay(vault_metadata.native_balance);
    const usdc_balance = vault_metadata && format_for_diaplay(vault_metadata.usdc_balance);

    return (
        <div className={
            classNames({
                "w-full flex flex-col gap-2": true,
            })
        }>
            <span className="flex flex-row items-center justify-between">
                <span className="flex flex-row items-center gap-4 mb-4">
                    <span>#{vault_info.index_number}</span>
                    {
                        vault_info.liquidity_request_status !== 'idle' &&
                        <FaCircle className={`w-4 h-4 mr-3 ${vault_status_color}`} />
                    }
                </span>

                <VaultInfoMenu vault_info={vault_info} />
            </span>


            <span className="flex flex-row gap-2 items-center">
                <Image
                    src={chainInfo.chain_logo_url}
                    alt="logo"
                    className="rounded-full"
                    width={20}
                    height={20}
                    priority
                />
                <span>{chainInfo.stakeCurrency.coinDenom}</span>
                <span className="ml-auto">
                    {native_balance}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 spinner" />}
                </span>
            </span>


            <span className="flex flex-row gap-2 items-center">
                <Image
                    src="/usdc.png"
                    alt="logo"
                    className="rounded-full"
                    width={20}
                    height={20}
                    priority
                />
                <span>{usd_currency.coinDenom}</span>
                <span className="ml-auto">
                    {usdc_balance}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 spinner" />}
                </span>
            </span>

            <span className="h-4 flex items-center">
                <span className="flex grow border-b border-zinc-200 dark:border-zinc-900"></span>
            </span>

            <span className="flex items-center">
                <span>Delegated</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.total_staked).toLocaleString('en-us')}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Rewards</span>
                <span className="ml-auto">
                    {vault_metadata && Number(vault_metadata.acc_rewards).toLocaleString('en-us')}
                    {!vault_metadata && <FaSpinner className="w-5 h-5 spinner" />}
                </span>
            </span>

            {
                vault_metadata && vault_metadata.unbonding_details.total_unbonding_amount > 0 &&
                <span className="flex items-center">
                    <span>Unbonding</span>
                    <span className="ml-auto">
                        {vault_metadata.unbonding_details.total_unbonding_amount.toLocaleString('en-us')}
                    </span>
                </span>
            }
        </div>
    );
}
