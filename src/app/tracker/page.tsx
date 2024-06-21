import { Browser } from "@/components/browser/browser";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";

type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const payments: Payment[] = [
    {
        id: "728ed52f",
        amount: 100,
        status: "pending",
        email: "m@example.com",
    },
    {
        id: "489e1d42",
        amount: 125,
        status: "processing",
        email: "example@gmail.com",
    },
]

async function getData(): Promise<Payment[]> {
    // Fetch data from your API here.
    return payments;
}

export default async function JobTrackerPage() {
    const data = await getData()
    return (
        <Browser>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 w-full">
                <DataTable columns={columns} data={data} />
            </main>
        </Browser>
    )
}