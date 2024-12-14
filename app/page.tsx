"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { LogIn } from "lucide-react";

export default function Home() {
  const handleLogin = () => {
    window.location.href = '/api/auth/login';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6 bg-white dark:bg-gray-800 shadow-lg">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            OAuth2 Demo
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Sign in using your preferred OAuth provider
          </p>
        </div>

        <div className="space-y-4">
          <Button
            onClick={handleLogin}
            className="w-full flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            Sign In with Auth0
          </Button>
        </div>

        <div className="text-center text-sm text-gray-500 dark:text-gray-400">
          By signing in, you agree to our Terms of Service and Privacy Policy
        </div>
      </Card>
    </div>
  );
}