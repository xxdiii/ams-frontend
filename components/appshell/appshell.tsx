"use client";

import { usePathname } from "next/navigation";
import Navbar from "./navbar";
import { DashboardSidebar } from "./sidebar";
import { authClient } from "@/lib/auth-client";
import { Children, useState } from "react";
import { Menu, X } from "lucide-react";

const SIDEBAR_PREFIXES = ["/dashboard", "/app"];

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session, isPending } = authClient.useSession()
  const pathname = usePathname();

  const showAppClient = SIDEBAR_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (!showAppClient || !session) {
    return <>{children}</>;
  }

  const userInfo = {
    name: session.user.name || session?.user.email,
    email: session.user.email,
    avatarUrl: session.user.image || "",
  };

  return (
    <div className="flex h-screen w-full" suppressHydrationWarning>
      {/* Desktop Sidebar - always visible on large screens */}
      <div className="hidden lg:flex" suppressHydrationWarning>
        <DashboardSidebar user={userInfo} />
      </div>

      {/* Mobile Sidebar - toggleable overlay */}
      {isMobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed inset-y-0 left-0 w-64 bg-black z-50 lg:hidden overflow-y-auto">
            <DashboardSidebar user={userInfo} />
          </div>
        </>
      )}

      <main className="flex-1 flex flex-col overflow-hidden">
        <Navbar
          onMenuClick={() =>setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMobileMenuOpen={isMobileMenuOpen}
          showMenuButton={showAppClient}
        />
        <div className="flex-1 p-4 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}