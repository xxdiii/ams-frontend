"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle, BarChart, BookOpen, CheckCircle, Clock, TrendingUp, Users } from "lucide-react";
import { getManagementStats } from "@/lib/dummy-data";

export default function ActionableStats(){
  const stats = getManagementStats();

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title={"Total Classes"}
        value={stats.totalClasses.toString() || "0"}
        description={"Classes conducted this semester"}
        icon={BookOpen}
      />
      <StatCard
        title={"Classes Attended"}
        value={stats.classesAttended.toString() || "0"}
        description={"Your attendance count"}
        icon={CheckCircle}
      />
      <StatCard
        title={"Attendance Rate"}
        value={stats.attendanceRate.toString() || "0%"}
        description={"Your overall attendance"}
        icon={TrendingUp}
      />
      <StatCard
        title={"Classes Missed"}
        value={stats.classesMissed.toString() || "0"}
        description={"Absences this semester"}
        icon={AlertCircle}
      />
    </div>
  );
};

function StatCard({ title, value, description, icon: Icon }: { title: string; value: string; description: string; icon: React.ComponentType<any> }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}