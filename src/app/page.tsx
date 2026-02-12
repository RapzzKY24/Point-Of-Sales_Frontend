"use client";
import { useAuth } from "@/features/auth/context/AuthContext";

export default function Home() {
  const { user, isAuthenticated, isLoading, logout } = useAuth();

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Home Page</h1>

        {isAuthenticated && user ? (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-green-600">
                Welcome, {user.name}!
              </h2>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Role:</strong> {user.role}
              </p>
              <p>
                <strong>Email Verified:</strong>{" "}
                {user.emailVerified ? "Yes" : "No"}
              </p>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-700">
              Welcome to Our App
            </h2>
            <p className="mb-4">Please login to access your account</p>
            <a
              href="/auth/login"
              className="inline-block bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors"
            >
              Go to Login
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
