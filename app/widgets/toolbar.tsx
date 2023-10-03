'use client'

import classNames from 'classnames';
import { FaChevronLeft, FaBars } from 'react-icons/fa';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { sideBarToggleState, toolBarState } from '../state';
import { useRouter } from 'next/navigation'

export default function ToolBar() {
    const router = useRouter()
    const toolbarInfo = useRecoilValue(toolBarState);
    const setSideBarState = useSetRecoilState(sideBarToggleState);

    return (
        <div className={
            classNames({
                "fixed flex items-center": true,
                "w-full h-20 lg:h-24": true,
                "py-4 px-4 lg:px-8 lg:ml-80": true,
                "border-b border-current": true,
                "bg-gray-200 dark:bg-black": true,
            })
        }>
            <button
                onClick={() => { toolbarInfo.show_back_nav && router.back() }}
                className="flex items-center rounded-full">
                {toolbarInfo.show_back_nav &&
                    <FaChevronLeft className="w-6 h-6 mr-5" />
                }
                <span className="text-lg lg:text-2xl font-medium">
                    {toolbarInfo.title}
                </span>
            </button>

            {
                !toolbarInfo.show_back_nav &&
                <span className="flex grow" onClick={() => setSideBarState(true)}>
                    <button
                        className="rounded-full ml-auto lg:hidden">
                        <FaBars className="w-5 h-5" />
                    </button>
                </span>
            }
        </div>
    )
}
