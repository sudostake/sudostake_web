'use client';

import { RecoilRoot } from 'recoil';
import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'

export function Providers({ children }: {
    children: React.ReactNode
}) {
    return (
        <RecoilRoot>
            <QueryClientProvider client={new QueryClient({})}>
                {children}
            </QueryClientProvider>
        </RecoilRoot>
    );
}
