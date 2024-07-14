interface DynamicInputProps {
    id: string;
    type: string;
    value: string;
    labelName: string;
    placeholder?: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const DynamicInput = ({ value, onChange, type, labelName, id, placeholder }: DynamicInputProps) => {
    return (
        <>
            <label htmlFor={id} className="font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 dark:text-neutral-300 text-neutral-700 text-sm">{labelName}</label>
            <input
                required
                type={type}
                id={id}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-neutral-500 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-white/[0.2] border-black/[0.2] "
            />
        </>
    )
}