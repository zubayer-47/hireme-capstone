import {
    Tabs,
    TabsList,
    TabsContent,
    TabsTrigger,
  } from "@/components/ui/tabs"

export const DocumentTab = () => {
    return (
        <Tabs defaultValue="account" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="resume">Resume</TabsTrigger>
                <TabsTrigger value="cover-letter">Cover Letter</TabsTrigger>
            </TabsList>
            <TabsContent value="resume">
                
            </TabsContent>
            <TabsContent value="cover-letter">
                
            </TabsContent>
        </Tabs>
    )
}