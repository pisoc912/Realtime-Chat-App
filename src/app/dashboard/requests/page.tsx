import FriendRequests from "@/components/FriendRequests";
import { fetchRedis } from "@/helper/redis";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { notFound } from "next/navigation";
import { FC } from "react";

interface RequestsPageProps {
    
}
 
const RequestsPage: FC<RequestsPageProps> = async() => {
    const session =await getServerSession(authOptions)
    if(!session) notFound()
    const incomingSenderId = await fetchRedis('smembers',`user:${session.user.id}:incoming_friend_requests`)as string[]
    const incomingFriendRequests = await Promise.all(
        incomingSenderId.map(async(senderId)=>{
            const sender = await fetchRedis('get',`user:${senderId}`) as User
            const senderEmail = JSON.parse(sender).email
    
            return {
              senderId,
              senderEmail: senderEmail,
            };
        })
    )
    return (
      <main className="pt-8">
        <h1 className="font-bold text-5xl mb-8">Friend Requests</h1>
        <div className="flex flex-col gap-4">
            <FriendRequests incomingFriendRequests={incomingFriendRequests} sessionId={session.user.id} />
         </div>
      </main>
    );
}
 
export default RequestsPage;