// app/dashboard/page.tsx
'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
import LogoutButton from '../../components/LogoutButton';      // Correct the path if necessary

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <div className="card max-w-md mx-auto my-16 p-8 text-center">
                <h1 className="section-title mb-4">Welcome to the Dashboard</h1>
                <p className="mb-6 text-gray-600">You are logged in. Enjoy your session!</p>
                <LogoutButton />
            </div>
        </ProtectedRoute>
    );
}
