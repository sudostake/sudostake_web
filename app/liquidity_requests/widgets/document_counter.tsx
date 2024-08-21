import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '@/app/services/firebase_client';

type ComponentProps = {
    collection_path: string
}

function DocumentCounter({ collection_path }: ComponentProps) {
    const [documentCount, setDocumentCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const q = query(collection(db, collection_path), where('liquidity_request_status', '==', 'pending'));

                const querySnapshot = await getDocs(q);
                setDocumentCount(querySnapshot.size);
            } catch (error) {
                console.error("Error fetching documents:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            {documentCount}
        </>
    );
}

export default DocumentCounter;
