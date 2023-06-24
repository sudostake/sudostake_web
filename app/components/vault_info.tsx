import { FaSpinner } from "react-icons/fa";
import { useQueryVaultInfo } from "../hooks/use_query_vault_info";

export default function VaultInfo(props: any) {
    const { info } = useQueryVaultInfo(props.vault.id);

    return (
        <div className="w-full p-4 border border-current rounded grid grid-cols-1 gap-2">
            <span className="flex items-center">
                <span>ID</span>
                <span className="ml-auto">
                    #{props.vault.config.index_number}
                </span>
            </span>
            <span className="flex items-center">
                <span>CONST</span>
                <span className="ml-auto">
                    {info && info.native_balance}
                    {!info && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>USDC</span>
                <span className="ml-auto">
                    {info && info.usdc_balance}
                    {!info && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Delegated</span>
                <span className="ml-auto">
                    {info && info.total_staked}
                    {!info && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Staking Rewards</span>
                <span className="ml-auto">
                    {info && info.acc_rewards}
                    {!info && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>
            <span className="flex items-center">
                <span>Unbonding</span>
                <span className="ml-auto">
                    {info && info.unbonding}
                    {!info && <FaSpinner className="w-5 h-5 mr-3 spinner" />}
                </span>
            </span>

            <a className="mt-4 rounded border border-current p-2" target="_blank" href={`https://testnet.mintscan.io/archway-testnet/account/${props.vault['id']}`}>
                view details
            </a>
        </div>
    );
}