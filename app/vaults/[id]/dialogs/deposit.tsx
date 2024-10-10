import { useDeposit } from '@/app/hooks/use_exec'
import { useQueryBalance } from '@/app/hooks/use_query'
import { Currency } from '@/app/types/currency'
import { walletState } from '@/app/state'
import classNames from 'classnames'
import { useEffect, useLayoutEffect, useState } from 'react'
import { FaSpinner } from 'react-icons/fa'
import { useRecoilValue } from 'recoil'
import { createPortal } from 'react-dom'

type DepositDialogButonProps = {
    to_address: string,
    currency: Currency,
}

export default function DepositDialogButton({ to_address, currency }: DepositDialogButonProps) {
    const [is_open, setIsOpen] = useState(false)
    const [document_node, setDocumentNode] = useState<globalThis.Document>()
    const [amount, setAmount] = useState('')
    const [from_address, setFromAddress] = useState("")

    const { address } = useRecoilValue(walletState)
    const { mutate: deposit, isLoading, isSuccess } = useDeposit(to_address)
    const { balance } = useQueryBalance(from_address, currency)

    // Ensure the browser document is available
    useLayoutEffect(() => {
        setDocumentNode(document)
    })

    // Only get EOA balance when the dialog is open
    useEffect(() => {
        if (is_open) setFromAddress(address)
    }, [is_open])

    // Close the modal when the deposit is done
    useEffect(() => {
        if (isSuccess) close_modal()
    }, [isSuccess])

    function close_modal() {
        setFromAddress("")
        setAmount('')
        setIsOpen(false)
    }

    function validate_amount(amount: number) {
        if (amount > Number(balance)) {
            setAmount('')
        } else {
            setAmount(`${amount}`)
        }
    }

    function handle_deposit() {
        deposit({
            amount: Number(amount),
            currency
        })
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
                        Deposit Tokens
                    </h2>

                    <div className='flex flex-col gap-4'>
                        <div className="text-xs lg:text-sm">
                            Available: {balance.toLocaleString('en-us')} {currency.coinDenom}
                        </div>

                        <input value={amount} onChange={(e) => validate_amount(Number(e.target.value))}
                            type="number" placeholder="Enter amount to deposit"
                            className={classNames({
                                "p-3 rounded-lg text-sm w-full relative": true,
                                "bg-slate-100 placeholder-slate-500 text-slate-500 border border-slate-500": true,
                                "dark:placeholder-slate-100 dark:text-slate-100 dark:bg-slate-800 border dark:border-slate-500": true,
                            })} />
                    </div>

                    <div className="flex w-full justify-end">
                        <button
                            className="inline-flex justify-center rounded-md border border-zinc-400 px-4 py-2 text-xs lg:text-base font-medium"
                            disabled={!Boolean(amount) && isLoading} type="button" onClick={handle_deposit}
                        >
                            {
                                isLoading && <>
                                    <FaSpinner className="w-4 h-4 mr-3 spinner" />
                                    <span>depositing ...</span>
                                </>
                            }
                            {
                                !isLoading && <>
                                    <span>deposit</span>
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
                Deposit
            </button>

            {document_node && createPortal(
                modal_content,
                document_node.body
            )}
        </>
    )
}
