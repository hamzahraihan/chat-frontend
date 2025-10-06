import { useState, useEffect } from "react";
import type { PresenceMessage } from "../types/PresenceMessage";

export const usePresence = () => {
  const [onlineUsers, setOnlineUsers] = useState<Set<string>>(new Set());

  // Fetch initial online users list
  const fetchOnlineUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/online");
      if (response.ok) {
        const users: string[] = await response.json();
        setOnlineUsers(new Set(users));
        console.log("Fetched online users:", users);
      }
    } catch (error) {
      console.error("Failed to fetch online users:", error);
    }
  };

  useEffect(() => {
    // Fetch online users when component mounts
    fetchOnlineUsers();

    // Poll for online users every 30 seconds as a fallback
    const interval = setInterval(fetchOnlineUsers, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const handlePresenceUpdate = (presenceMessage: PresenceMessage) => {
    console.log("Processing presence update:", presenceMessage);

    if (presenceMessage.type === "USER_ONLINE" && presenceMessage.user) {
      setOnlineUsers((prev) => new Set([...prev, presenceMessage.user!]));
    } else if (
      presenceMessage.type === "USER_OFFLINE" &&
      presenceMessage.user
    ) {
      setOnlineUsers((prev) => {
        const newSet = new Set(prev);
        newSet.delete(presenceMessage.user!);
        return newSet;
      });
    } else if (
      presenceMessage.type === "ONLINE_USERS_LIST" &&
      presenceMessage.users
    ) {
      setOnlineUsers(new Set(presenceMessage.users));
    }
  };

  const isUserOnline = (targetUsername: string): boolean => {
    return onlineUsers.has(targetUsername);
  };

  const checkUserOnlineStatus = async (
    targetUsername: string,
  ): Promise<boolean> => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${targetUsername}/online`,
      );
      if (response.ok) {
        return await response.json();
      }
    } catch (error) {
      console.error("Failed to check user online status:", error);
    }
    return false;
  };

  return {
    onlineUsers: Array.from(onlineUsers),
    isUserOnline,
    checkUserOnlineStatus,
    handlePresenceUpdate,
    refreshOnlineUsers: fetchOnlineUsers,
  };
};
