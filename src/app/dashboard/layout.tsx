import FriendRequestsSidebarOption from "@/components/FriendRequestsSidebarOption";
import SignOutButton from "@/components/SignOutButton";
import { fetchRedis } from "@/helper/redis";
import { authOptions } from "@/lib/auth";
import { PersonAdd, SendOutlined } from "@mui/icons-material";
import { indigo } from "@mui/material/colors";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FC, ReactElement, ReactNode } from "react";
import ChatPage from "./chat/page";
import { getFriendsByUserId } from "@/helper/get-friends-by-user-id";
import SidebarChatList from "@/components/SidebarChatList";

interface LayoutProps {
  children: ReactNode;
}
interface SidebarOptions {
  id: number;
  name: string;
  href: string;
  Icon: ReactElement;
}

const sidebarOptions: SidebarOptions[] = [
  {
    id: 1,
    name: "Add Friend",
    href: "/dashboard/addFriend",
    Icon: <PersonAdd />,
  },
];

const Layout: FC<LayoutProps> = async ({ children }) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;

  return (
    <div className="w-full flex h-screen">
      <div className="flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6">
        <Link href="/dashboard" className="flex h-16">
          <SendOutlined sx={{ color: indigo[600], fontSize: 30 }} />
        </Link>
        {friends.length > 0 && (
          <div className="text-xs font-semibold leading-8 text-gray-400">
            Your Chats
          </div>
        )}
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gay-y-7">
            <li>
              <SidebarChatList friends={friends} sessionId={session.user.id}/>
            </li>
            <li>
              <div className="text-xs font-semibold text-gray-400 my-4">
                Overview
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {sidebarOptions.map((option) => (
                  <li key={option.id}>
                    <Link
                      href={option.href}
                      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-6 rounded-md leading-8 font-semibold my-2"
                    >
                      <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                        {option.Icon}
                      </span>
                      <span className="truncate">{option.name}</span>
                    </Link>
                  </li>
                ))}
                <li>
                  <FriendRequestsSidebarOption
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
              </ul>
            </li>
          </ul>
          <li className="-mx-6 my-auto flex items-center">
            <div className="flex flex-1 items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900">
              <div className="relative h-8 w-8 bg-gray-50">
                <Image
                  fill
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                  src={session.user.image || ""}
                  alt="Your profile picture"
                />
              </div>
              <span className="sr-only">Your profile</span>
              <div className="flex flex-col">
                <span aria-hidden>{session.user.name}</span>
                <span className="text-xs text-zinc-400" aria-hidden>
                  {session.user.email}
                </span>
              </div>
            </div>
            <SignOutButton />
          </li>
        </nav>
      </div>
      {children}
    </div>
  );
};

export default Layout;
