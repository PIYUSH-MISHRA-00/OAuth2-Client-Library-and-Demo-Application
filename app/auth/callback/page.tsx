"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { StateStorage } from '@/lib/oauth2/storage';
import { AlertTriangle } from "lucide-react";

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      const code = searchParams.get('code');
      const state = searchParams.get('state');
      const savedState = StateStorage.getState();
      const codeVerifier = StateStorage.getCodeVerifier();

      if (!code || !state) {
        setError('Missing required parameters');
        return;
      }

      if (state !== savedState) {
        setError('Invalid state parameter');
        return;
      }

      try {
        // Exchange code for tokens using a serverless function or external service
        // For demo purposes, we'll just redirect to home
        StateStorage.clearState();
        StateStorage.clearCodeVerifier();
        router.push('/');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('Authentication failed');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
        <div className="text-center space-y-6">
          <AlertTriangle className="w-16 h-16 text-red-500 mx-auto" />
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Authentication Error
          </h1>
          <p className="text-gray-500 dark:text-gray-400">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Completing authentication...</p>
      </div>
    </div>
  );
}