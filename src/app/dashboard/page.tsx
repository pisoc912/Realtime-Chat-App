import Button from "@/components/Button";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div>
      <Button variant="ghost">hello,{JSON.stringify(session)}</Button>
    </div>
  );
};

export default page;
