"use client"

import { ActionsTable } from "./actions-table";
import { Doc } from "../../../../convex/_generated/dataModel";

import { 
    Dot, 
    Eye,
    CirclePlus,
    ArrowUpDown,   
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { AddNotesModal } from "./add-notes-form";

export const columns: ColumnDef<Doc<"applications">>[] = [
    {
        id: "select",
        header: ({ table }) => (
            <Checkbox
                checked={
                    table.getIsAllPageRowsSelected() ||
                    (table.getIsSomePageRowsSelected() && "indeterminate")
                }
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
                className="dark:border-white/[0.2] border-black/[0.2]"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
                className="dark:border-white/[0.2] border-black/[0.2]"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'company',
        header: () => {
            return (
                <p className="text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-700">
                    Company
                </p>
            )
        },
        cell: ({ row }) => {
            const data: string = row.getValue("company");

            return <p className="dark:text-neutral-300 text-neutral-700">{data}</p>
        }
    },
    {
        accessorKey: 'jobTitle',
        header: () => {
            return (
                <p className="text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-700">
                    Job Title
                </p>
            )
        },
        cell: ({ row }) => {
            const data: string = row.getValue("jobTitle");

            return <p className="dark:text-neutral-300 text-neutral-700">{data}</p>
        }
    },
    {
        accessorKey: 'dateApplied',
        header: ({ column }) => {
            return (
                <p
                    className="flex items-center text-nowrap cursor-pointer text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-700"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date Applied
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </p>
            )
        },
        cell: ({ row }) => {
            const data: string = row.getValue("dateApplied");

            return <p className="dark:text-neutral-300 text-neutral-700">{data}</p>
        }
    },
    {
        accessorKey: "status",
        header: () => {
            return (
                <p className="text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-700">
                    Status
                </p>
            )
        },
        cell: ({ row }) => {
            const status = row.getValue("status");

            switch (status) {
                case "applied": 
                    return <Badge className="dark:bg-neutral-600/50 bg-neutral-600 dark:text-neutral-300 -py-1">
                        <Dot className="h-8 w-8 dark:text-neutral-400 text-neutral-200" />
                        Applied
                    </Badge>
                case "interviewed":
                    return <Badge className="bg-app-color/80 dark:bg-app-color/50 dark:text-neutral-300 -py-1">
                        <Dot className="h-8 w-8 dark:text-blue-400 text-blue-200" />
                        Interviewed
                    </Badge>
                case "offered":
                    return <Badge className="dark:bg-emerald-600/50 bg-emerald-600/80 dark:text-neutral-300 -py-1">
                        <Dot className="h-8 w-8 dark:text-emerald-400 text-emerald-200" />
                        Offered
                    </Badge>
                case "rejected":
                    return <Badge className="dark:bg-destructive/50 bg-destructive/80 dark:text-neutral-300 -py-1">
                        <Dot className="h-8 w-8 dark:text-rose-400 text-rose-200" />
                        Rejected
                    </Badge>
            }
        }
    },
    {
        accessorKey: "location",
        header: () => {
            return (
                <p className="text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-700">
                    Location
                </p>
            )
        },
        cell: ({ row }) => {
            const data: string = row.getValue("location");

            return <p className="dark:text-neutral-300 text-neutral-700">{data}</p>
        }
    },
    {
        accessorKey: "salary",
        header: () => {
            return (
                <p className="text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-700">
                    Salary
                </p>
            )
        },
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("salary"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="dark:text-neutral-300 text-neutral-700">{!formatted ? "unset" : formatted}</div>
        },
    },
    {
        accessorKey: "recruiterInfo",
        header: () => {
            return (
                <p className="text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-700">
                    Recruiter
                </p>
            )
        },
        cell: ({ row }) => {
            const data: string = row.getValue("recruiterInfo");

            return <p className="dark:text-neutral-300 text-neutral-700">{data}</p>
        }
    },
    {
        accessorKey: "notes",
        header: () => {
            return (
                <p className="text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-700">
                    Notes
                </p>
            )
        },
        cell: ({ row }) => {
            const notes: string = row.getValue("notes")

            return <AddNotesModal 
                notes={notes} 
                company={row.original.company}
                jobTitle={row.original.jobTitle}
                applicationId={row.original._id} />
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <ActionsTable applicationId={row.original._id} />
        },
    },
]
