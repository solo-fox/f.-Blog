"use client"

import { useParams }  from 'next/navigation'
import ProtectedRoute from '@/universal/ProtectedRoute';
import BlogEditMain from "@/components/blog/BlogEditMain"

export default function page() {
  const { id } = useParams()
  
  return (
    <ProtectedRoute>
      <BlogEditMain id={id}/>
    </ProtectedRoute>
  )
}