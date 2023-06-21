'use client'

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toolBarState } from '../providers';

export default function Governance() {
  const setToolBarState = useSetRecoilState(toolBarState);

  useEffect(() => setToolBarState({
    title: 'Governance',
    show_back_nav: false
  }), [setToolBarState])

  return (
    <div className="h-full w-full">

    </div>
  )
}
