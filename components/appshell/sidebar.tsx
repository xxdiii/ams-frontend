import { Home, Calendar, FileText, Settings, LogOut, Target, LibraryBig, User } from "lucide-react";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Logo from "../logo";

const navItems = [
  { label: "Dashboard", icon: Home, href: "/dashboard" },
  { label: "Attendance", icon: Calendar, href: "/dashboard/student" },
  { label: "Subjects", icon: LibraryBig, href: "/dashboard/subjects" },
  { label: "Assignments", icon: Target, href: "/dashboard/assignments" },
  { label: "Reports", icon: FileText, href: "/dashboard/reports" },
];

const bottomItems = [
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function DashboardSidebar({ user }: { user: { name: string; email: string; avatarUrl?: string } }) {
  return (
    <aside className={`flex flex-col w-64 h-screen bg-background border-r px-4 py-6 gap-4`}>
      <Logo />
      <nav className="flex-1 flex flex-col gap-2">
        {navItems.map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-2">
        {bottomItems.map((item) => (
          <Link key={item.label} href={item.href} className="flex items-center gap-3 rounded-md px-2 py-2 text-sm font-medium hover:bg-muted transition-colors">
            <item.icon className="w-4 h-4" />
            {item.label}
          </Link>
        ))}
        <div className="flex items-center gap-3 rounded-md px-2 py-2 mt-2 bg-muted">
          <Avatar className="rounded-lg">
            <AvatarImage
              src={user.avatarUrl}
              alt={"@" + user.name}
            />
            <AvatarFallback><User className="w-4 h-4" /></AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-medium text-sm leading-tight">{user.name}</div>
            <div className="text-xs text-muted-foreground">student</div>
          </div>
        </div>
      </div>
    </aside>
  );
}