import ProtectedRoute from '@/universal/ProtectedRoute'
import SettingsMain from '@/components/settings/SettingsMain'

export default function settingsPage() {
  return (
    <ProtectedRoute>
      <SettingsMain />
    </ProtectedRoute>
  )
}