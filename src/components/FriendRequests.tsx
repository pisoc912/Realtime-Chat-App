'use client'
import { CancelOutlined, CheckCircle, Clear, PersonAdd } from "@mui/icons-material";
import { FC, useEffect, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/navigation";
import { pusherClient } from "@/lib/pusher";
import { toPusherKey } from "@/lib/utils";

interface FriendRequestsProps {
  incomingFriendRequests:IncomingFriendRequest[]
  sessionId:string
}
 
const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,sessionId
}) => {
  const router = useRouter()
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequest[]>(
    incomingFriendRequests
  );

  useEffect(() => {
    pusherClient.subscribe(
      toPusherKey(`user:${sessionId}:incoming_friend_requests`)
    );

    const friendRequestHandler = ({
      senderId,
      senderEmail,
    }: IncomingFriendRequest) => {
      setFriendRequests((prev) => [...prev, { senderId, senderEmail }]);
    };


    pusherClient.bind("incoming_friend_requests", friendRequestHandler);

    return () => {
      pusherClient.unsubscribe(
        toPusherKey(`user:${sessionId}:incoming_friend_requests`)
      );
      pusherClient.unbind("incoming_friend_requests", friendRequestHandler);
    };
  }, [sessionId]);

  const acceptFriend = async ( senderId:string ) => {
    await axios.post("/api/friends/accept", {
      id: senderId,
    });
    setFriendRequests((prev)=>prev.filter((req)=>req.senderId !== senderId))
    router.refresh()
  };

    const denyFriend = async (senderId:string) => {
      await axios.post("/api/friends/deny", {
        id: senderId,
      });
      setFriendRequests((prev) =>
        prev.filter((req) => req.senderId !== senderId)
      );
      router.refresh();
    };
  return (
    <>
      {friendRequests.length === 0 ? (
        <p className="text-sm text-zinc-500">Nothing to show here...</p>
      ) : (
        friendRequests.map((request) => (
          <div key={request.senderId} className="flex gap-4 items-center">
            <PersonAdd />
            <p className="font-medium text-lg">{request.senderEmail}</p>
            <button
              onClick={() => acceptFriend(request.senderId)}
              aria-label="accept friend"
              className="w-8 h-8 bg-green-200 hover:bg-green-300 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <CheckCircle color="success" />
            </button>

            <button
              onClick={() => denyFriend(request.senderId)}
              aria-label="deny friend"
              className="w-8 h-8 bg-red-200 hover:bg-red-300 grid place-items-center rounded-full transition hover:shadow-md"
            >
              <Clear color="error" />
            </button>
          </div>
        ))
      )}
    </>
  );
};
 
export default FriendRequests;