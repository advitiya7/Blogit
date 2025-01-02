import { Button } from "@/components/ui/button";
// import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
  LogoutLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
export default async function Home() {
  const { getUser } = getKindeServerSession();
  const session = await getUser();
  return (
    <div>
      {!session ? (
        <>
          <RegisterLink>
            <Button>Register</Button>
          </RegisterLink>
          <LoginLink>
            <Button>Login</Button>
          </LoginLink>
        </>
      ) : (
        <LogoutLink>
          <Button>Logout</Button>
        </LogoutLink>
      )}
    </div>
  );
}
