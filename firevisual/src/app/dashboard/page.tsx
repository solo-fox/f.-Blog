"use client"
import React from 'react'
import styled from 'styled-components'
import Head from 'next/head';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Home() {
  const { user, logOut } = useAuth();
  const router = useRouter();

  return (
    <ProtectedRoute>
      <Head>
        <title>Dashboard - Firevisual</title>
        <meta
            name="description"
            content="All in one solution visualizing Firestore."
        />
        <meta
            name="viewport"
            content="width=device-width, initial-scale=1"
        />
      </Head>
      <Main>
      </Main>
    </ProtectedRoute>
  );
}

const Main = styled.div`
  
`