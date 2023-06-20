'use client'

import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { toolBarState } from '../providers';

// import firebase
import { db } from "../services/firebase_client"
import { collection, onSnapshot } from "firebase/firestore";


export default function ManageVaults() {
  const setToolBarState = useSetRecoilState(toolBarState);

  useEffect(() => setToolBarState({
    title: 'Manage Vaults',
    show_back_nav: true
  }), [])

  // Subscribe to firebase
  useEffect(() => {
    return onSnapshot(collection(db, "vaults"), (res) => {
      const source = res.metadata.hasPendingWrites ? "Local" : "Server";
      const newData = res.docs
        .map((doc) => ({ ...doc.data(), id: doc.id }));

      console.log(source, " data: ", newData);
    });
  }, []);

  return (
    <div className="h-full w-full">

    </div>
  )
}
