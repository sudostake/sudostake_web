'use client'

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toolBarState } from '../state';

export default function History() {
  const setToolBarState = useSetRecoilState(toolBarState);

  useEffect(() => setToolBarState({
    title: 'TX History',
    show_back_nav: false
  }), [setToolBarState])

  return (
    <div className="h-full w-full">

    </div>
  )
}
