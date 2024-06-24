import { DocumentHeader } from "../../_components/document-header";

export default function DocumentLayout({ children }: {children: React.ReactNode }) {
    return (
        <main className="relative h-full w-full bg-background">
            <DocumentHeader documentName="Untitled" />
            <section className="grid grid-cols-3 md:grid-cols-6">
                {children}
            </section>
        </main>
    )
}