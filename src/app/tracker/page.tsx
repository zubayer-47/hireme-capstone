"use client";

import { useQuery } from "convex/react";
import { columns } from "./_components/columns";
import { api } from "../../../convex/_generated/api";
import { DataTable } from "./_components/data-table";
import { Browser } from "@/components/browser/browser";

export default function JobTrackerPage() {
    const data = useQuery(api.applications.readApplications);

    if (!data) return [];

    return (
        <Browser>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 w-full">
                <DataTable columns={columns} data={data} />
            </main>
        </Browser>
    )
}