'use client'

import { useSetRecoilState } from "recoil";
import { toolBarState } from "./providers";
import { useEffect } from "react";
import { useIndexVault } from "./hooks/use_index_vault";

export default function Home() {
  const setToolBarState = useSetRecoilState(toolBarState);
  const { mutate: indexVault } = useIndexVault("archway143rrddv6yahhc6nxsnfwl49t63xvv7llzctgeuwh8g9jsyk2338q20kgyj")

  useEffect(() => setToolBarState({
    title: 'Spot Account',
    show_back_nav: false
  }), [])

  return (
    <div className="h-full w-full">
      <button onClick={() => indexVault()}>test index </button>
    </div>
  )
}
