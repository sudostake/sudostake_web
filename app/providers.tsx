'use client';

import {
    RecoilRoot,
    atom,
} from 'recoil';

type ToolBarInfo = {
    title: string,
    show_back_nav: boolean,
};

export const sideBarToggleState = atom<boolean>({
    key: 'sideBarToggleState',
    default: false,
});

export const toolBarState = atom<ToolBarInfo>({
    key: 'toolBarState',
    default: {
        title: '',
        show_back_nav: false,
    },
});

export function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <RecoilRoot>
            {children}
        </RecoilRoot>
    );
}