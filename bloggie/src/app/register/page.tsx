import React from 'react'
import RegistrationForm from '@/components/register/RegistrationForm';
import AuthGuard from '@/universal/AuthGuard'

export default function registerPage() {
  return (
    <AuthGuard>
      <RegistrationForm />
    </AuthGuard>
  )
}