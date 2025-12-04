"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { getPersonalizedStudentData, getSubjects } from "@/lib/dummy-data";
import { Bell, BookOpen, CheckCircle, Clock, User } from "lucide-react";
import { Session } from "@/lib/auth-client";

type PersonalizedData = ReturnType<typeof getPersonalizedStudentData>;

export default function PersonalizedStudentView({ session } : { session: Session }) {
  const data: PersonalizedData = getPersonalizedStudentData("STU001");

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="rounded-lg h-16 w-16">
          <AvatarImage src={session.user.image ?? ""} alt={"@" + session.user.name} />
          <AvatarFallback><User className="w-8 h-8" /></AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-2xl">{session.user.name}</CardTitle>
          <CardDescription>{session.user.email} | {data.student.batch} - {data.student.branch}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Attendance Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Attendance Snapshot</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Your Attendance</span>
                <span className="text-sm font-bold text-primary">{(data.attendance.rate * 100).toFixed(1)}%</span>
              </div>
              <Progress value={data.attendance.rate * 100} />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Class Average</span>
                <span className="text-sm font-bold">{(data.attendance.classAverage * 100).toFixed(1)}%</span>
              </div>
              <Progress value={data.attendance.classAverage * 100} className="*:bg-gray-400" />
            </div>
          </div>
        </div>

        {/* Action Items Section */}
        <div>
          <h3 className="text-lg font-semibold mb-2">Action Items</h3>
          <div className="space-y-3">
            {data.actionItems.pendingAssignments.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="bg-yellow-100 dark:bg-yellow-900/50 p-2 rounded-full">
                  <Clock className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Pending Assignments</p>
                  <p className="text-xs text-muted-foreground">
                    {data.actionItems.pendingAssignments.map(a => a.title).join(', ')}
                  </p>
                </div>
              </div>
            )}
            {data.actionItems.lowAttendanceSubjects.length > 0 && (
              <div className="flex items-start gap-3">
                <div className="bg-red-100 dark:bg-red-900/50 p-2 rounded-full">
                    <Bell className="h-4 w-4 text-red-500 dark:text-red-400" />
                </div>
                <div>
                  <p className="font-medium text-sm">Low Attendance Subjects</p>
                  <p className="text-xs text-muted-foreground">
                    {data.actionItems.lowAttendanceSubjects.join(', ')}
                  </p>
                </div>
              </div>
            )}
             {data.actionItems.pendingAssignments.length === 0 && data.actionItems.lowAttendanceSubjects.length === 0 && (
                <div className="flex items-start gap-3">
                    <div className="bg-green-100 dark:bg-green-900/50 p-2 rounded-full">
                        <CheckCircle className="h-4 w-4 text-green-500 dark:text-green-400" />
                    </div>
                    <div>
                        <p className="font-medium text-sm">All Clear!</p>
                        <p className="text-xs text-muted-foreground">No pending actions. Keep up the great work.</p>
                    </div>
                </div>
             )}
          </div>
        </div>

        {/* Recent Grades Section */}
        <div className="md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">Recent Grades</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Assignment</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead className="text-right">Marks</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.recentGrades.map((grade) => (
                <TableRow key={grade.assignmentId}>
                  <TableCell className="font-medium">{grade.assignment?.title}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {getSubjects().find(s => s.id === grade.assignment?.subjectId)?.name}
                  </TableCell>
                  <TableCell className="text-right">
                    {grade.marksObtained} / {grade.assignment?.totalMarks}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};