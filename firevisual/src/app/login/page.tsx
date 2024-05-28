import React from 'react'
import Head from 'next/head';
import LoginForm from '@/components/LoginForm';

export default function login() {
  return (
    <>
      <Head>
          <title>Firevisual</title>
          <meta
              name="description"
              content="All in one solution visualizing Firestore."
          />
          <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
          />
      </Head>
      <LoginForm />
    </>
  );
}