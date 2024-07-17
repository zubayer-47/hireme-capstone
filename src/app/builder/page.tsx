import { Browser } from "@/components/browser/browser"
import { DocumentTab } from "./_components/browser/document-tab"

export default function BuilderPage() {
    return (
        <Browser>
            <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-8 w-full pt-24">
               <DocumentTab /> 
            </main>
        </Browser>
    )
}