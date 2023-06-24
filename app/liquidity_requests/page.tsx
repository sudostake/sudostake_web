'use client'

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toolBarState } from '../state';

export default function LiquidityRequests() {
  const setToolBarState = useSetRecoilState(toolBarState);

  useEffect(() => setToolBarState({
    title: 'Liquidity Requests',
    show_back_nav: false
  }), [setToolBarState])

  return (
    <div className="h-full w-full">

    </div>
  )
}
