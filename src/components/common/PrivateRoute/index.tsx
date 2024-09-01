import { useCheckUserAuth } from '@/hooks/useAuth';
import { Suspense } from 'react';

import { Navigate, Outlet } from '@tanstack/react-router';

export default function PrivateRoute() {
  return (
    <Suspense fallback={<div>아씨발</div>}>
      <Check></Check>
    </Suspense>
  );
}

function Check() {
  const result = useCheckUserAuth();
  if (result.data) {
    return <Outlet />;
  }
  return <Navigate to="/login" replace={true} />;
}
