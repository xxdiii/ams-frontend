"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { ThemeToggle } from "./theme_toggle";
import { ProfileBtn } from "./profile";

export default function Navbar({
  isMobileMenuOpen = false,
  showMenuButton = false,
  onMenuClick,
}: {
  isMobileMenuOpen: boolean
  showMenuButton: boolean
  onMenuClick: () => void
}) {
  const pathname = usePathname();

  return (
    <header className="flex items-center justify-between px-8 py-6 border-b">
      <div className="flex items-center gap-4">
        <button
          onClick={() => onMenuClick()}
          className="p-2 lg:hidden rounded-md border hover:bg-accent transition"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
        <div className="flex items-center justify-between p-4 pt-0 pb-0">
            <h2 className="text-3xl font-bold tracking-tight">{getPageTitle(pathname)}</h2>
        </div>
      </div>

      <div className="flex gap-2">
        <ThemeToggle />
        <ProfileBtn />
      </div>
    </header>
  );
}

function getPageTitle(path: string) {
  if (path.startsWith("/attendance")) return "Attendance Dashboard";
  if (path.startsWith("/students")) return "Students";
  if (path.startsWith("/settings")) return "Settings";
  return "Dashboard";
}