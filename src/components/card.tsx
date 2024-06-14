import { cn } from "@/lib/utils";
interface CardProps {
    children: React.ReactNode;
    classProps?: string;
}

export const Card = ({ children, classProps }: CardProps) => {
    return (
        <section className={cn("border border-gray-100 shadow-md rounded-lg bg-card text-card-foreground", classProps)}>
            <div className="grid gap-4 p-4">
                {children}
            </div>
        </section>
    )
}