"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { columns } from "./_components/columns";
import { DataTable } from "./_components/data-table";

export default function JobTrackerPage() {
    const data = useQuery(api.applications.readApplications);

    if (!data) return [];

    return <DataTable columns={columns} data={data} />;
}