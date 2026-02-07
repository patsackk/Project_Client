'use client';

const LogoutButton = () => {
  const handleLogout = () => {
    // Add your logout logic here (e.g., remove token, clear session, etc.)
    console.log('User logged out');
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded"
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
