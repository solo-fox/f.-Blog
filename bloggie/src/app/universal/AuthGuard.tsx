"use client"

import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

export default function AuthGuard({ children }: { children: React.ReactNode }){
	const router = useRouter();
	const { user } = useAuth();

	useEffect(() => {
		if (user.uid !== null) {
			router.back();
		}
	}, [user]);

	return <>{children}</>;
};