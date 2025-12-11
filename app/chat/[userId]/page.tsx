"use client";

import { useEffect, useRef, useState } from "react";
import { UserProfile } from "@/app/profile/page";
import ChatHeader from "@/components/chat-header";
import { useAuth } from "@/contexts/auth-context";
import { getUserMatches } from "@/lib/actions/matches";
import { useParams, useRouter } from "next/navigation";
import StreamChatInterface from "@/components/stream-chat-interface";
import Loading from "@/components/loading";
import { toast } from "sonner";

export default function ChatConversationPage() {
  const [otherUser, setOtherUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const router = useRouter();
  const params = useParams();

  const { user } = useAuth();

  const userId = params.userId as string;

  const chatInterfaceRef = useRef<{ handleVideoCall: () => void } | null>(null);

  useEffect(() => {
    async function loadUserData() {
      try {
        setError("");
        const userMatches = await getUserMatches();
        const matchedUser = userMatches.find((match) => match.id, userId);

        if (matchedUser) {
          setOtherUser(matchedUser);
        } else {
          router.push("/chat");
        }
      } catch (error: any) {
        setError(error.message);
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadUserData();
    }
  }, [userId, router, user]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  if (loading) {
    return <Loading message="Loading your matches..." />;
  }

  if (!otherUser) {
    return (
      <div className="min-h-screen bg-linear-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="w-24 h-24 bg-linear-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">❌</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            User not found
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            The user you're looking for doesn't exist or you don't have
            permission to chat with them.
          </p>
          <button
            onClick={() => router.push("/chat")}
            className="bg-linear-to-r from-pink-500 to-red-500 text-white font-semibold py-3 px-6 rounded-full hover:from-pink-600 hover:to-red-600 transition-all duration-200"
          >
            Back to Messages
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-linear-to-br from-pink-50 to-red-50 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        <ChatHeader
          user={otherUser}
          onVideoCall={() => {
            chatInterfaceRef.current?.handleVideoCall();
          }}
        />

        <div className="flex-1 min-h-0">
          <StreamChatInterface otherUser={otherUser} ref={chatInterfaceRef} />
        </div>
      </div>
    </div>
  );
}
