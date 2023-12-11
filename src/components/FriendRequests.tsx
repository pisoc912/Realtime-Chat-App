'use client'
import { CancelOutlined, CheckCircle, Clear, PersonAdd } from "@mui/icons-material";
import { FC, useState } from "react";
import Button from "./Button";
import axios from "axios";
import { useRouter } from "next/navigation";

interface FriendRequestsProps {
  incomingFriendRequests:IncomingFriendRequests[]
  sessionId:string
}
 
const FriendRequests: FC<FriendRequestsProps> = ({
  incomingFriendRequests,sessionId
}) => {
  const router = useRouter()
  const [friendRequests, setFriendRequests] = useState<IncomingFriendRequests[]>(
    incomingFriendRequests
  );

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