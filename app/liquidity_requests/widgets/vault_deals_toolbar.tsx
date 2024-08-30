import SortOptions, { SortOption, SortOptionTypes } from './sort_options';
import { MutableRefObject, useEffect, useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { selectedChainState } from '@/app/state';
import { DocumentData, DocumentSnapshot, collection, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore';
import { db } from '@/app/services/firebase_client';
import classNames from 'classnames';
import { debounce } from 'lodash';
import { VaultIndex } from '@/app/types/vault_index';

type ComponentProps = {
    on_data: (vaults: VaultIndex[]) => void,
    list_ref: MutableRefObject<any>
}

enum CursorDirection {
    asc = 'asc',
    desc = 'desc'
}

type DataCursor = {
    dir: CursorDirection,
    cursorDoc: DocumentSnapshot<DocumentData>
}

export default function VaultDealsToolbar({ on_data, list_ref }: ComponentProps) {
    const [selected_sort_option, setSelectedSortOption] = useState<SortOption>();
    const chainInfo = useRecoilValue(selectedChainState);

    // Define params for data pagination
    const page_size = 12;
    const [newer_docs, setNewerDocs] = useState<DocumentSnapshot<DocumentData>[]>([]);
    const [current_docs, setCurrentDocs] = useState<DocumentSnapshot<DocumentData>[]>([]);
    const [older_docs, setOlderDocs] = useState<DocumentSnapshot<DocumentData>[]>([]);
    const [current_cursor, setCurrentCursor] = useState<DataCursor>(null);

    function get_base_constraints(direction: CursorDirection): any[] {
        // Query
        let constraints: any[] = [
            where("liquidity_request_status", "==", "pending"),
            limit(page_size)
        ];

        if (selected_sort_option) {
            // Order by indexed_at
            if (selected_sort_option.type === SortOptionTypes.latest) {
                constraints.push(orderBy("indexed_at", direction));
            }

            // Order by TVL
            if (selected_sort_option.type === SortOptionTypes.highest_value_locked) {
                constraints.push(orderBy("tvl", direction));
            }
        }

        return constraints;
    }

    // Subscribe to current_docs
    useEffect(() => {
        if (chainInfo && selected_sort_option) {
            let cursor_dir = CursorDirection.desc;
            let constraints: any[] = get_base_constraints(cursor_dir);

            // Get newer data that ends
            if (current_cursor && current_cursor.dir === CursorDirection.asc) {
                cursor_dir = CursorDirection.asc;
                constraints = get_base_constraints(cursor_dir);
                constraints.push(startAfter(current_cursor.cursorDoc));
            }

            // Get data that starts after current_cursor
            if (current_cursor && current_cursor.dir === CursorDirection.desc) {
                constraints.push(startAfter(current_cursor.cursorDoc));
            }

            return onSnapshot(query(collection(db, chainInfo.vault_collection_path), ...constraints), (res) => {
                const docs = cursor_dir === CursorDirection.asc ? res.docs.reverse() : res.docs;
                setCurrentDocs(docs);

                // Emit list to parent component
                const vaults = docs
                    .map((doc) => ({ ...doc.data(), id: doc.id } as VaultIndex));
                on_data(vaults);
            });
        }
    }, [chainInfo, selected_sort_option, current_cursor, setCurrentDocs]);

    // Subscribe to newer_docs
    useEffect(() => {
        if (chainInfo && selected_sort_option && current_docs && current_docs.length > 0) {
            let constraints: any[] = get_base_constraints(CursorDirection.asc);
            constraints.push(startAfter(current_docs[0]));

            return onSnapshot(query(collection(db, chainInfo.vault_collection_path), ...constraints), (res) => {
                setNewerDocs(res.docs);
            });
        }
    }, [chainInfo, selected_sort_option, current_docs, setCurrentCursor]);

    // Subscribe to older_docs
    useEffect(() => {
        if (chainInfo && selected_sort_option && current_docs && current_docs.length > 0) {
            let constraints: any[] = get_base_constraints(CursorDirection.desc);
            constraints.push(startAfter(current_docs[current_docs.length - 1]));

            return onSnapshot(query(collection(db, chainInfo.vault_collection_path), ...constraints), (res) => {
                setOlderDocs(res.docs);
            });
        }
    }, [chainInfo, selected_sort_option, current_docs]);

    // TODO disable function when isLoadingPrev
    const onPrev = debounce(() => {
        // Scroll to top of list
        list_ref.current.scrollTop = 0;

        if (newer_docs.length < page_size) {
            setCurrentCursor(null);
        } else {
            setCurrentCursor({
                dir: CursorDirection.asc,
                cursorDoc: current_docs[0]
            });
        }
    }, 300);

    // TODO disable function when isLoadingNext
    const onNext = debounce(() => {
        // Scroll to top of list
        list_ref.current.scrollTop = 0;

        setCurrentCursor({
            dir: CursorDirection.desc,
            cursorDoc: current_docs[current_docs.length - 1]
        });
    }, 300);

    function handle_select_sort_option(option: SortOption) {
        // Scroll to top of list
        list_ref.current.scrollTop = 0;

        setCurrentCursor(null);
        setSelectedSortOption(option);
    }

    return (
        <div className={
            classNames(
                "max-h-20 w-full px-4 sticky top-0",
                "flex flex-row items-center justify-between",
                "bg-opacity-80 backdrop-blur-sm",
                "border-b border-zinc-200 dark:border-zinc-800"
            )
        }>
            <SortOptions on_select={handle_select_sort_option} />

            <span className='flex items-center flex-row gap-4'>
                <button disabled={newer_docs.length === 0}
                    onClick={onPrev}
                    className={classNames({
                        'flex items-center flex-row gap-2': true,
                        'hover:ring-1 hover:ring-offset-1': newer_docs.length > 0,
                        'cursor-not-allowed': newer_docs.length === 0,
                        'opacity-40': newer_docs.length === 0
                    })}
                >
                    <FaChevronLeft className="w-4 h-4" />
                    <span className='font-medium'>
                        {selected_sort_option && selected_sort_option.prev_label}
                    </span>
                </button>

                <button disabled={older_docs.length === 0}
                    onClick={onNext}
                    className={classNames({
                        'flex items-center flex-row gap-2': true,
                        'hover:ring-1 hover:ring-offset-1': older_docs.length > 0,
                        'cursor-not-allowed': older_docs.length === 0,
                        'opacity-40': older_docs.length === 0
                    })}
                >
                    <span className='font-medium'>
                        {selected_sort_option && selected_sort_option.next_label}
                    </span>
                    <FaChevronRight className="w-4 h-4" />
                </button>
            </span>
        </div>
    )
}
