import { useWithdraw } from '@/app/hooks/use_exec'
import { useQueryBalance } from '@/app/hooks/use_query'
import { Currency } from '@/app/types/currency'
import { selectedChainState } from '@/app/state'
import classNames from 'classnames'
import { useEffect, useLayoutEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useRecoilValue } from 'recoil'
import { createPortal } from 'react-dom'

type WithdrawDialogButtonProps = {
    from_address: string,
    currency: Currency
}

export default function WithdrawDialogButton({ from_address, currency }: WithdrawDialogButtonProps) {
    const [is_open, setIsOpen] = useState(false)
    const [document_node, setDocumentNode] = useState<globalThis.Document>()
    const [amount, setAmount] = useState('')

    const { mutate: withdraw, isLoading, isSuccess } = useWithdraw(from_address)
    const [to_address, setToAddress] = useState("")
    const chainInfo = useRecoilValue(selectedChainState)

    // Ensure the browser document is available
    useLayoutEffect(() => {
        setDocumentNode(document)
    })

    // Only get vault balance when the dialog is open
    const [vault_address, setVaultAddress] = useState("")
    const { balance } = useQueryBalance(vault_address, currency)
    useEffect(() => {
        if (is_open) setVaultAddress(from_address)
    }, [is_open])

    // Close the modal when the deposit is done
    useEffect(() => {
        if (isSuccess) close_modal()
    }, [isSuccess])

    function close_modal() {
        setVaultAddress("")
        setToAddress("")
        setAmount("")
        setIsOpen(false)
    }

    function handle_withdraw() {
        withdraw({
            amount: Number(amount),
            currency,
            to_address: Boolean(to_address) ? to_address : null
        })
    }

    // Validate user input to make sure it is not bigger than available balance
    function validate_amount(amount: number) {
        if (amount > Number(balance)) {
            setAmount('')
        } else {
            setAmount(`${amount}`)
        }
    }

    const modal_content = <>
        {
            is_open &&
            <div role='button' onClick={close_modal}
                className="fixed inset-0 z-[70]" />
        }

        {
            is_open &&
            <div className='z-[80] center max-w-3xl w-full max-sm:px-4 rounded-lg'>
                <div className={classNames({
                    "bg-white dark:bg-zinc-950": true,
                    "shadow-lg shadow-zinc-300 dark:shadow-black": true,
                    "border border-zinc-300 dark:border-zinc-800 rounded-lg": true,
                    "flex flex-col gap-8 w-full": true,
                    "p-8": true
                })}>
                    <h2 className="text-lg font-bold leading-6 mb-4">
                        Withdraw Tokens
                    </h2>

                    <div className='flex flex-col gap-4'>
                        <div className="text-xs lg:text-sm">
                            Available: {balance.toLocaleString('en-us')} {currency.coinDenom}
                        </div>

                        <div className="relative flex w-full flex-wrap items-stretch mb-8">
                            <input value={amount}
                                onChange={(e) => validate_amount(Number(e.target.value))}
                                type="number" placeholder="0.00"
                                className={classNames({
                                    "p-3 rounded-lg text-sm w-full relative": true,
                                    "bg-slate-100 placeholder-slate-500 text-slate-500 border border-slate-500": true,
                                    "dark:placeholder-slate-100 dark:text-slate-100 dark:bg-slate-800 border dark:border-slate-500": true,
                                })} />
                            <span onClick={() => setAmount(`${balance}`)} role="button" className="absolute right-0 mr-8 flex h-full leading-snug font-normal text-center text-base items-center justify-center  bg-transparent rounded-lg  w-8 ">
                                max
                            </span>
                        </div>
                    </div>

                    <div className='flex flex-col gap-4'>
                        <div className="flex items-center w-full text-xs lg:text-sm">
                            Optional: Provide the address to send funds to, else funds will be sent to your primary address
                        </div>

                        <input value={to_address}
                            onChange={(e) => setToAddress(e.target.value)}
                            type="text" placeholder={`Enter ${chainInfo.chain_name} address`}
                            className={classNames({
                                "p-3 rounded-lg text-sm w-full relative": true,
                                "bg-slate-100 placeholder-slate-500 text-slate-500 border border-slate-500": true,
                                "dark:placeholder-slate-100 dark:text-slate-100 dark:bg-slate-800 border dark:border-slate-500": true,
                            })} />
                    </div>

                    <div className="flex mt-20 w-full justify-end">
                        <button
                            disabled={!Boolean(amount) || isLoading}
                            type="button"
                            onClick={handle_withdraw}
                            className="inline-flex items-center justify-center rounded-md border border-zinc-400 px-4 py-2 text-xs lg:text-base font-medium">
                            {
                                isLoading && <>
                                    <FaSpinner className="w-4 h-4 mr-3 spinner" />
                                    <span>processing</span>
                                </>
                            }
                            {
                                !isLoading && <>
                                    <span>withdraw</span>
                                </>
                            }
                        </button>
                    </div>
                </div>
            </div>
        }
    </>

    return (
        <>
            <button onClick={() => setIsOpen(true)} className="items-center border border-zinc-400 dark:border-zinc-700 rounded-lg hover:ring-1 hover:ring-offset-1 w-24 h-9 text-xs lg:text-sm lg:font-medium">
                Withdraw
            </button>

            {document_node && createPortal(
                modal_content,
                document_node.body
            )}
        </>
    )
}
