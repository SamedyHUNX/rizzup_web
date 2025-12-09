import { UserProfile } from "@/app/profile/page";
import Image from "next/image";

export default function MatchCard({ user }: { user: UserProfile }) {
  const avatarSrc = user?.avatar_url?.trim() || null;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <div className="card-swipe aspect-3/4 overflow-hidden">
        <div className="relative w-full h-full bg-gray-200 dark:bg-gray-700">
          {avatarSrc ? (
            <Image
              src={avatarSrc}
              alt={user?.full_name || "User profile"}
              fill
              className="object-cover transition-opacity duration-300"
              priority
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-6xl">👤</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
