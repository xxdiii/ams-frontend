import { Card } from "@/components/ui/card";

interface Absence {
  date: string;
  subject: string;
  reason?: string;
}

interface RecentAbsencesProps {
  absences: Absence[];
}

export function RecentAbsences({ absences }: RecentAbsencesProps) {
  return (
    <Card className="p-4">
      <h3 className="font-semibold mb-2">Recent Absences</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-muted-foreground">
              <th className="text-left py-1 pr-4">Date</th>
              <th className="text-left py-1 pr-4">Subject</th>
              <th className="text-left py-1">Reason</th>
            </tr>
          </thead>
          <tbody>
            {absences.length === 0 ? (
              <tr><td colSpan={3} className="py-2 text-center text-muted-foreground">No recent absences</td></tr>
            ) : (
              absences.map((a, i) => (
                <tr key={i}>
                  <td className="py-1 pr-4">{a.date}</td>
                  <td className="py-1 pr-4">{a.subject}</td>
                  <td className="py-1">{a.reason || "-"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
