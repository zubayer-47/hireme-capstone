import { Browser } from "@/components/browser/browser"
import { DocumentTab } from "./_components/browser/document-tab"

export default function BuilderPage() {
    return (
        <Browser> 
            <main className="flex flex-1 h-full flex-col gap-4 lg:gap-6 p-4 md:p-8 lg:p-12 xl:p-14">
                <DocumentTab /> 
            </main>
        </Browser>
    )
}