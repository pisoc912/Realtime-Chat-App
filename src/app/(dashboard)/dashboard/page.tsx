import Button from "@/components/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC } from "react";
import Layout from "./layout";

interface pageProps {}

const page: FC<pageProps> = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className="container py-12">
      <h1 className="font-bold text-5xl mb-8">Recent chats</h1>
      {session?.user.name}
    </div>
  );
};

export default page;
