import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Rate } from "@/lib/get-rates";

export function RatesTable({ rates }: { rates: Rate[] }) {
  if (!rates.length) {
    return (
      <div className="rounded-md border p-4 text-center text-muted-foreground">
        No exchange rates available at the moment.
      </div>
    );
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Currency</TableHead>
            <TableHead className="text-right">Rate</TableHead>
            <TableHead className="text-right">Last Updated</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates?.splice(0, 10).map((rate) => (
            <TableRow key={rate.id}>
              <TableCell className="font-medium">{rate.currency}</TableCell>
              <TableCell className="text-right">
                {rate.rate.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {new Intl.DateTimeFormat("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  second: "numeric",
                  hour12: true,
                }).format(new Date(rate.date))}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
