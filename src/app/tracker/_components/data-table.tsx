"use client"

import { z } from "zod";
import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Form,
    FormItem,
    FormField,
    FormLabel,
    FormMessage,
    FormControl,
} from "@/components/ui/form";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectTrigger,
    SelectContent,
} from "@/components/ui/select";
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
} from "@/components/ui/table";
import {
    Dialog,
    DialogTitle,
    DialogHeader,
    DialogTrigger,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ListPlus, SlidersHorizontal } from "lucide-react";

const formSchema = z.object({
    company: z.string().min(2).max(50),
    jobLink: z.string().min(2).includes("https"),
    jobTitle: z.string().min(2).max(50),
    location: z.string().min(2).max(50),
    dateApplied: z.string().min(2).max(50),
    status: z.string().min(2).max(50),
    notes: z.string().min(2).max(1000),
    salary: z.string().min(2).max(50),
    contactInfo: z.string().min(2).max(50),
    applicationPlatform: z.string().min(2).includes("https"),
})

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            company: "",
            jobLink: "",
            jobTitle: "",
            location: "",
            dateApplied: "",
            status: "",
            notes: "",
            salary: "",
            contactInfo: "",
            applicationPlatform: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter company..."
                    value={(table.getColumn("company")?.getFilterValue() as string) ?? ""}
                    onChange={(event) =>
                        table.getColumn("company")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 pl-8 shadow-none md:w-2/3 lg:w-1/3 border-black/[0.2]"
                />
                <div className="flex items-center py-4 gap-2 ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                                <SlidersHorizontal className="h-4 w-4 mr-2" />
                                Filter
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter(
                                    (column) => column.getCanHide()
                                )
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    )
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600 bg-neutral-200 hover:bg-neutral-100  dark:bg-neutral-800 hover:dark:bg-neutral-900 translate-hover" size="sm">
                                <ListPlus className="h-4 w-4" />
                                Track
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px] w-50 dark:bg-neutral-950 dark:border-white/[0.2] bg-neutral-100 border-black/[0.2]">
                            <DialogHeader>
                                <DialogTitle className="dark:text-neutral-200 text-neutral-800">Add New Job Description</DialogTitle>
                                <DialogDescription className="dark:text-neutral-400 text-neutral-600">
                                    Fill out the details of the job you've applied to.
                                </DialogDescription>
                            </DialogHeader>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <FormField
                                            control={form.control}
                                            name="company"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Company Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Apple" {...field} className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="jobTitle"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Job Title</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Software Engineer (Full stack)" {...field} className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <FormField
                                            control={form.control}
                                            name="jobLink"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Job Link</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="https://www.apple.com/careers/ca/" {...field} className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="location"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Location</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Toronto" {...field} className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]" />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                        <FormField
                                            control={form.control}
                                            name="dateApplied"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Date Applied</FormLabel>
                                                    <FormControl>
                                                        <Input type="date" {...field} className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]"/>
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel className="dark:text-neutral-300 text-neutral-700">Status</FormLabel>
                                                    <Select onValueChange={field.onChange} defaultValue={field.value} >
                                                        <FormControl>
                                                            <SelectTrigger className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]">
                                                                <SelectValue placeholder="Select a status for your application" />
                                                            </SelectTrigger>
                                                        </FormControl>
                                                        <SelectContent className="dark:bg-neutral-950 bg-neutral-200  dark:border-white/[0.2] placeholder:text-neutral-400 dark:text-neutral-200 border-black/[0.2]">
                                                            <SelectItem value="applied">Applied</SelectItem>
                                                            <SelectItem value="interviewed">Interviewed</SelectItem>
                                                            <SelectItem value="offered">Offered</SelectItem>
                                                            <SelectItem value="rejected">Rejected</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="flex justify-end gap-x-2 mt-2">
                                        <Button type="button" variant="ghost" size="sm">Cancel</Button>
                                        <Button type="submit" size="sm">Save changes</Button>
                                    </div>
                                </form>
                            </Form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            <div className="rounded-md border dark:border-white/[0.2] border-black/[0.2]">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length > 0 ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    )
}
