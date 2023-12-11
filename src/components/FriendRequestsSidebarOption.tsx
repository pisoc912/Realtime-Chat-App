'use client'
import { PersonPinCircle } from "@mui/icons-material";
import Link from "next/link";
import { FC, useState } from "react";

interface FriendRequestsSidebarOptionProps {
    sessionId:string
  initialUnseenRequestCount:number
}

const FriendRequestsSidebarOption: FC<FriendRequestsSidebarOptionProps> = ({
  initialUnseenRequestCount,
}) => {
  const [unseenRequestCount, setUnseenRequestCount] = useState<number>(
    initialUnseenRequestCount
  );

  return (
    <Link
      href="/dashboard/requests"
      className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex items-center gap-6 rounded-md leading-6 font-semibold"
    >
      <div className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white h-8 w-8">
        <PersonPinCircle />
      </div>
      <p className="truncate">Friend requests</p>
    {unseenRequestCount > 0 && (
        <div className="rounded-full w-5 h-5 text-xs flex justify-center items-center text-white bg-indigo-600">
            {initialUnseenRequestCount}
        </div>
    )}
    </Link>
  );
};

export default FriendRequestsSidebarOption;
