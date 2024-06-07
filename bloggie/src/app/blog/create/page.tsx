import ProtectedRoute from '@/universal/ProtectedRoute';
import BlogCreateMain from "@/components/blog/BlogCreateMain"

export default function blogCreatePage() {
  return (
    <ProtectedRoute>
      <BlogCreateMain />
    </ProtectedRoute>
  )
}