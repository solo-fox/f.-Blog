import ProtectedRoute from '@/universal/ProtectedRoute';
import DashboardMain from '@/components/dashboard/DashboardMain'

export default function dashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardMain />
    </ProtectedRoute>
  );
}