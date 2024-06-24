import { cn } from "@/lib/utils";
interface CardProps {
    children: React.ReactNode;
    classProps?: string;
}

export const Card = ({ children, classProps }: CardProps) => {
    return (
        <section className={cn("border dark:border-white/[0.2] border-black/[0.2] shadow-md rounded-lg bg-card text-card-foreground", classProps)}>
            <div className="grid gap-4 p-4">
                {children}
            </div>
        </section>
    )
}