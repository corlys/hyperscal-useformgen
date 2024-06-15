import { cookies } from "next/headers";
import { logout } from "@/actions/logout";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  const cookie = cookies().get("auth");
  if (!cookie) {
    redirect("auth/login");
  }
  return (
    <div className="w-full sm:w-96 flex flex-col items-start justify-center">
      <div className="flex flex-row justify-between w-full">
        <h1>Home</h1>
        <ul>
          <Link href={"/form"}>
            <Button variant="default">Form Link</Button>
          </Link>
        </ul>
      </div>
      <hr className="my-6 h-px w-full" />
      <form action={logout}>
        <Button type="submit" variant="destructive">
          Logout
        </Button>
      </form>
    </div>
  );
}

