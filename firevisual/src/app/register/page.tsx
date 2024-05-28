import React from 'react'
import RegistrationForm from '@/components/RegistrationForm';
import Head from "next/head"

export default function register() {
  return (
    <>
      <Head>
          <title>Register - Firevisual</title>
          <meta
              name="description"
              content="All in one solution visualizing Firestore."
          />
          <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
          />
      </Head>
      <RegistrationForm />
    </>
  )
}