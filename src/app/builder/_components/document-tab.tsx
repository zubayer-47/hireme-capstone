
import {
    Tabs,
    TabsList,
    TabsContent,
    TabsTrigger,
} from "@/components/ui/tabs";
import { ArrowUpToLine, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export const DocumentTab = () => {
    return (
        <Tabs defaultValue="resume">
            <section className="flex items-center justify-between mb-8">
                <TabsList className="grid w-full grid-cols-2 ">
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                    <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-2">
                    <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600" size="sm" variant="ghost">
                        <ArrowUpToLine className="h-4 w-4" />
                        Upload
                    </Button>
                    <Button className="flex items-center gap-2 dark:text-neutral-200 text-neutral-600" size="sm" variant="ghost">
                        <Plus className="h-4 w-4" />
                        Create
                    </Button>
                </div>

            </section>
            <TabsContent value="resume">

            </TabsContent>
            <TabsContent value="cover-letter">

            </TabsContent>
        </Tabs>
    )
}