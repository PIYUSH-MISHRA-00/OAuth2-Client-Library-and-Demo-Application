"use client";

import { useEffect, useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { UserInfo } from '@/lib/oauth2/types';
import { UserService } from '@/lib/oauth2/user-service';
import { TokenManager } from '@/lib/oauth2/token-manager';
import { useRouter } from 'next/navigation';
import { LogOut, Loader2 } from "lucide-react";

export default function ProfilePage() {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const userService = new UserService(`https://${process.env.NEXT_PUBLIC_AUTH0_DOMAIN}`);
        const userInfo = await userService.getUserInfo();
        setUser(userInfo);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        router.push('/');
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleLogout = () => {
    TokenManager.clearTokens();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-6 space-y-6">
        <div className="text-center space-y-4">
          {user?.picture && (
            <img
              src={user.picture}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto"
            />
          )}
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.name || 'User Profile'}
          </h1>
          {user?.email && (
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          )}
        </div>

        <Button
          onClick={handleLogout}
          variant="destructive"
          className="w-full flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </Button>
      </Card>
    </div>
  );
}