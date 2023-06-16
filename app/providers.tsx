'use client';

import {
    RecoilRoot,
    atom,
} from 'recoil';

export const sideBarToggleState = atom({
    key: 'sideBarToggleState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
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