"use client";

import { Browser } from "@/components/browser/browser";
import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";


export default function JobTrackerPage() {
    const self = useQuery(api.users.getSelf);

    const data = useQuery(api.jobTracker.getJobListings);

    if (!data) return [];

    return (
        <Browser>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 w-full">
                <DataTable columns={columns} data={data} />
            </main>
        </Browser>
    )
}