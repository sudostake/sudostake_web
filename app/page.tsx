'use client'

import Image from 'next/image'
import { FaBars } from 'react-icons/fa';
import { useSetRecoilState } from 'recoil';
import { sideBarToggleState } from './providers';
export default function Home() {
  // Get the recoil state for the sidebar toggle
  const setSideBarState = useSetRecoilState(sideBarToggleState);

  return (
    <div className="h-full w-full">
      <button onClick={() => setSideBarState(true)} className="rounded-full ml-auto mr-4 lg:hidden"> <FaBars className="w-6 h-6" /></button>
    </div>
  )
}
