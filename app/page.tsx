'use client'

import { useSetRecoilState } from "recoil";
import { toolBarState } from "./providers";
import { useEffect } from "react";

export default function Home() {
  const setToolBarState = useSetRecoilState(toolBarState);

  useEffect(() => setToolBarState({
    title: 'Spot Account',
    show_back_nav: false
  }), [])

  return (
    <div className="h-full w-full">

    </div>
  )
}
