'use client';

import { useEffect, useState, ReactNode } from 'react'; 
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const router = useRouter();
  const isAuthenticated = false; 
  const [loading, setLoading] = useState(true); 
  useEffect(() => {
   
    if (!isAuthenticated) {
      router.push('/login'); 
    } else {
      setLoading(false); 
    }
  }, [isAuthenticated, router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  return isAuthenticated ? <>{children}</> : null; 
};

export default ProtectedRoute;
