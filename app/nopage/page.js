"use client";

import { useUser } from "@clerk/nextjs";

export default function Npage() {
    const { isLoaded, isSignedIn, user } = useUser();

    // Wait until Clerk finishes loading
    if (!isLoaded) {
        return <p className="text-center mt-10">Loading user...</p>;
    }

    // If user is not signed in
    if (!isSignedIn) {
        return <p className="text-center mt-10 text-red-500">User not signed in</p>;
    }

    // If user is signed in
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
            <img
                src={user.imageUrl}
                alt="Profile"
                className="w-24 h-24 rounded-full mb-4 shadow-md"
            />
            <p className="text-xl font-semibold">
                {user.firstName} {user.lastName}
            </p>
            <p className="text-gray-600">{user.primaryEmailAddress?.emailAddress}</p>
        </div>
    );
}
