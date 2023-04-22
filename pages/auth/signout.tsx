import { GetStaticProps } from "next";
import { signOut } from "next-auth/react";
import { useEffect } from "react";

interface Props {
  callbackUrl: string;
}

export default function SignOut({ callbackUrl }: Props) {
  useEffect(() => {
    const logout = async () => {
      await signOut({ callbackUrl });
    }
    logout()
  }, [])
  return <div></div>;
}

export const getStaticProps = async (context: GetStaticProps) => ({
  props: { callbackUrl: process.env.NEXTAUTH_URL }, // will be passed to the page component as props
});