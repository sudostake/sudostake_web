'use client'

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toolBarState } from '../state';
import { FaSpinner } from 'react-icons/fa';

export default function Governance() {
  const setToolBarState = useSetRecoilState(toolBarState);

  useEffect(() => setToolBarState({
    title: 'Governance',
    show_back_nav: false
  }), [setToolBarState])

  return (
    <div className="flex w-full h-full items-center justify-center">
      <h2 className="flex items-center">
        <FaSpinner className="w-6 h-6 mr-3 spinner" />
        Proposals with executable actions will appear here</h2>
    </div>
  )
}
