// app/dashboard/page.tsx
'use client';

import ProtectedRoute from '../../components/ProtectedRoute';
import LogoutButton from '../../components/LogoutButton';      // Correct the path if necessary

export default function Dashboard() {
    return (
        <ProtectedRoute>
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
                <p className="mb-6">You are logged in. Enjoy your session!</p>
                <LogoutButton />
            </div>
        </ProtectedRoute>
    );
}
