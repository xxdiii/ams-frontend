import { Card } from "@/components/ui/card";

interface ClassInfo {
  date: string;
  subject: string;
  teacher: string;
  location?: string;
}

interface UpcomingClassesProps {
  classes: ClassInfo[];
}

export function UpcomingClasses({ classes }: UpcomingClassesProps) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Upcoming Classes</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-muted-foreground">
              <th className="text-left py-1 pr-4">Date</th>
              <th className="text-left py-1 pr-4">Subject</th>
              <th className="text-left py-1 pr-4">Teacher</th>
              <th className="text-left py-1">Location</th>
            </tr>
          </thead>
          <tbody>
            {classes.length === 0 ? (
              <tr><td colSpan={4} className="py-2 text-center text-muted-foreground">No upcoming classes</td></tr>
            ) : (
              classes.map((c, i) => (
                <tr key={i}>
                  <td className="py-1 pr-4">{c.date}</td>
                  <td className="py-1 pr-4">{c.subject}</td>
                  <td className="py-1 pr-4">{c.teacher}</td>
                  <td className="py-1">{c.location || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
