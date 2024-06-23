"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { ArrowUpToLine, Plus } from "lucide-react";

import {
    Tabs,
    TabsList,
    TabsContent,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { documentColumns } from './document-columns';
import { DocumentDataTable } from "./document-data-table";

export const DocumentTab = () => {
    const data = useQuery(api.resume.readDocuments);

    if (!data) return [];
    
    return (
        <Tabs defaultValue="resume" >
            <section className="flex items-center justify-between mb-8">
                <TabsList className="grid grid-cols-2 w-[300px] dark:bg-neutral-800 hover:dark:bg-neutral-900 transition-all">
                    <TabsTrigger value="resume" className="dark:text-neutral-200 text-neutral-600">Resume</TabsTrigger>
                    <TabsTrigger value="cover-letter" className="dark:text-neutral-200 text-neutral-600">Cover Letter</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600 translate-hover" size="sm" variant="ghost">
                        <ArrowUpToLine className="h-4 w-4" />
                        Upload
                    </Button>
                    <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600 bg-neutral-200 hover:bg-neutral-100  dark:bg-neutral-800 hover:dark:bg-neutral-900 translate-hover" size="sm" >
                        <Plus className="h-4 w-4" />
                        Create
                    </Button>
                </div>
            </section>
            <TabsContent value="resume">
                <DocumentDataTable columns={documentColumns} data={data} />
            </TabsContent>
            <TabsContent value="cover-letter">

            </TabsContent>
        </Tabs>
    )
}