"use client"

import { formatRelative } from "date-fns";
import { Doc } from "@/convex/_generated/dataModel";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";

export const documentColumns: ColumnDef<Doc<"resume">>[] = [
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
        accessorKey: 'documentName',
        header: () => {
            return (
                <p className="text-neutral-500 dark:hover:text-neutral-300 hover:text-neutral-700">
                    Document Name
                </p>
            )
        },
        cell: ({ row }) => {
            const data: string = row.getValue("documentName");

            return <p className="dark:text-neutral-300 text-neutral-700">{data}</p>
        }
    },
    {
        header: "Uploaded On",
        cell: ({ row }) => {
            return (
                <p className="dark:text-neutral-300 text-neutral-700">
                    {formatRelative(new Date(row.original._creationTime), new Date())}
                </p>
            );
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {
            return <></>
        },
    },
]
