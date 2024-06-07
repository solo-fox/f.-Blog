import React from 'react'
import LoginForm from '@/components/login/LoginForm';
import AuthGuard from '@/universal/AuthGuard'

export default function loginPage() {
  return (
    <AuthGuard>
      <LoginForm />
    </AuthGuard>
  );
}