"use client"

import { ActionsTable } from "./actions-table";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowUpDown, CirclePlus, Eye } from "lucide-react";
import { Doc } from "../../../../convex/_generated/dataModel";

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
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        header: 'Company',
        accessorKey: 'company',
    },
    {
        header: 'Job Title',
        accessorKey: 'jobTitle',
    },
    {
        accessorKey: 'dateApplied',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    className="px-0 hover:px-2"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Date Applied
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "location",
        header: "Location",
    },
    {
        accessorKey: "salary",
        header: () => <div className="">Salary</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className=" ">{!!formatted ? "$0" : formatted}</div>
        },
    },
    {
        accessorKey: "recruiterInfo",
        header: "Recruiter Info",
    },
    {
        accessorKey: "notes",
        header: "Notes",
        cell: ({ row }) => {
            const isNote = row.getValue("notes")

            // add a popover modal
            return <div className="">
                {!isNote ? (
                    <Button size="sm" variant="ghost" className="px-0 hover:px-1.5 transition-all"><CirclePlus className="h-4 w-5 mr-1" />Add Notes</Button>
                ) : (
                    <Button size="sm" variant="ghost" className="px-0 hover:px-1.5 transition-all"><Eye className="h-4 w-4 mr-1" />Show Notes</Button>
                )}
            </div>
        },
    },
    {
        id: "actions",
        cell: ({ row }) => {

            return <ActionsTable application={row.original} />
        },
    },
]
