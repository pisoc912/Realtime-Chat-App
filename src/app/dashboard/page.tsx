import Button from "@/components/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC } from "react";
import Layout from "./layout";

interface pageProps {}

const page: FC<pageProps> = async () => {
  const session = await getServerSession(authOptions);
  return (
    <>
      <Button variant="ghost">hello,{JSON.stringify(session)}</Button>
    </>
  );
};

export default page;
