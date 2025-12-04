"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { DashboardSidebar } from "./sidebar";
import { authClient } from "@/lib/auth-client";

const SIDEBAR_PREFIXES = ["/dashboard", "/app"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = authClient.useSession()
  const pathname = usePathname();

  const showAppClient = SIDEBAR_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!showAppClient || !session) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen w-full">
      {showAppClient && <DashboardSidebar user={{
          name: (session.user.name || session?.user.email),
          email: session.user.email,
          avatarUrl: session.user.image || "",
      }} />}

      <main className="flex-1 flex flex-col">
        <Navbar showMenuButton={!showAppClient} />
        <div className="flex-1 p-4">{children}</div>
      </main>
    </div>
  );
}