import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function ProtectedRoute ({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user } = useAuth();

    useEffect(() => {
        if (!user.uid) {
            router.push('/login');
        }
    }, [router, user]);

    return <div>{user ? children : null}</div>;
};