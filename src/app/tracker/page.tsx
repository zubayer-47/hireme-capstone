"use client";

import { useQuery } from "convex/react";
import { applicationColumns } from "./_components/application-columns";
import { api } from "../../../convex/_generated/api";
import { ApplicationDataTable } from "./_components/application-data-table";

export default function JobTrackerPage() {
    const data = useQuery(api.applications.readApplications);

    if (!data) return [];

    return <ApplicationDataTable columns={applicationColumns} data={data} />;
}